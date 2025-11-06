# xAI Grok 3 Mini

> Original Document: [xAI Grok 3 Mini](https://docs.agno.com/examples/concepts/reasoning/models/xai/reasoning-effort.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.203Z

---

# xAI Grok 3 Mini

## Code

```python cookbook/reasoning/models/xai/reasoning_effort.py theme={null}
from agno.agent import Agent
from agno.models.xai import xAI
from agno.tools.yfinance import YFinanceTools

agent = Agent(
    model=xAI(id="grok-3-mini-fast", reasoning_effort="high"),
    tools=[
        YFinanceTools(
            stock_price=True,
            analyst_recommendations=True,
            company_info=True,
            company_news=True,
        )
    ],
    instructions="Use tables to display data.",
        markdown=True,
)
agent.print_response("Write a report comparing NVDA to TSLA", stream=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export XAI_API_KEY=xxx
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
      python cookbook/reasoning/models/xai/reasoning_effort.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/xai/reasoning_effort.py
      ```
    </CodeGroup>
  </Step>
</Steps>
