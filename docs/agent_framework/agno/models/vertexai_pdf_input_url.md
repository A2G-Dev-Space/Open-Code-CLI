# PDF Input URL Agent

> Original Document: [PDF Input URL Agent](https://docs.agno.com/examples/models/vertexai/claude/pdf_input_url.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.739Z

---

# PDF Input URL Agent

## Code

```python cookbook/models/vertexai/claude/pdf_input_url.py theme={null}
from agno.agent import Agent
from agno.media import File
from agno.models.vertexai.claude import Claude

agent = Agent(
    model=Claude(id="claude-sonnet-4@20250514"),
    markdown=True,
)

agent.print_response(
    "Summarize the contents of the attached file.",
    files=[
        File(url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"),
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
      python cookbook/models/vertexai/claude/pdf_input_url.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/pdf_input_url.py
      ```
    </CodeGroup>
  </Step>
</Steps>
