# Gathering Multiple Async Agents

> Original Document: [Gathering Multiple Async Agents](https://docs.agno.com/examples/concepts/agent/async/gather_agents.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.306Z

---

# Gathering Multiple Async Agents

This example demonstrates how to run multiple async agents concurrently using asyncio.gather() to generate research reports on different AI providers simultaneously.

## Code

```python gather_agents.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from rich.pretty import pprint

providers = ["openai", "anthropic", "ollama", "cohere", "google"]
instructions = [
    "Your task is to write a well researched report on AI providers.",
    "The report should be unbiased and factual.",
]


async def get_reports():
    tasks = []
    for provider in providers:
        agent = Agent(
            model=OpenAIChat(id="gpt-4"),
            instructions=instructions,
            tools=[DuckDuckGoTools()],
        )
        tasks.append(
            agent.arun(f"Write a report on the following AI provider: {provider}")
        )

    results = await asyncio.gather(*tasks)
    return results


async def main():
    results = await get_reports()
    for result in results:
        print("************")
        pprint(result.content)
        print("************")
        print("\n")


if __name__ == "__main__":
    asyncio.run(main())
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
    touch gather_agents.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python gather_agents.py
      ```

      ```bash Windows theme={null}
      python gather_agents.py
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
