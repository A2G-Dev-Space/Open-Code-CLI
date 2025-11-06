# OpenAI o4-mini with reasoning summary

> Original Document: [OpenAI o4-mini with reasoning summary](https://docs.agno.com/examples/concepts/reasoning/models/openai/reasoning-summary.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.926Z

---

# OpenAI o4-mini with reasoning summary

## Code

```python cookbook/reasoning/models/openai/reasoning_summary.py theme={null}
"""Run `pip install openai ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.duckduckgo import DuckDuckGoTools

# Setup the reasoning Agent
agent = Agent(
    model=OpenAIResponses(
        id="o4-mini",
        reasoning_summary="auto",  # Requesting a reasoning summary
    ),
    tools=[DuckDuckGoTools(search=True)],
    instructions="Use tables to display the analysis",
    markdown=True,
)

agent.print_response(
    "Write a brief report comparing NVDA to TSLA",
    stream=True,
    stream_events=True,
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
    pip install -U openai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
        python cookbook/reasoning/models/openai/reasoning_summary.py
      ```

      ```bash Windows theme={null}
        python cookbook/reasoning/models/openai/reasoning_summary.py
      ```
    </CodeGroup>
  </Step>
</Steps>
