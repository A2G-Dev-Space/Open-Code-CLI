# Video as input

> Original Document: [Video as input](https://docs.agno.com/concepts/multimodal/video/video_input.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.818Z

---

# Video as input

> Learn how to use video as input with Agno agents.

Agno supports videos as input to agents and teams.  Take a look at the [compatibility matrix](/concepts/models/compatibility#multimodal-support) to see which models support videos as input.

Let's create an agent that can understand video input.

```python video_agent.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Video
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-001"),
    markdown=True,
)

# Please download "GreatRedSpot.mp4" using
# wget https://storage.googleapis.com/generativeai-downloads/images/GreatRedSpot.mp4
video_path = Path(__file__).parent.joinpath("GreatRedSpot.mp4")

agent.print_response("Tell me about this video", videos=[Video(filepath=video_path)])
```

## Developer Resources

View more [Examples](/examples/concepts/multimodal/video-caption)
