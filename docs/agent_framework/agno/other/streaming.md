# Async Agent Streaming Responses

> Original Document: [Async Agent Streaming Responses](https://docs.agno.com/examples/concepts/agent/async/streaming.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.300Z

---

# Async Agent Streaming Responses

This example demonstrates different methods of handling streaming responses from async agents, including manual iteration, print response, and pretty print response.

## Code

```python streaming.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.utils.pprint import apprint_run_response

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
)


async def streaming():
    async for response in agent.arun(input="Tell me a joke.", stream=True):
        print(response.content, end="", flush=True)


async def streaming_print():
    await agent.aprint_response(input="Tell me a joke.", stream=True)


async def streaming_pprint():
    await apprint_run_response(agent.arun(input="Tell me a joke.", stream=True))


if __name__ == "__main__":
    asyncio.run(streaming())
    # OR
    asyncio.run(streaming_print())
    # OR
    asyncio.run(streaming_pprint())
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
    touch streaming.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python streaming.py
      ```

      ```bash Windows theme={null}
      python streaming.py
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
