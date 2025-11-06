# Vercel with Reasoning Tools

> Original Document: [Vercel with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/vercel-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.975Z

---

# Vercel with Reasoning Tools

This example shows how to use `ReasoningTools` with a Vercel model.

## Code

```python cookbook/reasoning/tools/vercel_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.vercel import v0
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

reasoning_agent = Agent(
    model=v0(id="v0-1.0-md"),
    tools=[
        ReasoningTools(add_instructions=True, add_few_shot=True),
        DuckDuckGoTools(),
    ],
    instructions=[
        "Use tables to display data",
        "Only output the report, no other text",
    ],
    markdown=True,
)

reasoning_agent.print_response(
    "Write a report on TSLA",
    stream=True,
    show_full_reasoning=True,
    stream_events=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export V0_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno ddgs
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/vercel_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/vercel_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
