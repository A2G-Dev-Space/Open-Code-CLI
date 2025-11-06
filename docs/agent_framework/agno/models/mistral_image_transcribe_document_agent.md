# Image Transcribe Document Agent

> Original Document: [Image Transcribe Document Agent](https://docs.agno.com/examples/models/mistral/image_transcribe_document_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.124Z

---

# Image Transcribe Document Agent

## Code

```python cookbook/models/mistral/image_transcribe_document_agent.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.mistral.mistral import MistralChat

agent = Agent(
    model=MistralChat(id="pixtral-12b-2409"),
    markdown=True,
)

agent.print_response(
    "Transcribe this document.",
    images=[
        Image(url="https://ciir.cs.umass.edu/irdemo/hw-demo/page_example.jpg"),
    ],
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
      python cookbook/models/mistral/image_transcribe_document_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/image_transcribe_document_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
