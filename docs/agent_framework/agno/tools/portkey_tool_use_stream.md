# Agent with Tools and Streaming

> Original Document: [Agent with Tools and Streaming](https://docs.agno.com/examples/models/portkey/tool_use_stream.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.594Z

---

# Agent with Tools and Streaming

## Code

```python cookbook/models/portkey/tool_use_stream.py theme={null}
from agno.agent import Agent
from agno.models.portkey import Portkey
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Portkey(id="@first-integrati-707071/gpt-5-nano"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

# Print the response in the terminal
agent.print_response("What are the latest developments in AI gateways?", stream=True)
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
      python cookbook/models/portkey/tool_use_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/portkey/tool_use_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
