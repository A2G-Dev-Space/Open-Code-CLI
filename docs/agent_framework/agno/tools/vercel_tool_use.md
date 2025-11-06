# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/vercel/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.723Z

---

# Agent with Tools

## Code

```python cookbook/models/vercel/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.vercel import V0
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=V0(id="v0-1.0-md"),
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
    export V0_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vercel/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vercel/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
