# OpenAI o1 pro

> Original Document: [OpenAI o1 pro](https://docs.agno.com/examples/concepts/reasoning/models/openai/o1-pro.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.919Z

---

# OpenAI o1 pro

## Code

```python cookbook/reasoning/models/openai/o1_pro.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIResponses

agent = Agent(model=OpenAIResponses(id="o1-pro"))
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
        python cookbook/reasoning/models/openai/o1_pro.py
      ```

      ```bash Windows theme={null}
        python cookbook/reasoning/models/openai/o1_pro.py
      ```
    </CodeGroup>
  </Step>
</Steps>
