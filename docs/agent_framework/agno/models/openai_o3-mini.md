# OpenAI gpt-5-mini

> Original Document: [OpenAI gpt-5-mini](https://docs.agno.com/examples/concepts/reasoning/models/openai/o3-mini.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.940Z

---

# OpenAI gpt-5-mini

## Code

```python cookbook/reasoning/models/openai/o3_mini.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

agent = Agent(model=OpenAIChat(id="gpt-5-mini"))
agent.print_response("Write a report comparing NVDA to TSLA", stream=True)
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
        python cookbook/reasoning/models/openai/o3_mini.py
      ```

      ```bash Windows theme={null}
        python cookbook/reasoning/models/openai/o3_mini.py
      ```
    </CodeGroup>
  </Step>
</Steps>
