# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/lmstudio/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.012Z

---

# Agent with Tools

## Code

```python cookbook/models/lmstudio/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.lmstudio import LMStudio
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=LMStudio(id="qwen2.5-7b-instruct-1m"),
    tools=[DuckDuckGoTools()],
        markdown=True,
)
agent.print_response("Whats happening in France?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install LM Studio">
    Install LM Studio from [here](https://lmstudio.ai/download) and download the
    model you want to use.
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/lmstudio/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/lmstudio/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
