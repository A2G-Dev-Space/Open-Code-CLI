# Memory with PostgreSQL

> Original Document: [Memory with PostgreSQL](https://docs.agno.com/examples/concepts/memory/db/mem-postgres-memory.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:14.844Z

---

# Memory with PostgreSQL

## Code

```python cookbook/memory/db/mem-postgres-memory.py theme={null}
from agno.agent import Agent
from agno.db.postgres import PostgresDb

# Setup Postgres
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(db_url=db_url)

agent = Agent(
    db=db,
    enable_user_memories=True,
)

agent.print_response("My name is John Doe and I like to play basketball on the weekends.")
agent.print_response("What's do I do in weekends?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai sqlalchemy 'psycopg[binary]'
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
      python cookbook/memory/db/mem-postgres-memory.py
      ```

      ```bash Windows theme={null}
      python cookbook/memory/db/mem-postgres-memory.py
      ```
    </CodeGroup>
  </Step>
</Steps>
