# Image Compare Agent

> Original Document: [Image Compare Agent](https://docs.agno.com/examples/models/mistral/image_compare_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.087Z

---

# Image Compare Agent

## Code

```python cookbook/models/mistral/image_compare_agent.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.mistral.mistral import MistralChat

agent = Agent(
    model=MistralChat(id="pixtral-12b-2409"),
    markdown=True,
)

agent.print_response(
    "what are the differences between two images?",
    images=[
        Image(
            url="https://tripfixers.com/wp-content/uploads/2019/11/eiffel-tower-with-snow.jpeg"
        ),
        Image(
            url="https://assets.visitorscoverage.com/production/wp-content/uploads/2024/04/AdobeStock_626542468-min-1024x683.jpeg"
        ),
    ],
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/image_compare_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/image_compare_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
