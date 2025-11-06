# Asynchronous Agent with Image Input

> Original Document: [Asynchronous Agent with Image Input](https://docs.agno.com/examples/models/meta/image_input_bytes.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.306Z

---

# Asynchronous Agent with Image Input

## Code

```python cookbook/models/meta/llama/image_input_bytes.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.meta import LlamaOpenAI
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.utils.media import download_image

agent = Agent(
    model=LlamaOpenAI(id="Llama-4-Maverick-17B-128E-Instruct-FP8"),
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

  <Step title="Set your LLAMA API key">
    ```bash  theme={null}
    export LLAMA_API_KEY=YOUR_API_KEY
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install llama-api-client agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/meta/async_image_input.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/async_image_input.py
      ```
    </CodeGroup>
  </Step>
</Steps>
