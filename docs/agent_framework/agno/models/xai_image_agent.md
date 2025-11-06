# Image Agent

> Original Document: [Image Agent](https://docs.agno.com/examples/models/xai/image_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.849Z

---

# Image Agent

## Code

```python cookbook/models/xai/image_agent.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.xai import xAI
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=xAI(id="grok-2-vision-latest"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

agent.print_response(
    "Tell me about this image and give me the latest news about it.",
    images=[
        Image(
            url="https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg"
        )
    ],
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export XAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U xai ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/image_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/image_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
