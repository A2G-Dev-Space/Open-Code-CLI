# Basic Async Agent Usage

> Original Document: [Basic Async Agent Usage](https://docs.agno.com/examples/concepts/agent/async/basic.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.290Z

---

# Basic Async Agent Usage

This example demonstrates basic asynchronous agent usage with different response handling methods including direct response, print response, and pretty print response.

## Code

```python basic.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.utils.pprint import apprint_run_response

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
)


async def basic():
    response = await agent.arun(input="Tell me a joke.")
    print(response.content)


async def basic_print():
    await agent.aprint_response(input="Tell me a joke.")


async def basic_pprint():
    response = await agent.arun(input="Tell me a joke.")
    await apprint_run_response(response)


if __name__ == "__main__":
    asyncio.run(basic())
    # OR
    asyncio.run(basic_print())
    # OR
    asyncio.run(basic_pprint())
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
    touch basic.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python basic.py
      ```

      ```bash Windows theme={null}
      python basic.py
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
