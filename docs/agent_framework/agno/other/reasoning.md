# Async Agent with Reasoning Capabilities

> Original Document: [Async Agent with Reasoning Capabilities](https://docs.agno.com/examples/concepts/agent/async/reasoning.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.299Z

---

# Async Agent with Reasoning Capabilities

This example demonstrates the difference between a regular agent and a reasoning agent when solving mathematical problems, showcasing how reasoning mode provides more detailed thought processes.

## Code

```python reasoning.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIChat

task = "9.11 and 9.9 -- which is bigger?"

regular_agent = Agent(model=OpenAIChat(id="gpt-5-mini"), markdown=True)
reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    reasoning=True,
    markdown=True,
)

asyncio.run(regular_agent.aprint_response(task, stream=True))
asyncio.run(
    reasoning_agent.aprint_response(task, stream=True, show_full_reasoning=True)
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
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
    touch reasoning.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python reasoning.py
      ```

      ```bash Windows theme={null}
      python reasoning.py
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
