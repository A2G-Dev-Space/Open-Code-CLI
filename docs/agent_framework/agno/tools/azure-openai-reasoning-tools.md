# Azure OpenAI with Reasoning Tools

> Original Document: [Azure OpenAI with Reasoning Tools](https://docs.agno.com/examples/concepts/reasoning/tools/azure-openai-reasoning-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.951Z

---

# Azure OpenAI with Reasoning Tools

This example shows how to use `ReasoningTools` with an Azure OpenAI model.

## Code

```python cookbook/reasoning/tools/azure_openai_reasoning_tools.py theme={null}
from agno.agent import Agent
from agno.models.azure.openai_chat import AzureOpenAI
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

reasoning_agent = Agent(
    model=AzureOpenAI(id="gpt-5-mini"),
    tools=[
        DuckDuckGoTools(),
        ReasoningTools(
            think=True,
            analyze=True,
            add_instructions=True,
            add_few_shot=True,
        ),
    ],
    instructions="Use tables where possible. Think about the problem step by step.",
    markdown=True,
)

reasoning_agent.print_response(
    "Write a report comparing NVDA to TSLA.",
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
    export ANTHROPIC_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai anthropic agno ddgs
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/azure_openai_reasoning_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/azure_openai_reasoning_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
