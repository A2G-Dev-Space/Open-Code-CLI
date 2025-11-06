# Session State in Instructions

> Original Document: [Session State in Instructions](https://docs.agno.com/examples/concepts/teams/state/session_state_in_instructions.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.096Z

---

# Session State in Instructions

This example demonstrates how to use session state variables directly in team instructions using template syntax. The session state values are automatically injected into the instructions, making them available to the team during execution.

## Code

```python cookbook/examples/teams/state/session_state_in_instructions.py theme={null}
from agno.team.team import Team

team = Team(
    members=[],
    # Initialize the session state with a variable
    session_state={"user_name": "John"},
    instructions="Users name is {user_name}",
    markdown=True,
)

team.print_response("What is my name?", stream=True)
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
    python cookbook/examples/teams/state/session_state_in_instructions.py
    ```
  </Step>
</Steps>
