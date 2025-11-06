# Session State In Instructions

> Original Document: [Session State In Instructions](https://docs.agno.com/examples/concepts/agent/state/session_state_in_instructions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.527Z

---

# Session State In Instructions

This example demonstrates how to use session state variables directly in agent instructions. It shows how to initialize session state and reference those variables in the instruction templates.

## Code

```python session_state_in_instructions.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    # Initialize the session state with a variable
    session_state={"user_name": "John"},
    # You can use variables from the session state in the instructions
    instructions="Users name is {user_name}",
    markdown=True,
)

agent.print_response("What is my name?", stream=True)
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
    touch session_state_in_instructions.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python session_state_in_instructions.py
      ```

      ```bash Windows   theme={null}
      python session_state_in_instructions.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/state" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
