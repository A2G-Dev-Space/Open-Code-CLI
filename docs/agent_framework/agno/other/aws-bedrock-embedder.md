# AWS Bedrock Embedder

> Original Document: [AWS Bedrock Embedder](https://docs.agno.com/examples/concepts/knowledge/embedders/aws-bedrock-embedder.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.694Z

---

# AWS Bedrock Embedder

## Code

```python cookbook/knowledge/embedders/aws_bedrock_embedder.py theme={null}
import asyncio
from agno.knowledge.embedder.aws_bedrock import AwsBedrockEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.pdf_reader import PDFReader
from agno.vectordb.pgvector import PgVector

embeddings = AwsBedrockEmbedder().get_embedding(
    "The quick brown fox jumps over the lazy dog."
)
# Print the embeddings and their dimensions
print(f"Embeddings: {embeddings[:5]}")
print(f"Dimensions: {len(embeddings)}")

# Example usage:
knowledge = Knowledge(
    vector_db=PgVector(
        table_name="recipes",
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        embedder=AwsBedrockEmbedder(),
    ),
)

knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf",
    reader=PDFReader(
        chunk_size=2048
    ),  # Required because cohere has a fixed size of 2048
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AWS_ACCESS_KEY_ID=xxx
    export AWS_SECRET_ACCESS_KEY=xxx
    export AWS_REGION=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U sqlalchemy psycopg pgvector boto3 agno
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
