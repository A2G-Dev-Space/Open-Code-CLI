# PDF URL Password Reader

> Original Document: [PDF URL Password Reader](https://docs.agno.com/examples/concepts/knowledge/readers/pdf/pdf-url-password-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.810Z

---

# PDF URL Password Reader

The **PDF URL Password Reader** processes password-protected PDF files directly from URLs, allowing you to handle secure remote documents.

## Code

```python examples/concepts/knowledge/readers/pdf_reader_url_password.py theme={null}
from agno.agent import Agent
from agno.knowledge.content import ContentAuth
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create a knowledge base with simplified password handling
knowledge = Knowledge(
    vector_db=PgVector(
        table_name="pdf_documents_password",
        db_url=db_url,
    ),
)

knowledge.add_content(
    url="https://agno-public.s3.us-east-1.amazonaws.com/recipes/ThaiRecipes_protected.pdf",
    auth=ContentAuth(password="ThaiRecipes"),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

agent.print_response("Give me the recipe for pad thai")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pypdf requests sqlalchemy psycopg pgvector agno openai
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
      python examples/concepts/knowledge/readers/pdf_reader_url_password.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/pdf_reader_url_password.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="pdf-reader-reference.mdx" />
