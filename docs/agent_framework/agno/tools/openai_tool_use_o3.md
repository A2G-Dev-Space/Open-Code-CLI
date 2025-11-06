# Tool Use O3

> Original Document: [Tool Use O3](https://docs.agno.com/examples/models/openai/responses/tool_use_o3.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.501Z

---

# Tool Use O3

## Code

```python cookbook/models/openai/responses/tool_use_o3.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.yfinance import YFinanceTools

agent = Agent(
    model=OpenAIResponses(id="o3"),
    tools=[YFinanceTools(cache_results=True)],
    markdown=True,
    telemetry=False,
)

agent.print_response("What is the current price of TSLA?", stream=True)

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
      python cookbook/models/openai/responses/tool_use_o3.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/tool_use_o3.py
      ```
    </CodeGroup>
  </Step>
</Steps>
