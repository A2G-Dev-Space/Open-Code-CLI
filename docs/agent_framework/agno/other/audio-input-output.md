# Audio Input Output

> Original Document: [Audio Input Output](https://docs.agno.com/examples/concepts/multimodal/audio-input-output.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.856Z

---

# Audio Input Output

## Code

```python  theme={null}
import requests
from agno.agent import Agent
from agno.media import Audio
from agno.models.openai import OpenAIChat
from agno.utils.audio import write_audio_to_file

# Fetch the audio file and convert it to a base64 encoded string
url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content

agent = Agent(
    model=OpenAIChat(
        id="gpt-5-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
    ),
    markdown=True,
)

run_result = agent.run(
    "What's in these recording?",
    audio=[Audio(content=wav_data, format="wav")],
)

if run_result.response_audio is not None:
    write_audio_to_file(
        audio=run_result.response_audio.content, filename="tmp/result.wav"
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
      python cookbook/agent_concepts/multimodal/audio_input_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/audio_input_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
