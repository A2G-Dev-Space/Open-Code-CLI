# Image Input Bytes Content

> Original Document: [Image Input Bytes Content](https://docs.agno.com/examples/models/vertexai/claude/image_input_bytes.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.999Z

---

# Image Input Bytes Content

## Code

```python cookbook/models/vertexai/claude/image_input_bytes.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.vertexai.claude import Claude
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.utils.media import download_image

agent = Agent(
    model=Claude(id="claude-sonnet-4@20250514"),
    tools=[DuckDuckGoTools()],
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

  <Step title="Set your environment variables">
    <CodeGroup>
      ```bash Mac theme={null}
      export CLOUD_ML_REGION=xxx
      export GOOGLE_CLOUD_PROJECT=xxx
      ```

      ```bash Windows theme={null}
        setx CLOUD_ML_REGION xxx
        setx GOOGLE_CLOUD_PROJECT xxx
      ```
    </CodeGroup>
  </Step>

  <Step title="Authenticate your CLI session">
    `gcloud auth application-default login `

    <Note>You dont need to authenticate your CLI every time. </Note>
  </Step>

  <Step title="Install libraries">`pip install -U anthropic agno `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vertexai/claude/image_input_bytes.py 
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/image_input_bytes.py
      ```
    </CodeGroup>
  </Step>
</Steps>
