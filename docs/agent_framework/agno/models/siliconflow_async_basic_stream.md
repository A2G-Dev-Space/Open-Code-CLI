# Async Streaming Agent

> Original Document: [Async Streaming Agent](https://docs.agno.com/examples/models/siliconflow/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.630Z

---

# Async Streaming Agent

## Code

```python cookbook/models/siliconflow/async_basic_stream.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.siliconflow import Siliconflow

agent = Agent(model=Siliconflow(id="openai/gpt-oss-120b"), markdown=True)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story", stream=True))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">`bash export SILICONFLOW_API_KEY=xxx `</Step>

  <Step title="Install libraries">`bash pip install -U agno openai `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/siliconflow/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/siliconflow/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
