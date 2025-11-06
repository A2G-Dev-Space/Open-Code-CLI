# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/portkey/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.588Z

---

# Agent with Tools

## Code

```python cookbook/models/portkey/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.portkey import Portkey
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Portkey(id="@first-integrati-707071/gpt-5-nano"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

# Print the response in the terminal
agent.print_response("What are the latest developments in AI gateways?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
    export PORTKEY_API_KEY=***
    export PORTKEY_VIRTUAL_KEY=***
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/portkey/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/portkey/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
