# Audio Input (Local file)

> Original Document: [Audio Input (Local file)](https://docs.agno.com/examples/models/gemini/audio_input_local_file_upload.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.713Z

---

# Audio Input (Local file)

## Code

```python cookbook/models/google/gemini/audio_input_local_file_upload.py theme={null}
from pathlib import Path
from agno.agent import Agent
from agno.media import Audio
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
)

# Please download a sample audio file to test this Agent and upload using:
audio_path = Path(__file__).parent.joinpath("sample.mp3")

agent.print_response(
    "Tell me about this audio",
    audio=[Audio(filepath=audio_path)],
    stream=True,
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
      python cookbook/models/google/gemini/audio_input_local_file_upload.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/audio_input_local_file_upload.py
      ```
    </CodeGroup>
  </Step>
</Steps>
