# Keyword Search

> Original Document: [Keyword Search](https://docs.agno.com/examples/concepts/knowledge/search_type/keyword-search.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.823Z

---

# Keyword Search

## Code

```python keyword_search.py theme={null}
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.pgvector import PgVector, SearchType

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Load knowledge base using keyword search
keyword_db = PgVector(
    table_name="recipes", db_url=db_url, search_type=SearchType.keyword
)
knowledge = Knowledge(
    name="Keyword Search Knowledge Base",
    vector_db=keyword_db,
)

knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf",
)

# Run a keyword-based query
results = keyword_db.search("chicken coconut soup", limit=5)
print("Keyword Search Results:", results)
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
      python cookbook/knowledge/search_type/keyword_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/search_type/keyword_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
