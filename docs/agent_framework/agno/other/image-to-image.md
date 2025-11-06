# Image to Image Agent

> Original Document: [Image to Image Agent](https://docs.agno.com/examples/concepts/multimodal/image-to-image.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.891Z

---

# Image to Image Agent

## Code

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.fal import FalTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    id="image-to-image",
    name="Image to Image Agent",
    tools=[FalTools()],
    markdown=True,
    debug_mode=True,
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

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    export FAL_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai fal agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agent_concepts/multimodal/image_to_image_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/image_to_image_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
