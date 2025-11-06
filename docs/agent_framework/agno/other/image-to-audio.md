# Image to Audio Agent

> Original Document: [Image to Audio Agent](https://docs.agno.com/examples/concepts/multimodal/image-to-audio.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.886Z

---

# Image to Audio Agent

## Code

```python  theme={null}
from pathlib import Path

from agno.agent import Agent, RunOutput
from agno.media import Image
from agno.models.openai import OpenAIChat
from agno.utils.audio import write_audio_to_file
from rich import print
from rich.text import Text

image_agent = Agent(model=OpenAIChat(id="gpt-5-mini"))

image_path = Path(__file__).parent.joinpath("sample.jpg")
image_story: RunOutput = image_agent.run(
    "Write a 3 sentence fiction story about the image",
    images=[Image(filepath=image_path)],
)
formatted_text = Text.from_markup(
    f":sparkles: [bold magenta]Story:[/bold magenta] {image_story.content} :sparkles:"
)
print(formatted_text)

audio_agent = Agent(
    model=OpenAIChat(
        id="gpt-5-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
    ),
)

audio_story: RunOutput = audio_agent.run(
    f"Narrate the story with flair: {image_story.content}"
)
if audio_story.response_audio is not None:
    write_audio_to_file(
        audio=audio_story.response_audio.content, filename="tmp/sample_story.wav"
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
    pip install -U openai rich agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agent_concepts/multimodal/image_to_audio.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/image_to_audio.py
      ```
    </CodeGroup>
  </Step>
</Steps>
