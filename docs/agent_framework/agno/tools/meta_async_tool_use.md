# Agent with Async Tool Usage

> Original Document: [Agent with Async Tool Usage](https://docs.agno.com/examples/models/meta/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.047Z

---

# Agent with Async Tool Usage

## Code

```python cookbook/models/meta/llama/async_tool_use.py theme={null}
"""Run `pip install agno llama-api-client` to install dependencies."""

import asyncio

from agno.agent import Agent
from agno.models.meta import Llama
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8"),
    tools=[DuckDuckGoTools()],
    debug_mode=True,
)
asyncio.run(agent.aprint_response("Whats happening in UK and in USA?"))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your LLAMA API key">
    ```bash  theme={null}
    export LLAMA_API_KEY=YOUR_API_KEY
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install llama-api-client ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/meta/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
