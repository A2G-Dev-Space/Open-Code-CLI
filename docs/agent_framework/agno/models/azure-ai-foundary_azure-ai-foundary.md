# Azure AI Foundry

> Original Document: [Azure AI Foundry](https://docs.agno.com/examples/concepts/reasoning/models/azure-ai-foundary/azure-ai-foundary.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.898Z

---

# Azure AI Foundry

## Code

```python cookbook/reasoning/models/azure_ai_foundry/reasoning_model_deepseek.py theme={null}
import os

from agno.agent import Agent
from agno.models.azure import AzureAIFoundry

agent = Agent(
    model=AzureAIFoundry(id="gpt-5-mini"),
    reasoning_model=AzureAIFoundry(
        id="DeepSeek-R1",
        azure_endpoint=os.getenv("AZURE_ENDPOINT"),
        api_key=os.getenv("AZURE_API_KEY"),
    ),
)

agent.print_response(
    "Solve the trolley problem. Evaluate multiple ethical frameworks. "
    "Include an ASCII diagram of your solution.",
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AZURE_API_KEY=xxx
    export AZURE_ENDPOINT=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U azure-ai-inference agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/models/azure_ai_foundry/reasoning_model_deepseek.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/azure_ai_foundry/reasoning_model_deepseek.py
      ```
    </CodeGroup>
  </Step>
</Steps>
