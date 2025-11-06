# Milvus

> Original Document: [Milvus](https://docs.agno.com/examples/concepts/vectordb/milvus-db/milvus-db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.192Z

---

# Milvus

## Code

```python cookbook/knowledge/vector_db/milvus_db/milvus_db.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.milvus import Milvus

vector_db = Milvus(
    collection="recipes",
    uri="tmp/milvus.db",
)

knowledge = Knowledge(
    name="My Milvus Knowledge Base",
    description="This is a knowledge base that uses a Milvus DB",
    vector_db=vector_db,
)

asyncio.run(
    knowledge.add_content_async(
        name="Recipes",
        url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf",
        metadata={"doc_type": "recipe_book"},
    )
)

agent = Agent(knowledge=knowledge)
agent.print_response("How to make Tom Kha Gai", markdown=True)

vector_db.delete_by_name("Recipes")

vector_db.delete_by_metadata({"doc_type": "recipe_book"})
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pymilvus pypdf openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/vector_db/milvus_db/milvus_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/milvus_db/milvus_db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
