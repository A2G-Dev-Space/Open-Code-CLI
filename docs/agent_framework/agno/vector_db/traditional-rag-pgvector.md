# Traditional RAG with PgVector

> Original Document: [Traditional RAG with PgVector](https://docs.agno.com/examples/concepts/knowledge/rag/traditional-rag-pgvector.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:14.776Z

---

# Traditional RAG with PgVector

## Code

```python  theme={null}
from agno.agent import Agent
from agno.knowledge.embedder.openai import OpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.models.openai import OpenAIChat
from agno.vectordb.pgvector import PgVector, SearchType

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    # Use PgVector as the vector database and store embeddings in the `ai.recipes` table
    vector_db=PgVector(
        table_name="recipes",
        db_url=db_url,
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(id="text-embedding-3-small"),
    ),
)

knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
)

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    knowledge=knowledge,
    # Enable RAG by adding context from the `knowledge` to the user prompt.
    add_knowledge_to_context=True,
    # Set as False because Agents default to `search_knowledge=True`
    search_knowledge=False,
    markdown=True,
)
agent.print_response(
    "How do I make chicken and galangal in coconut milk soup", stream=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai sqlalchemy psycopg pgvector pypdf agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agents/rag/traditional_rag_pgvector.py
      ```

      ```bash Windows theme={null}
      python cookbook/agents/rag/traditional_rag_pgvector.py
      ```
    </CodeGroup>
  </Step>
</Steps>
