# Add Dependencies to Agent Context

> Original Document: [Add Dependencies to Agent Context](https://docs.agno.com/examples/concepts/agent/dependencies/add_dependencies_to_context.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.340Z

---

# Add Dependencies to Agent Context

This example demonstrates how to create a context-aware agent that can access real-time HackerNews data through dependency injection, enabling the agent to provide current information.

## Code

```python add_dependencies_to_context.py theme={null}
import json

import httpx
from agno.agent import Agent
from agno.models.openai import OpenAIChat


def get_top_hackernews_stories(num_stories: int = 5) -> str:
    """Fetch and return the top stories from HackerNews.

    Args:
        num_stories: Number of top stories to retrieve (default: 5)
    Returns:
        JSON string containing story details (title, url, score, etc.)
    """
    # Get top stories
    stories = [
        {
            k: v
            for k, v in httpx.get(
                f"https://hacker-news.firebaseio.com/v0/item/{id}.json"
            )
            .json()
            .items()
            if k != "kids"  # Exclude discussion threads
        }
        for id in httpx.get(
            "https://hacker-news.firebaseio.com/v0/topstories.json"
        ).json()[:num_stories]
    ]
    return json.dumps(stories, indent=4)


# Create a Context-Aware Agent that can access real-time HackerNews data
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    # Each function in the dependencies is resolved when the agent is run,
    # think of it as dependency injection for Agents
    dependencies={"top_hackernews_stories": get_top_hackernews_stories},
    # We can add the entire dependencies dictionary to the user message
    add_dependencies_to_context=True,
    markdown=True,
)

# Example usage
agent.print_response(
    "Summarize the top stories on HackerNews and identify any interesting trends.",
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai httpx
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
    touch add_dependencies_to_context.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python add_dependencies_to_context.py
      ```

      ```bash Windows theme={null}
      python add_dependencies_to_context.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/dependencies" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
