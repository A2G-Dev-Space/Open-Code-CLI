# Audio to text Agent

> Original Document: [Audio to text Agent](https://docs.agno.com/examples/concepts/multimodal/audio-to-text.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.905Z

---

# Audio to text Agent

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

url = "https://agno-public.s3.us-east-1.amazonaws.com/demo_data/QA-01.mp3"

response = requests.get(url)
audio_content = response.content


agent.print_response(
    "Give a transcript of this audio conversation. Use speaker A, speaker B to identify speakers.",
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
      python cookbook/agent_concepts/multimodal/audio_to_text.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/audio_to_text.py
      ```
    </CodeGroup>
  </Step>
</Steps>
