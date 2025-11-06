# Website Reader (Async)

> Original Document: [Website Reader (Async)](https://docs.agno.com/examples/concepts/knowledge/readers/website/website-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.829Z

---

# Website Reader (Async)

The **Website Reader** with asynchronous processing crawls and processes entire websites efficiently, following links to create comprehensive knowledge bases from web content.

## Code

```python examples/concepts/knowledge/readers/website_reader_async.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.website_reader import WebsiteReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="website_documents",
        db_url=db_url,
    ),
)

agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

async def main():
    # Crawl and add website content to knowledge base
    await knowledge.add_content_async(
        url="https://docs.agno.com/introduction",
        reader=WebsiteReader(max_depth=2, max_links=20),
    )

    # Query the knowledge base
    await agent.aprint_response(
        "What are the main features of Agno?",
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
    pip install -U requests beautifulsoup4 sqlalchemy psycopg pgvector agno openai    
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
      python examples/concepts/knowledge/readers/website_reader_async.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/website_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="website-reader-reference.mdx" />
