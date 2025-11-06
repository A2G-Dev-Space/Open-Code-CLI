# Agent Input as Message Object

> Original Document: [Agent Input as Message Object](https://docs.agno.com/examples/concepts/agent/input_and_output/input_as_message.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.396Z

---

# Agent Input as Message Object

This example demonstrates how to provide input to an agent using the Message object format for structured multimodal content.

## Code

```python input_as_message.py theme={null}
from agno.agent import Agent, Message
from agno.models.openai import OpenAIChat

Agent(model=OpenAIChat(id="gpt-5-mini")).print_response(
    Message(
        role="user",
        content=[
            {"type": "text", "text": "What's in this image?"},
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                },
            },
        ],
    ),
    stream=True,
    markdown=True,
    show_message=False
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
    touch input_as_message.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python input_as_message.py
      ```

      ```bash Windows theme={null}
      python input_as_message.py
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
