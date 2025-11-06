# Milvus Async Hybrid Search

> Original Document: [Milvus Async Hybrid Search](https://docs.agno.com/examples/concepts/vectordb/milvus-db/async-milvus-db-hybrid-search.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.175Z

---

# Milvus Async Hybrid Search

## Code

```python cookbook/knowledge/vector_db/milvus_db/async_milvus_db_hybrid_search.py theme={null}
import asyncio
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.milvus import Milvus, SearchType

vector_db = Milvus(
    collection="recipes", uri="tmp/milvus.db", search_type=SearchType.hybrid
)

knowledge = Knowledge(
    vector_db=vector_db,
)

asyncio.run(knowledge.add_content_async(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf",
))

agent = Agent(knowledge=knowledge)
if __name__ == "__main__":
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
      python cookbook/knowledge/vector_db/milvus_db/async_milvus_db_hybrid_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/milvus_db/async_milvus_db_hybrid_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
