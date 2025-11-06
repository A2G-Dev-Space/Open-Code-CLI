# Audio As Input

> Original Document: [Audio As Input](https://docs.agno.com/concepts/multimodal/audio/audio_input.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.804Z

---

# Audio As Input

> Learn how to use audio as input with Agno agents.

Agno supports audio as input to agents and teams.  Take a look at the [compatibility matrix](/concepts/models/compatibility#multimodal-support) to see which models support audio as input.

Let's create an agent that can understand audio input.

```python audio_agent.py theme={null}
import base64

import requests
from agno.agent import Agent, RunOutput  # noqa
from agno.media import Audio
from agno.models.openai import OpenAIChat

# Fetch the audio file and convert it to a base64 encoded string
url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini-audio-preview", modalities=["text"]),
    markdown=True,
)
agent.print_response(
    "What is in this audio?", audio=[Audio(content=wav_data, format="wav")]
)
```

## Developer Resources

* See [Speech-to-Text](/concepts/multimodal/audio/speech-to-text) documentation.
* See [Audio Input Output](/examples/concepts/multimodal/audio-input-output) example.
* See [Audio Sentiment Analysis](/examples/concepts/multimodal/audio-sentiment-analysis) example.
