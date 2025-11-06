# JSON Reader (Async)

> Original Document: [JSON Reader (Async)](https://docs.agno.com/examples/concepts/knowledge/readers/json/json-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.787Z

---

# JSON Reader (Async)

The **JSON Reader** with asynchronous processing allows you to handle JSON files efficiently and integrate them with knowledge bases.

## Code

```python examples/concepts/knowledge/readers/json_reader_async.py theme={null}
import json
import asyncio
from pathlib import Path

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.json_reader import JSONReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create test JSON data
json_path = Path("tmp/test.json")
json_path.parent.mkdir(exist_ok=True)
test_data = {
    "users": [
        {"id": 1, "name": "John Doe", "role": "Developer"},
        {"id": 2, "name": "Jane Smith", "role": "Designer"}
    ],
    "project": "Knowledge Base System"
}
json_path.write_text(json.dumps(test_data, indent=2))

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="json_documents",
        db_url=db_url,
    ),
)

agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

async def main():
    # Add JSON content to knowledge base
    await knowledge.add_content_async(
        path=json_path,
        reader=JSONReader(),
    )

    # Query the knowledge base
    await agent.aprint_response(
        "What information is available about the users?",
        markdown=True
    )

if __name__ == "__main__":
    asyncio.run(main())
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector agno openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/json_reader_async.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/json_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="json-reader-reference.mdx" />
