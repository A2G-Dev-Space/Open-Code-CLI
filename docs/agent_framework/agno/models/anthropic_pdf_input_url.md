# PDF Input URL Agent

> Original Document: [PDF Input URL Agent](https://docs.agno.com/examples/models/anthropic/pdf_input_url.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.354Z

---

# PDF Input URL Agent

## Code

```python cookbook/models/anthropic/pdf_input_url.py theme={null}
from agno.agent import Agent
from agno.media import File
from agno.models.anthropic import Claude

agent = Agent(
    model=Claude(id="claude-sonnet-4-20250514"),
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
      python cookbook/models/anthropic/pdf_input_url.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/anthropic/pdf_input_url.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
