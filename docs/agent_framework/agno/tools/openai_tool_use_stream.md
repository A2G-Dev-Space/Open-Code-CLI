# Tool Use Stream

> Original Document: [Tool Use Stream](https://docs.agno.com/examples/models/openai/responses/tool_use_stream.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.756Z

---

# Tool Use Stream

## Code

```python cookbook/models/openai/responses/tool_use_stream.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
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
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/tool_use_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/tool_use_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
