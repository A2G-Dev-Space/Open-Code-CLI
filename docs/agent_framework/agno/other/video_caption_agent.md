# Video Caption Generator Agent

> Original Document: [Video Caption Generator Agent](https://docs.agno.com/examples/concepts/agent/multimodal/video_caption_agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.458Z

---

# Video Caption Generator Agent

This example demonstrates how to create an agent that can process videos to generate and embed captions using MoviePy and OpenAI tools.

## Code

```python video_caption_agent.py theme={null}
"""Please install dependencies using:
pip install openai moviepy ffmpeg
"""

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

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai moviepy ffmpeg
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch video_caption_agent.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python video_caption_agent.py
      ```

      ```bash Windows theme={null}
      python video_caption_agent.py
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
