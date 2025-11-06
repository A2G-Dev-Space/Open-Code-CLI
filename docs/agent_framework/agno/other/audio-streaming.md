# Audio Streaming Agent

> Original Document: [Audio Streaming Agent](https://docs.agno.com/examples/concepts/multimodal/audio-streaming.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.868Z

---

# Audio Streaming Agent

## Code

```python  theme={null}
import base64
import wave
from typing import Iterator

from agno.agent import Agent, RunOutputEvent
from agno.models.openai import OpenAIChat

# Audio Configuration
SAMPLE_RATE = 24000  # Hz (24kHz)
CHANNELS = 1  # Mono (Change to 2 if Stereo)
SAMPLE_WIDTH = 2  # Bytes (16 bits)

# Provide the agent with the audio file and audio configuration and get result as text + audio
agent = Agent(
    model=OpenAIChat(
        id="gpt-4o-audio-preview",
        modalities=["text", "audio"],
        audio={
            "voice": "alloy",
            "format": "pcm16",
        },  # Only pcm16 is supported with streaming
    ),
)
output_stream: Iterator[RunOutputEvent] = agent.run(
    "Tell me a 10 second story", stream=True
)

filename = "tmp/response_stream.wav"

# Open the file once in append-binary mode
with wave.open(str(filename), "wb") as wav_file:
    wav_file.setnchannels(CHANNELS)
    wav_file.setsampwidth(SAMPLE_WIDTH)
    wav_file.setframerate(SAMPLE_RATE)

    # Iterate over generated audio
    for response in output_stream:
        response_audio = response.response_audio  # type: ignore
        if response_audio:
            if response_audio.transcript:
                print(response_audio.transcript, end="", flush=True)
            if response_audio.content:
                try:
                    pcm_bytes = base64.b64decode(response_audio.content)
                    wav_file.writeframes(pcm_bytes)
                except Exception as e:
                    print(f"Error decoding audio: {e}")
print()
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
      python cookbook/agent_concepts/multimodal/audio_streaming.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/audio_streaming.py
      ```
    </CodeGroup>
  </Step>
</Steps>
