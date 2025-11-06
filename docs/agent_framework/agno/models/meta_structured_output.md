# Agent with Structured Outputs

> Original Document: [Agent with Structured Outputs](https://docs.agno.com/examples/models/meta/structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.891Z

---

# Agent with Structured Outputs

## Code

```python cookbook/models/meta/llama/structured_output.py theme={null}
from typing import List

from agno.agent import Agent, RunOutput  # noqa
from agno.models.meta import Llama
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


# Agent that uses a JSON schema output
agent = Agent(
    model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8", temperature=0.1),
    output_schema=MovieScript,
)

agent.print_response("New York")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your LLAMA API key">
    ```bash  theme={null}
    export LLAMA_API_KEY=YOUR_API_KEY
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install llama-api-client agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/meta/structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
