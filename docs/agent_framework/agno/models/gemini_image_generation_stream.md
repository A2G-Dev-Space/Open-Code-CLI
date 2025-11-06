# Image Generation Agent (Streaming)

> Original Document: [Image Generation Agent (Streaming)](https://docs.agno.com/examples/models/gemini/image_generation_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.754Z

---

# Image Generation Agent (Streaming)

## Code

```python cookbook/models/google/gemini/image_generation_stream.py theme={null}
from io import BytesIO

from agno.agent import Agent, RunOutput  # noqa
from agno.models.google import Gemini
from PIL import Image

# No system message should be provided
agent = Agent(
    model=Gemini(
        id="gemini-2.0-flash-exp-image-generation",
        response_modalities=["Text", "Image"],
    )
)

# Print the response in the terminal
response = agent.run("Make me an image of a cat in a tree.", stream=True)

for chunk in response:
    if hasattr(chunk, "images") and chunk.images:  # type: ignore
        images = chunk.images  # type: ignore
        if images and isinstance(images, list):
            for image_response in images:
                image_bytes = image_response.content
                if image_bytes:
                    image = Image.open(BytesIO(image_bytes))
                    image.show()
                    # Save the image to a file
                    # image.save("generated_image.png")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-genai pillow agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/google/gemini/image_generation_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/image_generation_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
