# Gemini with Reasoning Tools

> Original Document: [Gemini with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/gemini-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.949Z

---

# Gemini with Reasoning Tools

## Code

```python cookbook/reasoning/tools/gemini_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.google import Gemini
from agno.tools.reasoning import ReasoningTools
from agno.tools.duckduckgo import DuckDuckGoTools

reasoning_agent = Agent(
    model=Gemini(id="gemini-2.5-pro-preview-03-25"),
    tools=[
        ReasoningTools(
            think=True,
            analyze=True,
            add_instructions=True,
        ),
        DuckDuckGoTools(),
    ],
    instructions="Use tables where possible",
    stream_events=True,
        markdown=True,
    debug_mode=True,
)
reasoning_agent.print_response(
    "Write a report comparing NVDA to TSLA.", show_full_reasoning=True
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-genai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/gemini_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/gemini_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
