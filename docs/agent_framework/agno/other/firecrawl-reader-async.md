# Firecrawl Reader (Async)

> Original Document: [Firecrawl Reader (Async)](https://docs.agno.com/examples/concepts/knowledge/readers/firecrawl/firecrawl-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.821Z

---

# Firecrawl Reader (Async)

The **Firecrawl Reader** with asynchronous processing uses the Firecrawl API to scrape and crawl web content efficiently, converting it into documents for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/firecrawl_reader_async.py theme={null}
import os
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.firecrawl_reader import FirecrawlReader
from agno.vectordb.pgvector import PgVector

api_key = os.getenv("FIRECRAWL_API_KEY")
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="firecrawl_documents",
        db_url=db_url,
    ),
)

agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

async def main():
    # Add Firecrawl content to knowledge base
    await knowledge.add_content_async(
        url="https://github.com/agno-agi/agno",
        reader=FirecrawlReader(
            api_key=api_key,
            mode="scrape",
            chunk=True,
            params={"formats": ["markdown"]},
        ),
    )

    # Query the knowledge base
    await agent.aprint_response(
        "What is the main purpose of this repository?",
        markdown=True,
    )

if __name__ == "__main__":
    asyncio.run(main())
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U firecrawl-py sqlalchemy psycopg pgvector agno
    ```
  </Step>

  <Step title="Set API Key">
    ```bash  theme={null}
    export FIRECRAWL_API_KEY="your-firecrawl-api-key"
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/firecrawl_reader_async.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/firecrawl_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="firecrawl-reader-reference.mdx" />
