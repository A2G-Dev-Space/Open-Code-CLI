# Audio to Text Transcription

> Original Document: [Audio to Text Transcription](https://docs.agno.com/examples/concepts/agent/multimodal/audio_to_text.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.421Z

---

# Audio to Text Transcription

This example demonstrates how to create an agent that can transcribe audio conversations, identifying different speakers and providing accurate transcriptions.

## Code

```python audio_to_text.py theme={null}
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

# Give a transcript of this audio conversation. Use speaker A, speaker B to identify speakers.

agent.print_response(
    "Give a transcript of this audio conversation. Use speaker A, speaker B to identify speakers.",
    audio=[Audio(content=audio_content)],
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno google-generativeai requests
    ```
  </Step>

  <Step title="Export your GOOGLE API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export GOOGLE_API_KEY="your_google_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:GOOGLE_API_KEY="your_google_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch audio_to_text.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python audio_to_text.py
      ```

      ```bash Windows theme={null}
      python audio_to_text.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/multimodal" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
