# Knowledge

> Original Document: [Knowledge](https://docs.agno.com/examples/models/ollama/knowledge.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.298Z

---

# Knowledge

## Code

```python cookbook/models/ollama/knowledge.py theme={null}
from agno.agent import Agent
from agno.knowledge.embedder.ollama import OllamaEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.models.ollama import Ollama
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(
        table_name="recipes",
        db_url=db_url,
        embedder=OllamaEmbedder(id="llama3.2", dimensions=3072),
    ),
)
# Add content to the knowledge
knowledge.add_content(
    url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"
)

agent = Agent(model=Ollama(id="llama3.2"), knowledge=knowledge)
agent.print_response("How to make Thai curry?", markdown=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.2
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno ddgs sqlalchemy pgvector pypdf openai ollama
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ollama/knowledge.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/knowledge.py
      ```
    </CodeGroup>
  </Step>
</Steps>
