# Audio Input Agent

> Original Document: [Audio Input Agent](https://docs.agno.com/examples/models/openai/chat/audio_input_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.328Z

---

# Audio Input Agent

## Code

```python cookbook/models/openai/chat/audio_input_agent.py theme={null}
import requests
from agno.agent import Agent, RunOutput  # noqa
from agno.media import Audio
from agno.models.openai import OpenAIChat

# Fetch the audio file and convert it to a base64 encoded string
url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content

# Provide the agent with the audio file and get result as text
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini-audio-preview", modalities=["text"]),
    markdown=True,
)
agent.print_response(
    "What is in this audio?", audio=[Audio(content=wav_data, format="wav")]
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
    pip install -U openai requests agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/chat/audio_input_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/chat/audio_input_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
