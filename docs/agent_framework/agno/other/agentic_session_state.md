# Agentic Session State

> Original Document: [Agentic Session State](https://docs.agno.com/examples/concepts/agent/state/agentic_session_state.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.520Z

---

# Agentic Session State

This example demonstrates how to enable agentic session state management, allowing the agent to automatically update and manage session state based on conversation context. The agent can modify the shopping list based on user interactions.

## Code

```python agentic_session_state.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat

db = SqliteDb(db_file="tmp/agents.db")
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    session_state={"shopping_list": []},
    add_session_state_to_context=True,  # Required so the agent is aware of the session state
    enable_agentic_state=True,
)

agent.print_response("Add milk, eggs, and bread to the shopping list")

agent.print_response("I picked up the eggs, now what's on my list?")

print(f"Session state: {agent.get_session_state()}")
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
    touch agentic_session_state.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python agentic_session_state.py
      ```

      ```bash Windows   theme={null}
      python agentic_session_state.py
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
