# Claude with Reasoning Tools

> Original Document: [Claude with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/claude-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.953Z

---

# Claude with Reasoning Tools

This example shows how to use `ReasoningTools` with a Claude model.

## Code

```python cookbook/reasoning/tools/claude_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

reasoning_agent = Agent(
    model=Claude(id="claude-sonnet-4-20250514"),
    tools=[
        ReasoningTools(add_instructions=True),
        DuckDuckGoTools(search=True),
    ],
    instructions="Use tables to display data.",
    markdown=True,
)

# Semiconductor market analysis example
reasoning_agent.print_response(
    """\
    Analyze the semiconductor market performance focusing on:
    - NVIDIA (NVDA)
    - AMD (AMD)
    - Intel (INTC)
    - Taiwan Semiconductor (TSM)
    Compare their market positions, growth metrics, and future outlook.""",
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
    export ANTHROPIC_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U anthropic agno ddgs
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/claude_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/claude_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
