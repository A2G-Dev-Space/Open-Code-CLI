# Agent Input as Messages List

> Original Document: [Agent Input as Messages List](https://docs.agno.com/examples/concepts/agent/input_and_output/input_as_messages_list.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.390Z

---

# Agent Input as Messages List

This example demonstrates how to pass input to an agent as a list of Message objects, allowing for multi-turn conversations and context setup.

## Code

```python input_as_messages_list.py theme={null}
from agno.agent import Agent, Message
from agno.models.openai import OpenAIChat

Agent(model=OpenAIChat(id="gpt-5-mini")).print_response(
    input=[
        Message(
            role="user",
            content="I'm preparing a presentation for my company about renewable energy adoption.",
        ),
        Message(
            role="assistant",
            content="I'd be happy to help with your renewable energy presentation. What specific aspects would you like me to focus on?",
        ),
        Message(
            role="user",
            content="Could you research the latest solar panel efficiency improvements in 2024?",
        ),
        Message(
            role="user",
            content="Also, please summarize the key findings in bullet points for my slides.",
        ),
    ],
    stream=True,
    markdown=True,
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
    touch input_as_messages_list.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python input_as_messages_list.py
      ```

      ```bash Windows   theme={null}
      python input_as_messages_list.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/input_and_output" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
