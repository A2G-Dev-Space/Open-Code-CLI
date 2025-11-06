# Knowledge

> Original Document: [Knowledge](https://docs.agno.com/examples/models/openai/responses/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.702Z

---

# Knowledge

## Code

```python cookbook/models/openai/responses/knowledge.py theme={null}
"""Run `pip install ddgs sqlalchemy pgvector pypdf openai` to install dependencies."""

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.models.openai import OpenAIResponses
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(table_name="recipes", db_url=db_url),
)
# Add content to the knowledge
knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
)

agent = Agent(model=OpenAIResponses(id="gpt-5-mini"), knowledge=knowledge)
agent.print_response("How to make Thai curry?", markdown=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/knowledge.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
