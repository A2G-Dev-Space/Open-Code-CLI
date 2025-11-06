# Structured Output

> Original Document: [Structured Output](https://docs.agno.com/examples/models/xai/structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.883Z

---

# Structured Output

## Code

```python cookbook/models/xai/structured_output.py theme={null}
from typing import List

from agno.agent import Agent
from agno.models.xai.xai import xAI
from agno.run.agent import RunOutput
from pydantic import BaseModel, Field
from rich.pretty import pprint  # noqa


class MovieScript(BaseModel):
    name: str = Field(..., description="Give a name to this movie")
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
    characters: List[str] = Field(..., description="Name of characters for this movie.")
    storyline: str = Field(
        ..., description="3 sentence storyline for the movie. Make it exciting!"
    )


# Agent that returns a structured output
structured_output_agent = Agent(
    model=xAI(id="grok-2-latest"),
    description="You write movie scripts.",
    output_schema=MovieScript,
)

# Run the agent synchronously
structured_output_response: RunOutput = structured_output_agent.run(
    "Llamas ruling the world"
)
pprint(structured_output_response.content)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export XAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U xai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
