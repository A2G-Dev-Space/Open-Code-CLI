# Agent with Knowledge Base

> Original Document: [Agent with Knowledge Base](https://docs.agno.com/examples/models/azure/openai/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.392Z

---

# Agent with Knowledge Base

## Code

```python cookbook/models/azure/openai/knowledge.py theme={null}
import asyncio
from agno.agent import Agent
from agno.knowledge.embedder.azure_openai import AzureOpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.models.azure import AzureOpenAI
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="recipes",
        db_url=db_url,
        embedder=AzureOpenAIEmbedder(),
    ),
)
# Add content to the knowledge
asyncio.run(knowledge.add_content_async(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
))

agent = Agent(
    model=AzureOpenAI(id="gpt-5-mini"),
    knowledge=knowledge,
)
agent.print_response("How to make Thai curry?", markdown=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AZURE_OPENAI_API_KEY=xxx
    export AZURE_OPENAI_ENDPOINT=xxx
    export AZURE_DEPLOYMENT=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno ddgs sqlalchemy pgvector pypdf
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
      python cookbook/models/azure/openai/knowledge.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/azure/openai/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
kbook/models/azure/ai_foundry/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
