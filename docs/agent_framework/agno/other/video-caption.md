# Video Caption Agent

> Original Document: [Video Caption Agent](https://docs.agno.com/examples/concepts/multimodal/video-caption.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.888Z

---

# Video Caption Agent

## Code

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.moviepy_video import MoviePyVideoTools
from agno.tools.openai import OpenAITools

video_tools = MoviePyVideoTools(
    process_video=True, generate_captions=True, embed_captions=True
)

openai_tools = OpenAITools()

video_caption_agent = Agent(
    name="Video Caption Generator Agent",
    model=OpenAIChat(
        id="gpt-5-mini",
    ),
    tools=[video_tools, openai_tools],
    description="You are an AI agent that can generate and embed captions for videos.",
    instructions=[
        "When a user provides a video, process it to generate captions.",
        "Use the video processing tools in this sequence:",
        "1. Extract audio from the video using extract_audio",
        "2. Transcribe the audio using transcribe_audio",
        "3. Generate SRT captions using create_srt",
        "4. Embed captions into the video using embed_captions",
    ],
    markdown=True,
)

video_caption_agent.print_response(
    "Generate captions for {video with location} and embed them in the video"
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
    pip install -U openai moviepy ffmpeg agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/agent_concepts/multimodal/video_caption_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/video_caption_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
