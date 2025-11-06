# Agentic Session State

> Original Document: [Agentic Session State](https://docs.agno.com/examples/concepts/teams/state/agentic_session_state.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.090Z

---

# Agentic Session State

This example demonstrates how to enable agentic session state in teams and agents, allowing them to automatically manage and update their session state during interactions. The agents can modify the session state autonomously based on the conversation context.

## Code

```python cookbook/examples/teams/state/agentic_session_state.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.team.team import Team

db = SqliteDb(db_file="tmp/agents.db")
shopping_agent = Agent(
    name="Shopping List Agent",
    role="Manage the shopping list",
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    add_session_state_to_context=True,  # Required so the agent is aware of the session state
    enable_agentic_state=True,
)

team = Team(
    members=[shopping_agent],
    session_state={"shopping_list": []},
    db=db,
    add_session_state_to_context=True,  # Required so the team is aware of the session state
    enable_agentic_state=True,
    description="You are a team that manages a shopping list and chores",
    show_members_responses=True,
)


team.print_response("Add milk, eggs, and bread to the shopping list")

team.print_response("I picked up the eggs, now what's on my list?")

print(f"Session state: {team.get_session_state()}")
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
    python cookbook/examples/teams/state/agentic_session_state.py
    ```
  </Step>
</Steps>
