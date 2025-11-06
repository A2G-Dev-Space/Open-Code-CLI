# Tool Use

> Original Document: [Tool Use](https://docs.agno.com/examples/models/xai/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.869Z

---

# Tool Use

## Code

```python cookbook/models/xai/tool_use.py theme={null}
"""Build a Web Search Agent using xAI."""

from agno.agent import Agent
from agno.models.xai import xAI
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=xAI(id="grok-2"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Whats happening in France?")

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
    pip install -U xai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
