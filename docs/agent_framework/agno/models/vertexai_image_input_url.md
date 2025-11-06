# Image Input URL

> Original Document: [Image Input URL](https://docs.agno.com/examples/models/vertexai/claude/image_input_url.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.729Z

---

# Image Input URL

## Code

```python cookbook/models/vertexai/claude/image_input_url.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.vertexai.claude import Claude
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Claude(id="claude-sonnet-4@20250514"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

agent.print_response(
    "Tell me about this image and search the web for more information.",
    images=[
        Image(
            url="https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
        ),
    ],
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your environment variables">
    <CodeGroup>
      ```bash Mac theme={null}
      export CLOUD_ML_REGION=xxx
      export GOOGLE_CLOUD_PROJECT=xxx
      ```

      ```bash Windows theme={null}
        setx CLOUD_ML_REGION xxx
        setx GOOGLE_CLOUD_PROJECT xxx
      ```
    </CodeGroup>
  </Step>

  <Step title="Authenticate your CLI session">
    `gcloud auth application-default login `

    <Note>You dont need to authenticate your CLI every time. </Note>
  </Step>

  <Step title="Install libraries">`pip install -U anthropic agno `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vertexai/claude/image_input_url.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/image_input_url.py
      ```
    </CodeGroup>
  </Step>
</Steps>
