# OpenAI o4-mini

> Original Document: [OpenAI o4-mini](https://docs.agno.com/examples/concepts/reasoning/models/openai/o4-mini.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.918Z

---

# OpenAI o4-mini

## Code

```python cookbook/reasoning/models/openai/o4_mini.py theme={null}
from agno.agent import Agent
from agno.models.openai.responses import OpenAIResponses

agent = Agent(model=OpenAIResponses(id="o4-mini"))

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
        python cookbook/reasoning/models/openai/o4_mini.py
      ```

      ```bash Windows theme={null}
        python cookbook/reasoning/models/openai/o4_mini.py
      ```
    </CodeGroup>
  </Step>
</Steps>
