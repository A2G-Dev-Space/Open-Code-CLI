# Async Agent with Tools

> Original Document: [Async Agent with Tools](https://docs.agno.com/examples/models/nexus/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.188Z

---

# Async Agent with Tools

## Code

```python cookbook/models/nexus/async_tool_use.py theme={null}
"""
Async example using Nexus with tool calls
"""

import asyncio

from agno.agent import Agent
from agno.models.nexus import Nexus
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Nexus(id="anthropic/claude-sonnet-4-20250514"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

asyncio.run(agent.aprint_response("Whats happening in France?"))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
    export ANTHROPIC_API_KEY=xxx 
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno ddgs openai 
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nexus/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nexus/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
