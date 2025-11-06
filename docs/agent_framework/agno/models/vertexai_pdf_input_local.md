# PDF Input Local Agent

> Original Document: [PDF Input Local Agent](https://docs.agno.com/examples/models/vertexai/claude/pdf_input_local.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.733Z

---

# PDF Input Local Agent

## Code

```python cookbook/models/vertexai/claude/pdf_input_local.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import File
from agno.models.vertexai.claude import Claude
from agno.utils.media import download_file

pdf_path = Path(__file__).parent.joinpath("ThaiRecipes.pdf")

# Download the file using the download_file function
download_file(
    "https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf", str(pdf_path)
)

agent = Agent(
    model=Claude(id="claude-sonnet-4@20250514"),
    markdown=True,
)

agent.print_response(
    "Summarize the contents of the attached file.",
    files=[
        File(
            filepath=pdf_path,
        ),
    ],
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
      python cookbook/models/vertexai/claude/pdf_input_local.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/pdf_input_local.py
      ```
    </CodeGroup>
  </Step>
</Steps>
