# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/meta/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.048Z

---

# Agent with Tools

## Code

```python cookbook/models/meta/llama/tool_use.py theme={null}
"""Run `pip install agno llama-api-client` to install dependencies."""

from agno.agent import Agent
from agno.models.meta import Llama
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8"),
    tools=[YFinanceTools()],
)
agent.print_response("Whats happening in UK and in USA?")
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
      python cookbook/models/meta/llama/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/llama/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
