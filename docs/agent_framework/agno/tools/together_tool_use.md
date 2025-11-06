# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/together/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.691Z

---

# Agent with Tools

## Code

```python cookbook/models/together/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.together import Together
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Together(id="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
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
    export TOGETHER_API_KEY=xxx
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
      python cookbook/models/together/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/together/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
