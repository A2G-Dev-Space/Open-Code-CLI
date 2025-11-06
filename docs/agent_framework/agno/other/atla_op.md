# Atla

> Original Document: [Atla](https://docs.agno.com/examples/concepts/integrations/observability/atla_op.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.668Z

---

# Atla

This example shows how to add observability to your agno agent with Atla.

## Code

```python cookbook/integrations/observability/atla_op.py theme={null}
from os import getenv

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from atla_insights import configure, instrument_agno

configure(token=getenv("ATLA_API_KEY"))

agent = Agent(
    name="Internet Search Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    instructions="You are an internet search agent. Find and provide accurate information on any topic.",
    debug_mode=True,
)

# Instrument and run
with instrument_agno("openai"):
    agent.print_response("What are the latest developments in artificial intelligence?")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    Sign up for an account at [https://app.atla-ai.com](https://app.atla-ai.com)

    ```bash  theme={null}
    export ATLA_API_KEY=<your-key>
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno atla-insights openai
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/integrations/observability/atla_op.py
      ```

      ```bash Windows theme={null}
      python cookbook/integrations/observability/atla_op.py
      ```
    </CodeGroup>
  </Step>
</Steps>
