# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/cohere/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.765Z

---

# Agent with Tools

## Code

```python cookbook/models/cohere/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.cohere import Cohere
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Cohere(id="command-a-03-2025"),
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
    export CO_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U cohere ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/cohere/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cohere/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
