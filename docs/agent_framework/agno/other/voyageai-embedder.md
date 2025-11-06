# VoyageAI Embedder

> Original Document: [VoyageAI Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/voyageai-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.736Z

---

# VoyageAI Embedder

## Code

```python  theme={null}
from agno.knowledge.embedder.voyageai import VoyageAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

embeddings = VoyageAIEmbedder().get_embedding(
    "The quick brown fox jumps over the lazy dog."
)

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="voyageai_embeddings",
        embedder=VoyageAIEmbedder(),
    ),
    max_results=2,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector voyageai agno
    ```
  </Step>

  <Step title="Run PgVector">
    ```bash  theme={null}
    docker run -d \
      -e POSTGRES_DB=ai \
      -e POSTGRES_USER=ai \
      -e POSTGRES_PASSWORD=ai \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -v pgvolume:/var/lib/postgresql/data \
      -p 5532:5432 \
      --name pgvector \
      agnohq/pgvector:16
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/embedders/voyageai_embedder.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/embedders/voyageai_embedder.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
