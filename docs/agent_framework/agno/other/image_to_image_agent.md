# Image to Image Generation Agent

> Original Document: [Image to Image Generation Agent](https://docs.agno.com/examples/concepts/agent/multimodal/image_to_image_agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.451Z

---

# Image to Image Generation Agent

This example demonstrates how to create an AI agent that generates images from existing images using the Fal AI API.

## Code

```python image_to_image_agent.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.fal import FalTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    id="image-to-image",
    name="Image to Image Agent",
    tools=[FalTools()],
    markdown=True,
    instructions=[
        "You have to use the `image_to_image` tool to generate the image.",
        "You are an AI agent that can generate images using the Fal AI API.",
        "You will be given a prompt and an image URL.",
        "You have to return the image URL as provided, don't convert it to markdown or anything else.",
    ],
)

agent.print_response(
    "a cat dressed as a wizard with a background of a mystic forest. Make it look like 'https://fal.media/files/koala/Chls9L2ZnvuipUTEwlnJC.png'",
    stream=True,
)
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
    touch image_to_image_agent.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python image_to_image_agent.py
      ```

      ```bash Windows   theme={null}
      python image_to_image_agent.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/multimodal" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
