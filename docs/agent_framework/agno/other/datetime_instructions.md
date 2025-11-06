# Context Management with DateTime Instructions

> Original Document: [Context Management with DateTime Instructions](https://docs.agno.com/examples/concepts/agent/context_management/datetime_instructions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.333Z

---

# Context Management with DateTime Instructions

This example demonstrates how to add current date and time context to agent instructions, enabling the agent to provide time-aware responses.

## Code

```python datetime_instructions.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    add_datetime_to_context=True,
    timezone_identifier="Etc/UTC",
)
agent.print_response(
    "What is the current date and time? What is the current time in NYC?"
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
    touch datetime_instructions.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python datetime_instructions.py
      ```

      ```bash Windows theme={null}
      python datetime_instructions.py
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
