# Structured Output

> Original Document: [Structured Output](https://docs.agno.com/examples/models/llama_cpp/structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.975Z

---

# Structured Output

## Code

```python cookbook/models/llama_cpp/structured_output.py theme={null}
from typing import List

from agno.agent import Agent
from agno.models.llama_cpp import LlamaCpp
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
    model=LlamaCpp(id="ggml-org/gpt-oss-20b-GGUF"),
    description="You write movie scripts.",
    output_schema=MovieScript,
)

# Run the agent synchronously
structured_output_response: RunOutput = structured_output_agent.run("New York")
pprint(structured_output_response.content)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install LlamaCpp">
    Follow the [LlamaCpp installation guide](https://github.com/ggerganov/llama.cpp) and start the server:

    ```bash  theme={null}
    llama-server -hf ggml-org/gpt-oss-20b-GGUF --ctx-size 0 --jinja -ub 2048 -b 2048
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pydantic rich agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/llama_cpp/structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/llama_cpp/structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
