# Azure OpenAI Embedder

> Original Document: [Azure OpenAI Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/azure-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.703Z

---

# Azure OpenAI Embedder

## Code

```python  theme={null}
from agno.knowledge.embedder.azure_openai import AzureOpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

embeddings = AzureOpenAIEmbedder(id="text-embedding-3-small").get_embedding(
    "The quick brown fox jumps over the lazy dog."
)

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="azure_openai_embeddings",
        embedder=AzureOpenAIEmbedder(),
    ),
    max_results=2,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AZURE_EMBEDDER_OPENAI_API_KEY=xxx
    export AZURE_EMBEDDER_OPENAI_ENDPOINT=xxx
    export AZURE_EMBEDDER_DEPLOYMENT=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector openai agno
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/embedders/azure_embedder.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/embedders/azure_embedder.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
