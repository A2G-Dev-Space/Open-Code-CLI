# Direct Response with Team History

> Original Document: [Direct Response with Team History](https://docs.agno.com/examples/concepts/teams/basic/respond_directly_with_history.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:14.980Z

---

# Direct Response with Team History

This example demonstrates a team where the team leader routes requests to the appropriate member, and the members respond directly to the user.

In addition, the team has access to the conversation history through `add_history_to_context=True`.

```python respond_directly_with_history.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.team.team import Team


def get_weather(city: str) -> str:
    return f"The weather in {city} is sunny."


weather_agent = Agent(
    name="Weather Agent",
    role="You are a weather agent that can answer questions about the weather.",
    model=OpenAIChat(id="o3-mini"),
    tools=[get_weather],
)


def get_news(topic: str) -> str:
    return f"The news about {topic} is that it is going well!"


news_agent = Agent(
    name="News Agent",
    role="You are a news agent that can answer questions about the news.",
    model=OpenAIChat(id="o3-mini"),
    tools=[get_news],
)


def get_activities(city: str) -> str:
    return f"The activities in {city} are that it is going well!"


activities_agent = Agent(
    name="Activities Agent",
    role="You are a activities agent that can answer questions about the activities.",
    model=OpenAIChat(id="o3-mini"),
    tools=[get_activities],
)


geo_search_team = Team(
    name="Geo Search Team",
    model=OpenAIChat("o3-mini"),
    respond_directly=True,
    members=[
        weather_agent,
        news_agent,
        activities_agent,
    ],
    instructions="You are a geo search agent that can answer questions about the weather, news and activities in a city.",
    db=SqliteDb(
        db_file="tmp/geo_search_team.db"
    ),  # Add a database to store the conversation history
    add_history_to_context=True,  # Ensure that the team leader knows about previous requests
)


geo_search_team.print_response(
    "I am doing research on Tokyo. What is the weather like there?", stream=True
)

geo_search_team.print_response(
    "Is there any current news about that city?", stream=True
)

geo_search_team.print_response("What are the activities in that city?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install required libraries">
    ```bash  theme={null}
    pip install agno openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=****
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python respond_directly_with_history.py
    ```
  </Step>
</Steps>
