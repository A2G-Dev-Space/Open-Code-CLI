# OpenAI GPT-4.1

> Original Document: [OpenAI GPT-4.1](https://docs.agno.com/examples/concepts/reasoning/models/openai/reasoning-model-gpt-4-1.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.924Z

---

# OpenAI GPT-4.1

## Code

```python cookbook/reasoning/models/openai/reasoning_model_gpt_4_1.py theme={null}
from agno.agent import Agent
from agno.models.openai.responses import OpenAIResponses

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
    reasoning_model=OpenAIResponses(id="gpt-4.1"),
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
        python cookbook/reasoning/models/openai/reasoning_model_gpt_4_1.py
      ```

      ```bash Windows theme={null}
        python cookbook/reasoning/models/openai/reasoning_model_gpt_4_1.py
      ```
    </CodeGroup>
  </Step>
</Steps>
