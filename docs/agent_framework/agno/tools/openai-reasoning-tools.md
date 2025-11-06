# OpenAI with Reasoning Tools

> Original Document: [OpenAI with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/openai-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.951Z

---

# OpenAI with Reasoning Tools

This example shows how to use `ReasoningTools` with an OpenAI model.

## Code

```python cookbook/reasoning/tools/openai_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[
        ReasoningTools(
            think=True,
            analyze=True,
            add_instructions=True,
            add_few_shot=True,
        ),
        DuckDuckGoTools(),
    ],
    instructions="Use tables where possible",
    markdown=True,
)
reasoning_agent.print_response(
    "Write a report comparing NVDA to TSLA",
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
    export OPENAI_API_KEY=xxx
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
      python cookbook/reasoning/tools/openai_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/openai_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
