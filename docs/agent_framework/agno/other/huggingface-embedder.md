# Huggingface Embedder

> Original Document: [Huggingface Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/huggingface-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.707Z

---

# Huggingface Embedder

## Code

```python  theme={null}
from agno.knowledge.embedder.huggingface import HuggingfaceCustomEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

embeddings = HuggingfaceCustomEmbedder().get_embedding(
    "The quick brown fox jumps over the lazy dog."
)

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="huggingface_embeddings",
        embedder=HuggingfaceCustomEmbedder(),
    ),
    max_results=2,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export HUGGINGFACE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector huggingface-hub agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/embedders/huggingface_embedder.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/embedders/huggingface_embedder.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
