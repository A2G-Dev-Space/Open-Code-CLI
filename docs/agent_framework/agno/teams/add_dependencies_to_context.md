# Adding Dependencies to Team Context

> Original Document: [Adding Dependencies to Team Context](https://docs.agno.com/examples/concepts/teams/dependencies/add_dependencies_to_context.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:14.984Z

---

# Adding Dependencies to Team Context

This example demonstrates how to add dependencies directly to the team context. Unlike adding dependencies per run, this approach makes the dependency functions available to all team runs by default, providing consistent access to contextual information across all interactions.

## Code

```python cookbook/examples/teams/dependencies/add_dependencies_to_context.py theme={null}
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
    add_dependencies_to_context=True,
    debug_mode=True,
    markdown=True,
)

response = team.run(
    "Please provide me with a personalized summary of today's priorities based on my profile and interests.",
)

print(response.content)

# ------------------------------------------------------------
# ASYNC EXAMPLE
# ------------------------------------------------------------
# async def test_async():
#     async_response = await team.arun(
#         "Based on my profile, what should I focus on this week? Include specific recommendations.",
#     )
#
#     print("\n=== Async Run Response ===")
#     print(async_response.content)

# # Run the async test
# import asyncio
# asyncio.run(test_async())
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
    python cookbook/examples/teams/dependencies/add_dependencies_to_context.py
    ```
  </Step>
</Steps>
