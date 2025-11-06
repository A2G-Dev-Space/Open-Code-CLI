# Change State On Run

> Original Document: [Change State On Run](https://docs.agno.com/examples/concepts/agent/state/change_state_on_run.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.517Z

---

# Change State On Run

This example demonstrates how to manage session state across different runs for different users. It shows how session state persists within the same session but is isolated between different sessions and users.

## Code

```python change_state_on_run.py theme={null}
from agno.agent import Agent
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIChat

agent = Agent(
    db=InMemoryDb(),
    model=OpenAIChat(id="gpt-5-mini"),
    instructions="Users name is {user_name} and age is {age}",
    debug_mode=True,
)

# Sets the session state for the session with the id "user_1_session_1"
agent.print_response(
    "What is my name?",
    session_id="user_1_session_1",
    user_id="user_1",
    session_state={"user_name": "John", "age": 30},
)

# Will load the session state from the session with the id "user_1_session_1"
agent.print_response("How old am I?", session_id="user_1_session_1", user_id="user_1")

# Sets the session state for the session with the id "user_2_session_1"
agent.print_response(
    "What is my name?",
    session_id="user_2_session_1",
    user_id="user_2",
    session_state={"user_name": "Jane", "age": 25},
)

# Will load the session state from the session with the id "user_2_session_1"
agent.print_response("How old am I?", session_id="user_2_session_1", user_id="user_2")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch change_state_on_run.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python change_state_on_run.py
      ```

      ```bash Windows   theme={null}
      python change_state_on_run.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/state" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
