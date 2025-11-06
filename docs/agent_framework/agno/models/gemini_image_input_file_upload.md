# Image Agent with File Upload

> Original Document: [Image Agent with File Upload](https://docs.agno.com/examples/models/gemini/image_input_file_upload.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.746Z

---

# Image Agent with File Upload

## Code

```python cookbook/models/google/gemini/image_input_file_upload.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.google import Gemini
from agno.tools.duckduckgo import DuckDuckGoTools
from google.generativeai import upload_file
from google.generativeai.types import file_types

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
# Please download the image using
# wget https://upload.wikimedia.org/wikipedia/commons/b/bf/Krakow_-_Kosciol_Mariacki.jpg
image_path = Path(__file__).parent.joinpath("Krakow_-_Kosciol_Mariacki.jpg")
image_file: file_types.File = upload_file(image_path)
print(f"Uploaded image: {image_file}")

agent.print_response(
    "Tell me about this image and give me the latest news about it.",
    images=[Image(content=image_file)],
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Download the image">
    ```bash  theme={null}
    wget https://upload.wikimedia.org/wikipedia/commons/b/bf/Krakow_-_Kosciol_Mariacki.jpg
    ```
  </Step>

  <Step title="Set your API key">
    ```bash  theme={null}
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-genai ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/google/gemini/image_input_file_upload.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/image_input_file_upload.py
      ```
    </CodeGroup>
  </Step>
</Steps>
