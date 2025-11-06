# Agent With Knowledge

> Original Document: [Agent With Knowledge](https://docs.agno.com/examples/models/meta/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.046Z

---

# Agent With Knowledge

## Code

```python cookbook/models/meta/llama/knowledge.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.models.meta import Llama
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(table_name="recipes", db_url=db_url),
)
# Add content to the knowledge
knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
)

agent = Agent(
    model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8"), knowledge=knowledge
)
agent.print_response("How to make Thai curry?", markdown=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your LLAMA API key">
    ```bash  theme={null}
    export LLAMA_API_KEY=YOUR_API_KEY
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install ddgs sqlalchemy pgvector pypdf llama-api-client
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python python cookbook/models/meta/llama/knowledge.py
      ```

      ```bash Windows theme={null}
      python python cookbook/models/meta/llama/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
