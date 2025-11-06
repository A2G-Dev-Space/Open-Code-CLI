# ArXiv Reader

> Original Document: [ArXiv Reader](https://docs.agno.com/examples/concepts/knowledge/readers/arxiv/arxiv-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.776Z

---

# ArXiv Reader

The **ArXiv Reader** allows you to search and read academic papers from the ArXiv preprint repository, converting them into vector embeddings for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/arxiv_reader.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.arxiv_reader import ArxivReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create a knowledge base with the ArXiv documents
knowledge = Knowledge(
    # Table name: ai.arxiv_documents
    vector_db=PgVector(
        table_name="arxiv_documents",
        db_url=db_url,
    ),
)
# Load the knowledge
knowledge.add_content(
    topics=["Generative AI", "Machine Learning"],
    reader=ArxivReader(),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

# Ask the agent about the knowledge
agent.print_response("What can you tell me about Generative AI?", markdown=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U arxiv sqlalchemy psycopg pgvector agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/arxiv_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/arxiv_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="arxiv-reader-reference.mdx" />
