# Gemini Embedder

> Original Document: [Gemini Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/gemini-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.699Z

---

# Gemini Embedder

## Code

```python  theme={null}
from agno.knowledge.embedder.google import GeminiEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

embeddings = GeminiEmbedder().get_embedding(
    "The quick brown fox jumps over the lazy dog."
)

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="gemini_embeddings",
        embedder=GeminiEmbedder(),
    ),
    max_results=2,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector google-generativeai agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/embedders/gemini_embedder.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/embedders/gemini_embedder.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
