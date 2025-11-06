# Async Tool Use

> Original Document: [Async Tool Use](https://docs.agno.com/examples/models/xai/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:17.104Z

---

# Async Tool Use

## Code

```python cookbook/models/xai/async_tool_use.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

import asyncio

from agno.agent import Agent
from agno.models.xai import xAI
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=xAI(id="grok-2"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
asyncio.run(agent.aprint_response("Whats happening in France?", stream=True))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export XAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U xai ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
