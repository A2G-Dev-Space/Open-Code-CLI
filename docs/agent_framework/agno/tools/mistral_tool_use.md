# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/mistral/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.153Z

---

# Agent with Tools

## Code

```python cookbook/models/mistral/tool_use.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.mistral import MistralChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=MistralChat(
        id="mistral-large-latest",
    ),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

agent.print_response("Whats happening in France?", stream=True)

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
      python cookbook/models/mistral/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
