# Agent with Structured Outputs

> Original Document: [Agent with Structured Outputs](https://docs.agno.com/examples/models/gemini/structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.771Z

---

# Agent with Structured Outputs

## Code

```python cookbook/models/google/gemini/structured_output.py theme={null}
from typing import List

from agno.agent import Agent, RunOutput  # noqa
from agno.models.google import Gemini
from pydantic import BaseModel, Field
from rich.pretty import pprint  # noqa


class MovieScript(BaseModel):
    setting: str = Field(
        ..., description="Provide a nice setting for a blockbuster movie."
    )
    ending: str = Field(
        ...,
        description="Ending of the movie. If not available, provide a happy ending.",
    )
    genre: str = Field(
        ...,
        description="Genre of the movie. If not available, select action, thriller or romantic comedy.",
    )
    name: str = Field(..., description="Give a name to this movie")
    characters: List[str] = Field(..., description="Name of characters for this movie.")
    storyline: str = Field(
        ..., description="3 sentence storyline for the movie. Make it exciting!"
    )


structured_output_agent = Agent(
    model=Gemini(id="gemini-2.0-flash-001"),
    description="You help people write movie scripts.",
    output_schema=MovieScript,
)

structured_output_agent.print_response("New York")
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
      python cookbook/models/google/gemini/structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
