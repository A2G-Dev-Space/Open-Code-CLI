# Async Agent with Tools

> Original Document: [Async Agent with Tools](https://docs.agno.com/examples/models/mistral/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.338Z

---

# Async Agent with Tools

## Code

```python cookbook/models/mistral/async_tool_use.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.mistral.mistral import MistralChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=MistralChat(id="mistral-large-latest"),
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
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
