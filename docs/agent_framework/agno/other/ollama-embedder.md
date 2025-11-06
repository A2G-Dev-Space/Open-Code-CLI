# Ollama Embedder

> Original Document: [Ollama Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/ollama-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.721Z

---

# Ollama Embedder

## Code

```python  theme={null}
from agno.knowledge.embedder.ollama import OllamaEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

embeddings = OllamaEmbedder().get_embedding(
    "The quick brown fox jumps over the lazy dog."
)

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="ollama_embeddings",
        embedder=OllamaEmbedder(),
    ),
    max_results=2,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the installation instructions at [Ollama's website](https://ollama.ai)
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector agno
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
      python cookbook/knowledge/embedders/ollama_embedder.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/embedders/ollama_embedder.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
