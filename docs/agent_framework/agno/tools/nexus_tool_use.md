# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/nexus/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.203Z

---

# Agent with Tools

## Code

```python cookbook/models/nexus/tool_use.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.nexus import Nexus
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Nexus(id="anthropic/claude-sonnet-4-20250514"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

agent.print_response("Whats happening in France?")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    export ANTHROPIC_API_KEY=xxx 
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno ddgs openai 
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nexus/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nexus/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
