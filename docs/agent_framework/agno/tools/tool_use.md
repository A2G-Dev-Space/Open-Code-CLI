# Async Agent with Tool Usage

> Original Document: [Async Agent with Tool Usage](https://docs.agno.com/examples/concepts/agent/async/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.304Z

---

# Async Agent with Tool Usage

This example demonstrates how to use an async agent with DuckDuckGo search tools to gather current information about events happening in different countries.

## Code

```python tool_use.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
asyncio.run(agent.aprint_response("Whats happening in UK and in USA?"))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai ddgs
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
    touch tool_use.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python tool_use.py
      ```

      ```bash Windows theme={null}
      python tool_use.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/async" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
