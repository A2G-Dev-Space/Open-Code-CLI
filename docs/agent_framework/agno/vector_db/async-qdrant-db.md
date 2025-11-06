# Qdrant Async

> Original Document: [Qdrant Async](https://docs.agno.com/examples/concepts/vectordb/qdrant-db/async-qdrant-db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.196Z

---

# Qdrant Async

## Code

```python cookbook/knowledge/vector_db/qdrant_db/async_qdrant_db.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.qdrant import Qdrant

COLLECTION_NAME = "thai-recipes"

vector_db = Qdrant(collection=COLLECTION_NAME, url="http://localhost:6333")

knowledge = Knowledge(
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
    pip install -U qdrant-client pypdf openai agno
    ```
  </Step>

  <Step title="Run Qdrant">
    ```bash  theme={null}
    docker run -d --name qdrant -p 6333:6333 qdrant/qdrant:latest
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/vector_db/qdrant_db/async_qdrant_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/qdrant_db/async_qdrant_db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
