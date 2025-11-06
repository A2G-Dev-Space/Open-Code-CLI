# Ollama with Reasoning Tools

> Original Document: [Ollama with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/ollama-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.960Z

---

# Ollama with Reasoning Tools

This example shows how to use `ReasoningTools` with an Ollama model.

## Code

```python cookbook/reasoning/tools/ollama_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.ollama.chat import Ollama
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

reasoning_agent = Agent(
    model=Ollama(id="llama3.2:latest"),
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

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ollama agno ddgs
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/ollama_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/ollama_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
