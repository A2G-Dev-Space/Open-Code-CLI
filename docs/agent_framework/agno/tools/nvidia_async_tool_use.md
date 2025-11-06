# Async Agent with Tools

> Original Document: [Async Agent with Tools](https://docs.agno.com/examples/models/nvidia/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.220Z

---

# Async Agent with Tools

## Code

```python cookbook/models/nvidia/async_tool_use.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.nvidia import Nvidia
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Nvidia(id="meta/llama-3.3-70b-instruct"),
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
    export NVIDIA_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nvidia/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nvidia/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
