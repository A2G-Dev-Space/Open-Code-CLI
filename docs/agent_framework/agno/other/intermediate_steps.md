# Agent Intermediate Steps Streaming

> Original Document: [Agent Intermediate Steps Streaming](https://docs.agno.com/examples/concepts/agent/other/intermediate_steps.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.466Z

---

# Agent Intermediate Steps Streaming

This example demonstrates how to stream intermediate steps during agent execution, providing visibility into tool calls and execution events.

## Code

```python intermediate_steps.py theme={null}
from typing import Iterator

from agno.agent import Agent, RunOutputEvent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from rich.pretty import pprint

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools(stock_price=True)],
    markdown=True,
)

run_stream: Iterator[RunOutputEvent] = agent.run(
    "What is the stock price of NVDA", stream=True, stream_events=True
)
for chunk in run_stream:
    pprint(chunk.to_dict())
    print("---" * 20)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai ddgs rich
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch intermediate_steps.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python intermediate_steps.py
      ```

      ```bash Windows theme={null}
      python intermediate_steps.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/other" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
