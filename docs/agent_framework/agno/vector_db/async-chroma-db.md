# ChromaDB Async

> Original Document: [ChromaDB Async](https://docs.agno.com/examples/concepts/vectordb/chroma-db/async-chroma-db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.157Z

---

# ChromaDB Async

## Code

```python cookbook/knowledge/vector_db/chroma_db/async_chroma_db.py theme={null}


import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.chroma import ChromaDb

vector_db = ChromaDb(collection="recipes", path="tmp/chromadb", persistent_client=True)

knowledge = Knowledge(
    vector_db=vector_db,
)

agent = Agent(knowledge=knowledge)

if __name__ == "__main__":
    asyncio.run(
        knowledge.add_content_async(url="https://docs.agno.com/introduction/agents.md")
    )

    asyncio.run(
        agent.aprint_response("What is the purpose of an Agno Agent?", markdown=True)
    )
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U chromadb pypdf openai agno
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/vector_db/chroma_db/async_chroma_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/chroma_db/async_chroma_db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
