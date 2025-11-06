# Generate Video Using ModelsLab

> Original Document: [Generate Video Using ModelsLab](https://docs.agno.com/examples/concepts/agent/multimodal/generate_video_using_models_lab.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.434Z

---

# Generate Video Using ModelsLab

This example demonstrates how to create an AI agent that generates videos using the ModelsLab API.

## Code

```python generate_video_using_models_lab.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.models_labs import ModelsLabTools

video_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[ModelsLabTools()],
    description="You are an AI agent that can generate videos using the ModelsLabs API.",
    instructions=[
        "When the user asks you to create a video, use the `generate_media` tool to create the video.",
        "The video will be displayed in the UI automatically below your response, so you don't need to show the video URL in your response.",
        "Politely and courteously let the user know that the video has been generated and will be displayed below as soon as its ready.",
    ],
    markdown=True,
)

video_agent.print_response("Generate a video of a cat playing with a ball")
# print(video_agent.run_response.videos)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
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
    touch generate_video_using_models_lab.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python generate_video_using_models_lab.py
      ```

      ```bash Windows   theme={null}
      python generate_video_using_models_lab.py
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
