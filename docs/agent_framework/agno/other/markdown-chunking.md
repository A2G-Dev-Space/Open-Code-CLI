# Markdown Chunking

> Original Document: [Markdown Chunking](https://docs.agno.com/concepts/knowledge/chunking/markdown-chunking.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.650Z

---

# Markdown Chunking

Markdown chunking splits Markdown documents while preserving heading structure and hierarchy. It respects Markdown syntax to create chunks that align with document sections, keeping headings with their associated content.

## Code

```python  theme={null}
import asyncio
from agno.agent import Agent
from agno.knowledge.chunking.markdown import MarkdownChunking
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.markdown_reader import MarkdownReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(table_name="recipes_markdown_chunking", db_url=db_url),
)

asyncio.run(knowledge.add_content_async(
    url="https://github.com/agno-agi/agno/blob/main/README.md",
    reader=MarkdownReader(
        name="Markdown Chunking Reader",
        chunking_strategy=MarkdownChunking(),
    ),
))
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

agent.print_response("What is Agno?", markdown=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/chunking/markdown_chunking.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/chunking/markdown_chunking.py 
      ```
    </CodeGroup>
  </Step>
</Steps>

## Markdown Chunking Params

<Snippet file="chunking-markdown.mdx" />
