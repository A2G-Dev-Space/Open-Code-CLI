# Video Input (Local File Upload)

> Original Document: [Video Input (Local File Upload)](https://docs.agno.com/examples/models/gemini/video_input_local_file_upload.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.799Z

---

# Video Input (Local File Upload)

## Code

```python cookbook/models/google/gemini/video_input_local_file_upload.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Video
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
)

# Get sample videos from https://www.pexels.com/search/videos/sample/
video_path = Path(__file__).parent.joinpath("sample_video.mp4")

agent.print_response("Tell me about this video?", videos=[Video(filepath=video_path)])
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
      python cookbook/models/google/gemini/video_input_local_file_upload.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/video_input_local_file_upload.py
      ```
    </CodeGroup>
  </Step>
</Steps>
