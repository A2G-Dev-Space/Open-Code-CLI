# Agent with PDF Input (URL)

> Original Document: [Agent with PDF Input (URL)](https://docs.agno.com/examples/models/gemini/pdf_input_url.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.013Z

---

# Agent with PDF Input (URL)

## Code

```python cookbook/models/google/gemini/pdf_input_url.py theme={null}
from agno.agent import Agent
from agno.media import File
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
)

agent.print_response(
    "Summarize the contents of the attached file.",
    files=[File(url="https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf")],
)
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
      python cookbook/models/google/gemini/pdf_input_url.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/pdf_input_url.py
      ```
    </CodeGroup>
  </Step>
</Steps>
