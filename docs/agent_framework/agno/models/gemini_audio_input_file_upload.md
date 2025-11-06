# Audio Input (Upload the file)

> Original Document: [Audio Input (Upload the file)](https://docs.agno.com/examples/models/gemini/audio_input_file_upload.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.713Z

---

# Audio Input (Upload the file)

## Code

```python cookbook/models/google/gemini/audio_input_file_upload.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Audio
from agno.models.google import Gemini

model = Gemini(id="gemini-2.0-flash-exp")
agent = Agent(
    model=model,
    markdown=True,
)

# Please download a sample audio file to test this Agent and upload using:
audio_path = Path(__file__).parent.joinpath("sample.mp3")
audio_file = None

remote_file_name = f"files/{audio_path.stem.lower()}"
try:
    audio_file = model.get_client().files.get(name=remote_file_name)
except Exception as e:
    print(f"Error getting file {audio_path.stem}: {e}")
    pass

if not audio_file:
    try:
        audio_file = model.get_client().files.upload(
            file=audio_path,
            config=dict(name=audio_path.stem, display_name=audio_path.stem),
        )
        print(f"Uploaded audio: {audio_file}")
    except Exception as e:
        print(f"Error uploading audio: {e}")

agent.print_response(
    "Tell me about this audio",
    audio=[Audio(content=audio_file)],
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
      python cookbook/models/google/gemini/audio_input_file_upload.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/audio_input_file_upload.py
      ```
    </CodeGroup>
  </Step>
</Steps>
