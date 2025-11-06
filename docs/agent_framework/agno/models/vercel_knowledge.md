# Agent with Knowledge

> Original Document: [Agent with Knowledge](https://docs.agno.com/examples/models/vercel/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.705Z

---

# Agent with Knowledge

## Code

```python cookbook/models/vercel/knowledge.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.models.vercel import V0
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(table_name="recipes", db_url=db_url),
)
# Add content to the knowledge
knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
)

agent = Agent(model=V0(id="v0-1.0-md"), knowledge=knowledge)
agent.print_response("How to make Thai curry?", markdown=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export V0_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ddgs sqlalchemy pgvector pypdf openai agno
    ```
  </Step>

  <Step title="Run PgVector">
    ```bash  theme={null}
    docker run -d \
      -e POSTGRES_DB=ai \
      -e POSTGRES_USER=ai \
      -e POSTGRES_PASSWORD=ai \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -v pgvolume:/var/lib/postgresql/data \
      -p 5532:5432 \
      --name pgvector \
      agnohq/pgvector:16
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vercel/knowledge.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vercel/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
