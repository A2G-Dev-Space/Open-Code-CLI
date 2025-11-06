# Image Generation Agent

> Original Document: [Image Generation Agent](https://docs.agno.com/examples/models/gemini/image_generation.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.738Z

---

# Image Generation Agent

## Code

```python image_generation.py theme={null}
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
run_response = agent.run("Make me an image of a cat in a tree.")

if run_response and isinstance(run_response, RunOutput) and run_response.images:
    for image_response in run_response.images:
        image_bytes = image_response.content
        if image_bytes:
            image = Image.open(BytesIO(image_bytes))
            image.show()
            # Save the image to a file
            # image.save("generated_image.png")
else:
    print("No images found in run response")
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
      python image_generation.py
      ```

      ```bash Windows theme={null}
      python image_generation.py
      ```
    </CodeGroup>
  </Step>
</Steps>
