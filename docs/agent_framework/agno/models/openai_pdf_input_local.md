# Pdf Input Local

> Original Document: [Pdf Input Local](https://docs.agno.com/examples/models/openai/responses/pdf_input_local.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.717Z

---

# Pdf Input Local

## Code

```python cookbook/models/openai/responses/pdf_input_local.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import File
from agno.models.openai.responses import OpenAIResponses
from agno.utils.media import download_file

pdf_path = Path(__file__).parent.joinpath("ThaiRecipes.pdf")

# Download the file using the download_file function
download_file(
    "https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf", str(pdf_path)
)

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
    tools=[{"type": "file_search"}],
    markdown=True,
    add_history_to_context=True,
)

agent.print_response(
    "Summarize the contents of the attached file.",
    files=[File(filepath=pdf_path)],
)
agent.print_response("Suggest me a recipe from the attached file.")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/pdf_input_local.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/pdf_input_local.py
      ```
    </CodeGroup>
  </Step>
</Steps>
