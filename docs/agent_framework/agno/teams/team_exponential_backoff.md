# Team with Exponential Backoff

> Original Document: [Team with Exponential Backoff](https://docs.agno.com/examples/concepts/teams/other/team_exponential_backoff.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.055Z

---

# Team with Exponential Backoff

This example demonstrates how to configure a team with exponential backoff retry logic. When agents encounter errors or rate limits, the team will automatically retry with increasing delays between attempts.

## Code

```python cookbook/examples/teams/basic/team_exponential_backoff.py theme={null}
from agno.agent import Agent
from agno.team import Team
from agno.tools.duckduckgo import DuckDuckGoTools

# Create a research team
team = Team(
    members=[
        Agent(
            name="Sarah",
            role="Data Researcher",
            tools=[DuckDuckGoTools()],
            instructions="Focus on gathering and analyzing data",
        ),
        Agent(
            name="Mike",
            role="Technical Writer",
            instructions="Create clear, concise summaries",
        ),
    ],
    retries=3,
    exponential_backoff=True,
)

team.print_response(
    "Search for latest news about the latest AI models",
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install required libraries">
    ```bash  theme={null}
    pip install agno ddgs
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=****
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python cookbook/examples/teams/basic/team_exponential_backoff.py
    ```
  </Step>
</Steps>
