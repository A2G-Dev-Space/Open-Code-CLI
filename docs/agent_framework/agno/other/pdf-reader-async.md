# PDF Reader Async

> Original Document: [PDF Reader Async](https://docs.agno.com/examples/concepts/knowledge/readers/pdf/pdf-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.803Z

---

# PDF Reader Async

The **PDF Reader** with asynchronous processing allows you to handle PDF files efficiently and integrate them with knowledge bases.

## Code

```python examples/concepts/knowledge/readers/pdf_reader_async.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create a knowledge base with the PDFs from the data/pdfs directory
knowledge = Knowledge(
    vector_db=PgVector(
        table_name="pdf_documents",
        db_url=db_url,
    )
)

# Create an agent with the knowledge base
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

if __name__ == "__main__":
    asyncio.run(
        knowledge.add_content_async(
            path="cookbook/knowledge/testing_resources/cv_1.pdf",
        )
    )
    # Create and use the agent
    asyncio.run(
        agent.aprint_response(
            "What skills does an applicant require to apply for the Software Engineer position?",
            markdown=True,
        )
    )
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pypdf sqlalchemy psycopg pgvector agno openai  
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
      python examples/concepts/knowledge/readers/pdf_reader_async.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/pdf_reader_async.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="pdf-reader-reference.mdx" />
