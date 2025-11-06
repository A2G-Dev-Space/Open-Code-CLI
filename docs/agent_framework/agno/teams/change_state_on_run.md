# Change Session State on Run

> Original Document: [Change Session State on Run](https://docs.agno.com/examples/concepts/teams/state/change_state_on_run.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.092Z

---

# Change Session State on Run

This example demonstrates how to set and manage session state for different users and sessions. It shows how session state can be passed during runs and persists across multiple interactions within the same session.

## Code

```python cookbook/examples/teams/state/change_state_on_run.py theme={null}
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIChat
from agno.team import Team

team = Team(
    db=InMemoryDb(),
    model=OpenAIChat(id="gpt-5-mini"),
    members=[],
    instructions="Users name is {user_name} and age is {age}",
)

# Sets the session state for the session with the id "user_1_session_1"
team.print_response(
    "What is my name?",
    session_id="user_1_session_1",
    user_id="user_1",
    session_state={"user_name": "John", "age": 30},
)

# Will load the session state from the session with the id "user_1_session_1"
team.print_response("How old am I?", session_id="user_1_session_1", user_id="user_1")

# Sets the session state for the session with the id "user_2_session_1"
team.print_response(
    "What is my name?",
    session_id="user_2_session_1",
    user_id="user_2",
    session_state={"user_name": "Jane", "age": 25},
)

# Will load the session state from the session with the id "user_2_session_1"
team.print_response("How old am I?", session_id="user_2_session_1", user_id="user_2")
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
    python cookbook/examples/teams/state/change_state_on_run.py
    ```
  </Step>
</Steps>
