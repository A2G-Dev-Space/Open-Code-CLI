# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/deepseek/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.954Z

---

# Agent with Tools

## Code

```python cookbook/models/deepseek/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.deepseek import DeepSeek
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=DeepSeek(id="deepseek-chat"),
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
    export DEEPSEEK_API_KEY=xxx
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
      python cookbook/models/deepseek/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/deepseek/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
