# Dependencies

> Original Document: [Dependencies](https://docs.agno.com/concepts/teams/dependencies.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:13.840Z

---

# Dependencies

> Learn how to use dependencies in your teams.

**Dependencies** is a way to inject variables into your Team Context. `dependencies` is a dictionary that contains a set of functions (or static variables) that are resolved before the team runs.

<Note>
  You can use dependencies to inject memories, dynamic few-shot examples, "retrieved" documents, etc.
</Note>

```python dependencies.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.team import Team


def get_user_profile() -> dict:
    """Get user profile information that can be referenced in responses."""
    profile = {
        "name": "John Doe",
        "preferences": {
            "communication_style": "professional",
            "topics_of_interest": ["AI/ML", "Software Engineering", "Finance"],
            "experience_level": "senior",
        },
        "location": "San Francisco, CA",
        "role": "Senior Software Engineer",
    }

    return profile


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

team.print_response(
    "Please provide me with a personalized summary of today's priorities based on my profile and interests.",
)
```

<Check>
  Dependencies are automatically resolved when the team is run.
</Check>

## Adding the entire context to the user message

Set `add_dependencies_to_context=True` to add the entire list of dependencies to the user message. This way you don't have to manually add the dependencies to the instructions.

```python dependencies_instructions.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.team import Team


def get_user_profile() -> dict:
    """Get user profile information that can be referenced in responses."""
    profile = {
        "name": "John Doe",
        "preferences": {
            "communication_style": "professional",
            "topics_of_interest": ["AI/ML", "Software Engineering", "Finance"],
            "experience_level": "senior",
        },
        "location": "San Francisco, CA",
        "role": "Senior Software Engineer",
    }

    return profile


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
    markdown=True,
)

team.print_response(
    "Please provide me with a personalized summary of today's priorities based on my profile and interests.",
    dependencies={
        "user_profile": get_user_profile,
        "current_context": get_current_context,
    },
    add_dependencies_to_context=True,
)
```

<Tip>
  You can pass `dependencies` and `add_dependencies_to_context` to the `run`, `arun`, `print_response` and `aprint_response` methods.
</Tip>

## Developer Resources

* View the [Team schema](/reference/teams/team)
* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/teams/dependencies)
