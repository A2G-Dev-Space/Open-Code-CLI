# Team Input as Image List

> Original Document: [Team Input as Image List](https://docs.agno.com/examples/concepts/teams/other/input_as_list.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.050Z

---

# Team Input as Image List

This example demonstrates how to pass input to a team as a list containing both text and images. The team processes multimodal input including text descriptions and image URLs for analysis.

## Code

```python cookbook/examples/teams/basic/input_as_list.py theme={null}
from agno.agent import Agent
from agno.team import Team

team = Team(
    members=[
        Agent(
            name="Sarah",
            role="Data Researcher",
            instructions="Focus on gathering and analyzing data",
        ),
        Agent(
            name="Mike",
            role="Technical Writer",
            instructions="Create clear, concise summaries",
        ),
    ],
)

team.print_response(
    [
        {"type": "text", "text": "What's in this image?"},
        {
            "type": "image_url",
            "image_url": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
        },
    ],
    stream=True,
    markdown=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install required libraries">
    ```bash  theme={null}
    pip install agno
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=****
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python cookbook/examples/teams/basic/input_as_list.py
    ```
  </Step>
</Steps>
