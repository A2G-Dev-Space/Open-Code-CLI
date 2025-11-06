# PPTX Reader

> Original Document: [PPTX Reader](https://docs.agno.com/examples/concepts/knowledge/readers/pptx/pptx-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.805Z

---

# PPTX Reader

The **PPTX Reader** allows you to read and extract text content from PowerPoint (.pptx) files, converting them into vector embeddings for your knowledge base.

## Code

```python pptx_reader.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.pptx_reader import PPTXReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create a knowledge base with the PPTX documents
knowledge = Knowledge(
    # Table name: ai.pptx_documents
    vector_db=PgVector(
        table_name="pptx_documents",
        db_url=db_url,
    ),
)
# Load the knowledge
knowledge.add_content(
    path="data/pptx_files",
    reader=PPTXReader(),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

# Ask the agent about the knowledge
agent.print_response("What can you tell me about the content in these PowerPoint presentations?", markdown=True)
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
      python pptx_reader.py
      ```

      ```bash Windows theme={null}
      python pptx_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="pptx-reader-reference.mdx" />
