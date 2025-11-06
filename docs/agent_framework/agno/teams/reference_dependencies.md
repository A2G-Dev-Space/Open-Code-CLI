# Using Reference Dependencies in Team Instructions

> Original Document: [Using Reference Dependencies in Team Instructions](https://docs.agno.com/examples/concepts/teams/dependencies/reference_dependencies.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:14.994Z

---

# Using Reference Dependencies in Team Instructions

This example demonstrates how to use reference dependencies by defining them in the team constructor and referencing them directly in team instructions. This approach allows dependencies to be automatically injected into the team's context and referenced using template variables in instructions.

## Code

```python cookbook/examples/teams/dependencies/reference_dependencies.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.team import Team


def get_user_profile(user_id: str = "john_doe") -> dict:
    """Get user profile information that can be referenced in responses."""
    profiles = {
        "john_doe": {
            "name": "John Doe",
            "preferences": {
                "communication_style": "professional",
                "topics_of_interest": ["AI/ML", "Software Engineering", "Finance"],
                "experience_level": "senior",
            },
            "location": "San Francisco, CA",
            "role": "Senior Software Engineer",
        }
    }

    return profiles.get(user_id, {"name": "Unknown User"})


def get_current_context() -> dict:
    """Get current contextual information like time, weather, etc."""
    from datetime import datetime

    return {
        "current_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": "PST",
        "day_of_week": datetime.now().strftime("%A"),
    }


profile_agent = Agent(
    name="ProfileAnalyst",
    model=OpenAIChat(id="gpt-5-mini"),
    instructions="You analyze user profiles and provide personalized recommendations.",
)

context_agent = Agent(
    name="ContextAnalyst",
    model=OpenAIChat(id="gpt-5-mini"),
    instructions="You analyze current context and timing to provide relevant insights.",
)

team = Team(
    name="PersonalizationTeam",
    model=OpenAIChat(id="gpt-5-mini"),
    members=[profile_agent, context_agent],
    dependencies={
        "user_profile": get_user_profile,
        "current_context": get_current_context,
    },
    instructions=[
        "You are a personalization team that provides personalized recommendations based on the user's profile and context.",
        "Here is the user profile: {user_profile}",
        "Here is the current context: {current_context}",
    ],
    debug_mode=True,
    markdown=True,
)

response = team.run(
    "Please provide me with a personalized summary of today's priorities based on my profile and interests.",
)

print(response.content)
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
    python cookbook/examples/teams/dependencies/reference_dependencies.py
    ```
  </Step>
</Steps>
