# Location-Aware Agent Instructions

> Original Document: [Location-Aware Agent Instructions](https://docs.agno.com/examples/concepts/agent/context_management/location_instructions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.314Z

---

# Location-Aware Agent Instructions

This example demonstrates how to add location context to agent instructions, enabling the agent to provide location-specific responses and search for local news.

## Code

```python location_instructions.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    add_location_to_context=True,
    tools=[DuckDuckGoTools(cache_results=True)],
)
agent.print_response("What city am I in?")
agent.print_response("What is current news about my city?")
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
    touch location_instructions.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python location_instructions.py
      ```

      ```bash Windows theme={null}
      python location_instructions.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/context_management" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
