# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/cerebras_openai/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.673Z

---

# Agent with Tools

## Code

```python cookbook/models/cerebras_openai/basic_tools.py theme={null}
from agno.agent import Agent
from agno.models.cerebras import CerebrasOpenAI
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=CerebrasOpenAI(id="llama-4-scout-17b-16e-instruct"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

# Print the response in the terminal
agent.print_response("Whats happening in France?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export CEREBRAS_API_KEY=xxx
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
      python cookbook/models/cerebras_openai/basic_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cerebras_openai/basic_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
