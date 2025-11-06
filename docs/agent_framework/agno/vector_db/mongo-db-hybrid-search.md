# MongoDB Hybrid Search

> Original Document: [MongoDB Hybrid Search](https://docs.agno.com/examples/concepts/vectordb/mongo-db/mongo-db-hybrid-search.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.194Z

---

# MongoDB Hybrid Search

## Code

```python cookbook/knowledge/vector_db/mongo_db/mongo_db_hybrid_search.py theme={null}
import typer
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.vectordb.mongodb import MongoDb
from agno.vectordb.search import SearchType
from rich.prompt import Prompt

mdb_connection_string = "mongodb://localhost:27017"

vector_db = MongoDb(
    collection_name="recipes",
    db_url=mdb_connection_string,
    search_index_name="recipes",
    search_type=SearchType.hybrid,
)

knowledge_base = Knowledge(
    vector_db=vector_db,
)

knowledge_base.add_content(
    name="Recipes",
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf",
    metadata={"doc_type": "recipe_book"},
)


def mongodb_agent(user: str = "user"):
    agent = Agent(
        user_id=user,
        knowledge=knowledge_base,
        search_knowledge=True,
    )

    while True:
        message = Prompt.ask(f"[bold] :sunglasses: {user} [/bold]")
        if message in ("exit", "bye"):
            break
        agent.print_response(message)


if __name__ == "__main__":
    typer.run(mongodb_agent)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pymongo typer rich pypdf openai agno
    ```
  </Step>

  <Step title="Run MongoDB">
    ```bash  theme={null}
    docker run -d \
    --name local-mongo \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/vector_db/mongo_db/mongo_db_hybrid_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/mongo_db/mongo_db_hybrid_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
