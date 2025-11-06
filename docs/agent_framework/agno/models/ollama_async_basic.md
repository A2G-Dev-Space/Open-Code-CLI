# Async Basic

> Original Document: [Async Basic](https://docs.agno.com/examples/models/ollama/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.229Z

---

# Async Basic

## Code

```python cookbook/models/ollama/async_basic.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.ollama import Ollama

agent = Agent(
    model=Ollama(id="llama3.1:8b"),
    description="You help people with their health and fitness goals.",
    instructions=["Recipes should be under 5 ingredients"],
)
# -*- Print a response to the cli
asyncio.run(agent.aprint_response("Share a breakfast recipe.", markdown=True))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.1:8b
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ollama agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ollama/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
