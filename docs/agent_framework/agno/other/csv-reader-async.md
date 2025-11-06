# CSV Reader Async

> Original Document: [CSV Reader Async](https://docs.agno.com/examples/concepts/knowledge/readers/csv/csv-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.779Z

---

# CSV Reader Async

The **CSV Reader** with asynchronous processing allows you to handle CSV files and integrate them with knowledge bases efficiently.

## Code

```python examples/concepts/knowledge/readers/csv_reader_async.py theme={null}
import asyncio
from pathlib import Path

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="csv_documents",
        db_url=db_url,
    ),
    max_results=5,  # Number of results to return on search
)

# Initialize the Agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

if __name__ == "__main__":
    # Comment out after first run
    asyncio.run(knowledge.add_content_async(path=Path("data/csv")))

    # Create and use the agent
    asyncio.run(agent.aprint_response("What is the csv file about", markdown=True))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pandas sqlalchemy psycopg pgvector agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/csv_reader_async.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/csv_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="csv-reader-reference.mdx" />
