# Remove Content

> Original Document: [Remove Content](https://docs.agno.com/examples/concepts/knowledge/basic-operations/remove-content.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.700Z

---

# Remove Content

## Code

```python 09_remove_content.py theme={null}
import asyncio
from agno.db.postgres import PostgresDb
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector

# Create Knowledge Instance
knowledge = Knowledge(
    name="Basic SDK Knowledge Base",
    description="Agno 2.0 Knowledge Implementation",
    contents_db=PostgresDb(
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        knowledge_table="knowledge_contents",
    ),
    vector_db=PgVector(
        table_name="vectors", db_url="postgresql+psycopg://ai:ai@localhost:5532/ai"
    ),
)

asyncio.run(
    knowledge.add_content_async(
        name="CV",
        path="cookbook/knowledge/testing_resources/cv_1.pdf",
        metadata={"user_tag": "Engineering Candidates"},
    )
)


# Remove content and vectors by id
contents, _ = knowledge.get_content()
for content in contents:
    print(content.id)
    print(" ")
    knowledge.remove_content_by_id(content.id)

# Remove all content
knowledge.remove_all_content()
```

## Usage

<Steps>
  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno sqlalchemy psycopg pgvector
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run the example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/basic_operations/09_remove_content.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/basic_operations/09_remove_content.py
      ```
    </CodeGroup>
  </Step>
</Steps>
