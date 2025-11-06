# Demo Qwen

> Original Document: [Demo Qwen](https://docs.agno.com/examples/models/ollama/demo_qwen.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.286Z

---

# Demo Qwen

## Code

```python cookbook/models/ollama/demo_qwen.py theme={null}
from agno.agent import Agent
from agno.models.ollama import Ollama
from agno.tools.yfinance import YFinanceTools

agent = Agent(
    model=Ollama(id="qwen3:8b"),
    tools=[
        YFinanceTools(
            stock_price=True,
            analyst_recommendations=True,
            company_info=True,
            company_news=True,
        ),
    ],
    instructions="Use tables to display data.",
)

agent.print_response("Write a report on NVDA", stream=True, markdown=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull qwen3:8b
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ollama agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ollama/demo_qwen.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/demo_qwen.py
      ```
    </CodeGroup>
  </Step>
</Steps>
