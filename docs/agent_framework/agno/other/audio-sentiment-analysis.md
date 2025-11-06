# Audio Sentiment Analysis Agent

> Original Document: [Audio Sentiment Analysis Agent](https://docs.agno.com/examples/concepts/multimodal/audio-sentiment-analysis.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.867Z

---

# Audio Sentiment Analysis Agent

## Code

```python  theme={null}
import requests
from agno.agent import Agent
from agno.media import Audio
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
)

url = "https://agno-public.s3.amazonaws.com/demo_data/sample_conversation.wav"

response = requests.get(url)
audio_content = response.content


agent.print_response(
    "Give a sentiment analysis of this audio conversation. Use speaker A, speaker B to identify speakers.",
    audio=[Audio(content=audio_content)],
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
    pip install google-genai
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agent_concepts/multimodal/audio_sentiment_analysis.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/audio_sentiment_analysis.py
      ```
    </CodeGroup>
  </Step>
</Steps>
