# Async Structured Output Agent

> Original Document: [Async Structured Output Agent](https://docs.agno.com/examples/models/mistral/async_structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.072Z

---

# Async Structured Output Agent

## Code

```python cookbook/models/mistral/async_structured_output.py theme={null}
import asyncio
from typing import List

from agno.agent import Agent, RunOutput  # noqa
from agno.models.mistral import MistralChat
from agno.tools.duckduckgo import DuckDuckGoTools
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


agent = Agent(
    model=MistralChat(
        id="mistral-small-latest",
    ),
    tools=[DuckDuckGoTools()],
    description="You help people write movie scripts.",
    output_schema=MovieScript,
)

asyncio.run(agent.aprint_response("Find a cool movie idea about London and write it."))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/async_structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/async_structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
