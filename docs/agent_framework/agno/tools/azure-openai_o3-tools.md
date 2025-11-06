# Azure OpenAI o3

> Original Document: [Azure OpenAI o3](https://docs.agno.com/examples/concepts/reasoning/models/azure-openai/o3-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.905Z

---

# Azure OpenAI o3

## Code

```python ccookbook/reasoning/models/azure_openai/o3_mini_with_tools.py theme={null}
from agno.agent import Agent
from agno.models.azure.openai_chat import AzureOpenAI
from agno.tools.yfinance import YFinanceTools

agent = Agent(
    model=AzureOpenAI(id="o3"),
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
    export AZURE_OPENAI_API_KEY=xxx
    export AZURE_OPENAI_ENDPOINT=xxx
    export AZURE_DEPLOYMENT=xxx
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
      python ccookbook/reasoning/models/azure_openai/o3_mini_with_tools.py
      ```

      ```bash Windows theme={null}
      python ccookbook/reasoning/models/azure_openai/o3_mini_with_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
