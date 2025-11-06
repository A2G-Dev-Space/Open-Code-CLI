# Agent with Storage

> Original Document: [Agent with Storage](https://docs.agno.com/examples/models/cerebras_openai/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.432Z

---

# Agent with Storage

## Code

```python cookbook/models/cerebras_openai/knowledge.py theme={null}

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.models.cerebras import CerebrasOpenAI
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
    model=CerebrasOpenAI(id="llama-4-scout-17b-16e-instruct"), knowledge=knowledge
)
agent.print_response("How to make Thai curry?", markdown=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export CEREBRAS_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai ddgs sqlalchemy pgvector pypdf agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/cerebras_openai/knowledge.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cerebras_openai/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
