# Sync Operations

> Original Document: [Sync Operations](https://docs.agno.com/examples/concepts/knowledge/basic-operations/sync-operations.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.700Z

---

# Sync Operations

This example shows how to add content to your knowledge base synchronously. While async operations are recommended for better performance, sync operations can be useful in certain scenarios.

## Code

```python 13_sync.py theme={null}
from agno.agent import Agent
from agno.db.postgres import PostgresDb
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

contents_db = PostgresDb(
    db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
    knowledge_table="knowledge_contents",
)
# Create Knowledge Instance
knowledge = Knowledge(
    name="Basic SDK Knowledge Base",
    description="Agno 2.0 Knowledge Implementation",
    vector_db=PgVector(
        table_name="vectors", db_url="postgresql+psycopg://ai:ai@localhost:5532/ai"
    ),
)

knowledge.add_content(
    name="CV",
    path="cookbook/knowledge/testing_resources/cv_1.pdf",
    metadata={"user_tag": "Engineering Candidates"},
)


agent = Agent(
    name="My Agent",
    description="Agno 2.0 Agent Implementation",
    knowledge=knowledge,
    search_knowledge=True,
    debug_mode=True,
)

agent.print_response(
    "What skills does Jordan Mitchell have?",
    markdown=True,
)
```

## Usage

<Steps>
  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno sqlalchemy psycopg pgvector openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run the example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/basic_operations/13_sync.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/basic_operations/13_sync.py
      ```
    </CodeGroup>
  </Step>
</Steps>
