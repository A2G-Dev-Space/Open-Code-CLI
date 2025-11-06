# Agent with Reasoning Effort

> Original Document: [Agent with Reasoning Effort](https://docs.agno.com/examples/models/openai/chat/reasoning_effort.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.354Z

---

# Agent with Reasoning Effort

## Code

```python cookbook/reasoning/models/openai/reasoning_effort.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini", reasoning_effort="high"),
    tools=[DuckDuckGoTools()],
        markdown=True,
)

agent.print_response("Write a report on the latest news on AI?", stream=True)
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
      python cookbook/reasoning/models/openai/reasoning_effort.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/openai/reasoning_effort.py
      ```
    </CodeGroup>
  </Step>
</Steps>
