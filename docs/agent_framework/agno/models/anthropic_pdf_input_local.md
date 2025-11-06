# PDF Input Local Agent

> Original Document: [PDF Input Local Agent](https://docs.agno.com/examples/models/anthropic/pdf_input_local.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.348Z

---

# PDF Input Local Agent

## Code

```python cookbook/models/anthropic/pdf_input_local.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import File
from agno.models.anthropic import Claude
from agno.utils.media import download_file

pdf_path = Path(__file__).parent.joinpath("ThaiRecipes.pdf")

# Download the file using the download_file function
download_file(
    "https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf", str(pdf_path)
)

agent = Agent(
    model=Claude(id="claude-sonnet-4-20250514"),
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
run_response = agent.get_last_run_output()
print("Citations:")
print(run_response.citations)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export ANTHROPIC_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U anthropic agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/anthropic/pdf_input_local.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/anthropic/pdf_input_local.py
      ```
    </CodeGroup>
  </Step>
</Steps>
