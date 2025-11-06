# Basic Agent Instructions

> Original Document: [Basic Agent Instructions](https://docs.agno.com/examples/concepts/agent/context_management/instructions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.307Z

---

# Basic Agent Instructions

This example demonstrates how to provide basic instructions to an agent to guide its response behavior and storytelling style.

## Code

```python instructions.py theme={null}
from agno.agent import Agent

agent = Agent(instructions="Share a 2 sentence story about")
agent.print_response("Love in the year 12000.")
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
    touch instructions.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python instructions.py
      ```

      ```bash Windows theme={null}
      python instructions.py
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
