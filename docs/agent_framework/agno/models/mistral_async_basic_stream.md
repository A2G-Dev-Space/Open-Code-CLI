# Async Basic Streaming Agent

> Original Document: [Async Basic Streaming Agent](https://docs.agno.com/examples/models/mistral/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.055Z

---

# Async Basic Streaming Agent

## Code

```python cookbook/models/mistral/async_basic_stream.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.mistral.mistral import MistralChat

agent = Agent(
    model=MistralChat(id="mistral-large-latest"),
    markdown=True,
)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story", stream=True))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
