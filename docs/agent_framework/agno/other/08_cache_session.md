# Session Caching

> Original Document: [Session Caching](https://docs.agno.com/examples/concepts/agent/session/08_cache_session.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.508Z

---

# Session Caching

This example demonstrates how to enable session caching in memory for faster access to session data, improving performance when working with persistent databases.

## Code

```python 08_cache_session.py theme={null}
"""Example of how to cache the session in memory for faster access."""

from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat

# Setup the database
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(db_url=db_url, session_table="xxx")

# Setup the agent
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    session_id="session_storage",
    add_history_to_context=True,
    # Activate session caching. The session will be cached in memory for faster access.
    cache_session=True,
)

# Running the Agent
agent.print_response("Tell me a new interesting fact about space")

# You can get the cached session:
session = agent.get_session()
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai psycopg
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
    touch 08_cache_session.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python 08_cache_session.py
      ```

      ```bash Windows theme={null}
      python 08_cache_session.py
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
