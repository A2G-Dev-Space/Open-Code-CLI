# Agent with PDF Input (Local file)

> Original Document: [Agent with PDF Input (Local file)](https://docs.agno.com/examples/models/gemini/pdf_input_local.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.760Z

---

# Agent with PDF Input (Local file)

## Code

```python cookbook/models/google/gemini/pdf_input_local.py theme={null}
from pathlib import Path
from agno.agent import Agent
from agno.media import File
from agno.models.google import Gemini
from agno.utils.media import download_file

pdf_path = Path(__file__).parent.joinpath("ThaiRecipes.pdf")

# Download the file using the download_file function
download_file(
    "https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf", str(pdf_path)
)

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
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
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-genai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/google/gemini/pdf_input_local.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/pdf_input_local.py
      ```
    </CodeGroup>
  </Step>
</Steps>
