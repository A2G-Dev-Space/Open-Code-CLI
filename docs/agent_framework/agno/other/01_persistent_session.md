# Persistent Session Storage

> Original Document: [Persistent Session Storage](https://docs.agno.com/examples/concepts/agent/session/01_persistent_session.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.504Z

---

# Persistent Session Storage

This example demonstrates how to create an agent with persistent session storage using PostgreSQL, enabling conversation history to be maintained across different runs.

## Code

```python 01_persistent_session.py theme={null}
from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url, session_table="sessions")

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    session_id="session_storage",
    add_history_to_context=True,
)

agent.print_response("Tell me a new interesting fact about space")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai psycopg2-binary
    ```
  </Step>

  <Step title="Setup PostgreSQL">
    ```bash  theme={null}
    # Make sure PostgreSQL is running
    # Update connection string in the code as needed
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
    touch 01_persistent_session.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python 01_persistent_session.py
      ```

      ```bash Windows theme={null}
      python 01_persistent_session.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/session" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
