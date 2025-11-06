# Image to Text Agent

> Original Document: [Image to Text Agent](https://docs.agno.com/examples/concepts/multimodal/image-to-text.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.896Z

---

# Image to Text Agent

## Code

```python  theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    id="image-to-text",
    name="Image to Text Agent",
    markdown=True,
    debug_mode=True,
        instructions=[
        "You are an AI agent that can generate text descriptions based on an image.",
        "You have to return a text response describing the image.",
    ],
)
image_path = Path(__file__).parent.joinpath("sample.jpg")
agent.print_response(
    "Write a 3 sentence fiction story about the image",
    images=[Image(filepath=image_path)],
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agent_concepts/multimodal/image_to_text_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/image_to_text_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
