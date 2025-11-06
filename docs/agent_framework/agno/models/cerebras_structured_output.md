# Agent with Structured Outputs

> Original Document: [Agent with Structured Outputs](https://docs.agno.com/examples/models/cerebras/structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.412Z

---

# Agent with Structured Outputs

## Code

```python cookbook/models/cerebras/basic_json_schema.py theme={null}
from typing import List

from agno.agent import Agent, RunOutput  # noqa
from agno.models.cerebras import Cerebras
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
json_schema_output_agent = Agent(
    model=Cerebras(id="llama-4-scout-17b-16e-instruct"),
    description="You are a helpful assistant. Summarize the movie script based on the location in a JSON object.",
    output_schema=MovieScript,
)

json_schema_output_agent.print_response("New York")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export CEREBRAS_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U cerebras-cloud-sdk agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/cerebras/basic_json_schema.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cerebras/basic_json_schema.py
      ```
    </CodeGroup>
  </Step>
</Steps>
