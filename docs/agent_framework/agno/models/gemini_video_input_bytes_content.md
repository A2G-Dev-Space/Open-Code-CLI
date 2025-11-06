# Video Input (Bytes Content)

> Original Document: [Video Input (Bytes Content)](https://docs.agno.com/examples/models/gemini/video_input_bytes_content.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.796Z

---

# Video Input (Bytes Content)

## Code

```python cookbook/models/google/gemini/video_input_bytes_content.py theme={null}
import requests
from agno.agent import Agent
from agno.media import Video
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
)

url = "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4"

# Download the video file from the URL as bytes
response = requests.get(url)
video_content = response.content

agent.print_response(
    "Tell me about this video",
    videos=[Video(content=video_content)],
)
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
    pip install -U google-genai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/google/gemini/video_input_bytes_content.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/video_input_bytes_content.py
      ```
    </CodeGroup>
  </Step>
</Steps>
