# PPTX Reader Async

> Original Document: [PPTX Reader Async](https://docs.agno.com/examples/concepts/knowledge/readers/pptx/pptx-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.806Z

---

# PPTX Reader Async

The **PPTX Reader** with asynchronous processing allows you to read and extract text content from PowerPoint (.pptx) files with better performance for concurrent operations.

## Code

```python pptx_reader_async.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.pptx_reader import PPTXReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    # Table name: ai.pptx_documents
    vector_db=PgVector(
        table_name="pptx_documents",
        db_url=db_url,
    ),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

def main():
    # Load the knowledge
    asyncio.run(
        knowledge.add_content_async(
            path="data/pptx_files",
            reader=PPTXReader(),
        )
    )

    # Create and use the agent
    asyncio.run(
        agent.aprint_response(
            "What can you tell me about the content in these PowerPoint presentations?", markdown=True
        )
    )

if __name__ == "__main__":
    main()
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U python-pptx sqlalchemy psycopg pgvector agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python pptx_reader_async.py
      ```

      ```bash Windows theme={null}
      python pptx_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## PPTX Reader Params

<Snippet file="pptx-reader-reference.mdx" />
