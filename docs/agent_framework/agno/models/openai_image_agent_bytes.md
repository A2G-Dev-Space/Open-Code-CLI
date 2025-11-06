# Image Agent Bytes

> Original Document: [Image Agent Bytes](https://docs.agno.com/examples/models/openai/responses/image_agent_bytes.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.424Z

---

# Image Agent Bytes

## Code

```python cookbook/models/openai/responses/image_agent_bytes.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.openai import OpenAIResponses
from agno.tools.googlesearch import GoogleSearchTools
from agno.utils.media import download_image

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
    tools=[GoogleSearchTools()],
    markdown=True,
)

image_path = Path(__file__).parent.joinpath("sample.jpg")

download_image(
    url="https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg",
    output_path=str(image_path),
)

# Read the image file content as bytes
image_bytes = image_path.read_bytes()

agent.print_response(
    "Tell me about this image and give me the latest news about it.",
    images=[
        Image(content=image_bytes),
    ],
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
      python cookbook/models/openai/responses/image_agent_bytes.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/image_agent_bytes.py
      ```
    </CodeGroup>
  </Step>
</Steps>
