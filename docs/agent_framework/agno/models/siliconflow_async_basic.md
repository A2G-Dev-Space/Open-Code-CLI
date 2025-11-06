# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/siliconflow/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.883Z

---

# Async Basic Agent

## Code

```python cookbook/models/siliconflow/async_basic.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.siliconflow import Siliconflow

agent = Agent(model=Siliconflow(id="openai/gpt-oss-120b"), markdown=True)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story"))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">`bash export SILICONFLOW_API_KEY=xxx `</Step>

  <Step title="Install libraries">`bash pip install -U agno openai `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/siliconflow/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/siliconflow/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
