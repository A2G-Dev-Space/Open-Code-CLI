# Azure OpenAI o1

> Original Document: [Azure OpenAI o1](https://docs.agno.com/examples/concepts/reasoning/models/azure-openai/o1.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.904Z

---

# Azure OpenAI o1

## Code

```python cookbook/reasoning/models/azure_openai/o1.py theme={null}
from agno.agent import Agent
from agno.models.azure.openai_chat import AzureOpenAI

agent = Agent(model=AzureOpenAI(id="o1"))
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
      python cookbook/reasoning/models/azure_openai/o1.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/azure_openai/o1.py
      ```
    </CodeGroup>
  </Step>
</Steps>
