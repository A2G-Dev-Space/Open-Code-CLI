# Async Tool Use

> Original Document: [Async Tool Use](https://docs.agno.com/examples/models/openai/responses/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.390Z

---

# Async Tool Use

## Code

```python cookbook/models/openai/responses/async_tool_use.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
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
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
