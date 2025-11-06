# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/nvidia/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.193Z

---

# Async Basic Agent

## Code

```python cookbook/models/nvidia/async_basic.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.nvidia import Nvidia

agent = Agent(model=Nvidia(id="meta/llama-3.3-70b-instruct"), markdown=True)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story"))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export NVIDIA_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nvidia/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nvidia/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
