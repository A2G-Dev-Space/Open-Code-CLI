# Dynamic Instructions via Function

> Original Document: [Dynamic Instructions via Function](https://docs.agno.com/examples/concepts/agent/context_management/instructions_via_function.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.312Z

---

# Dynamic Instructions via Function

This example demonstrates how to provide instructions to an agent via a function that can access the agent's properties, enabling dynamic and personalized instruction generation.

## Code

```python instructions_via_function.py theme={null}
from typing import List

from agno.agent import Agent


def get_instructions(agent: Agent) -> List[str]:
    return [
        f"Your name is {agent.name}!",
        "Talk in haiku's!",
        "Use poetry to answer questions.",
    ]


agent = Agent(
    name="AgentX",
    instructions=get_instructions,
    markdown=True,
)
agent.print_response("Who are you?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
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
    touch instructions_via_function.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python instructions_via_function.py
      ```

      ```bash Windows theme={null}
      python instructions_via_function.py
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
