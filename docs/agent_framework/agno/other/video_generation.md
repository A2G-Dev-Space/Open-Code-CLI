# Video Generation Tools

> Original Document: [Video Generation Tools](https://docs.agno.com/concepts/multimodal/video/video_generation.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.808Z

---

# Video Generation Tools

> Learn how to use video generation tools with Agno agents.

The following example demonstrates how to generate a video using `FalTools` with an agent. See [FAL](https://fal.ai/video) for more details.

```python video_agent.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.fal import FalTools

fal_agent = Agent(
    name="Fal Video Generator Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[
        FalTools(
            model="fal-ai/hunyuan-video",
            enable_generate_media=True,
        )
    ],
    description="You are an AI agent that can generate videos using the Fal API.",
    instructions=[
        "When the user asks you to create a video, use the `generate_media` tool to create the video.",
        "Return the URL as raw to the user.",
        "Don't convert video URL to markdown or anything else.",
    ],
    markdown=True,
)

fal_agent.print_response("Generate video of balloon in the ocean")

```

## Developer Resources

* View a [Replicate](/examples/concepts/multimodal/generate-video-replicate) example.
* View a [Fal](/examples/concepts/tools/others/fal) example.
* View a [ModelsLabs](/examples/concepts/multimodal/generate-video-models-lab) example.
