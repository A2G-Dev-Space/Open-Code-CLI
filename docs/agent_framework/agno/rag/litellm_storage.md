# Agent with Storage

> Original Document: [Agent with Storage](https://docs.agno.com/examples/models/litellm/storage.md)
> Category: rag
> Downloaded: 2025-11-06T11:51:15.936Z

---

# Agent with Storage

## Code

```python cookbook/models/litellm/db.py theme={null}
from agno.agent import Agent
from agno.models.litellm import LiteLLM
from agno.db.sqlite import SqliteDb
from agno.tools.duckduckgo import DuckDuckGoTools

# Setup the database
db = SqliteDb(
    db_file="tmp/data.db",
)

# Add storage to the Agent
agent = Agent(
    model=LiteLLM(id="gpt-5-mini"),
    db=db,
    tools=[DuckDuckGoTools()],
    add_history_to_context=True,
)

agent.print_response("How many people live in Canada?")
agent.print_response("What is their national anthem called?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export LITELLM_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U litellm ddgs openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/db.py
      ```

      ```bash Windows theme={null}
      python cookbook\models\litellm\db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
