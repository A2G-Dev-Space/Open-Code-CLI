# Milvus Async

> Original Document: [Milvus Async](https://docs.agno.com/examples/concepts/vectordb/milvus-db/async-milvus-db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.179Z

---

# Milvus Async

## Code

```python cookbook/knowledge/vector_db/milvus_db/async_milvus_db.py theme={null}
import asyncio
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.milvus import Milvus

vector_db = Milvus(
    collection="recipes",
    uri="tmp/milvus.db",
)

knowledge = Knowledge(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
    vector_db=vector_db,
)

agent = Agent(knowledge=knowledge)

if __name__ == "__main__":
    asyncio.run(
        knowledge.add_content_async(
            url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
        )
    )

    asyncio.run(agent.aprint_response("How to make Tom Kha Gai", markdown=True))
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
      python cookbook/knowledge/vector_db/milvus_db/async_milvus_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/milvus_db/async_milvus_db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
