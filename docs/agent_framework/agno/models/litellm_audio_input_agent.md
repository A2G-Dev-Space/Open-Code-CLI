# Audio Input Agent

> Original Document: [Audio Input Agent](https://docs.agno.com/examples/models/litellm/audio_input_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.922Z

---

# Audio Input Agent

## Code

```python cookbook/models/litellm/audio_input_agent.py theme={null}
import requests
from agno.agent import Agent
from agno.media import Audio
from agno.models.litellm import LiteLLM

# Fetch the QA audio file and convert it to a base64 encoded string
url = "https://agno-public.s3.us-east-1.amazonaws.com/demo_data/QA-01.mp3"
response = requests.get(url)
response.raise_for_status()
mp3_data = response.content

# Audio input requires specific audio-enabled models like gpt-5-mini-audio-preview
agent = Agent(
    model=LiteLLM(id="gpt-5-mini-audio-preview"),
    markdown=True,
)
agent.print_response(
    "What's the audio about?",
    audio=[Audio(content=mp3_data, format="mp3")],
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export LITELLM_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U litellm agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/audio_input_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm/audio_input_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
