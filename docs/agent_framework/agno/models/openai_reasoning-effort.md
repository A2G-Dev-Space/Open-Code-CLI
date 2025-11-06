# OpenAI gpt-5-mini with reasoning effort

> Original Document: [OpenAI gpt-5-mini with reasoning effort](https://docs.agno.com/examples/concepts/reasoning/models/openai/reasoning-effort.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.940Z

---

# OpenAI gpt-5-mini with reasoning effort

## Code

```python cookbook/reasoning/models/openai/reasoning_effort.py theme={null}
"""Run `pip install openai ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini", reasoning_effort="high"),
    tools=[DuckDuckGoTools(search=True)],
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
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno ddgs
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
