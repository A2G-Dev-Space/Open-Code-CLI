# Qdrant FastEmbed Embedder

> Original Document: [Qdrant FastEmbed Embedder](https://docs.agno.com/concepts/knowledge/embedder/qdrant_fastembed.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.697Z

---

# Qdrant FastEmbed Embedder

The `FastEmbedEmbedder` class is used to embed text data into vectors using the [FastEmbed](https://qdrant.github.io/fastembed/).

## Usage

```python qdrant_fastembed.py theme={null}
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector
from agno.knowledge.embedder.fastembed import FastEmbedEmbedder

# Embed sentence in database
embeddings = FastEmbedEmbedder().get_embedding("The quick brown fox jumps over the lazy dog.")

# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Use an embedder in a knowledge base
knowledge = Knowledge(
    vector_db=PgVector(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        table_name="qdrant_embeddings",
        embedder=FastEmbedEmbedder(),
    ),
    max_results=2,
)
```

## Params

| Parameter    | Type  | Default                  | Description                                    |
| ------------ | ----- | ------------------------ | ---------------------------------------------- |
| `dimensions` | `int` | -                        | The dimensionality of the generated embeddings |
| `model`      | `str` | `BAAI/bge-small-en-v1.5` | The name of the qdrant\_fastembed model to use |

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/agent_concepts/knowledge/embedders/qdrant_fastembed.py)
