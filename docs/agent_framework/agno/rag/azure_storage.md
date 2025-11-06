# Agent with Storage

> Original Document: [Agent with Storage](https://docs.agno.com/examples/models/azure/openai/storage.md)
> Category: rag
> Downloaded: 2025-11-06T11:51:15.664Z

---

# Agent with Storage

## Code

```python cookbook/models/azure/openai/db.py theme={null}
"""Run `pip install ddgs sqlalchemy anthropic` to install dependencies."""

from agno.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.azure import AzureOpenAI
from agno.tools.duckduckgo import DuckDuckGoTools

# Setup the database
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(db_url=db_url)

agent = Agent(
    model=AzureOpenAI(id="gpt-5-mini"),
    db=db,
    tools=[DuckDuckGoTools()],
    add_history_to_context=True,
)
agent.print_response("How many people live in Canada?")
agent.print_response("What is their national anthem called?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AZURE_OPENAI_API_KEY=xxx
    export AZURE_OPENAI_ENDPOINT=xxx
    export AZURE_DEPLOYMENT=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai sqlalchemy psycopg ddgs agno
    ```
  </Step>

  <Step title="Run PgVector">
    ```bash  theme={null}
    docker run -d \
      -e POSTGRES_DB=ai \
      -e POSTGRES_USER=ai \
      -e POSTGRES_PASSWORD=ai \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -v pgvolume:/var/lib/postgresql/data \
      -p 5532:5432 \
      --name pgvector \
      agnohq/pgvector:16
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/azure/openai/db.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/azure/openai/db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
