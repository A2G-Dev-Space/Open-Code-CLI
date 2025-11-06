# Image to Structured Output

> Original Document: [Image to Structured Output](https://docs.agno.com/examples/concepts/agent/multimodal/image_to_structured_output.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.465Z

---

# Image to Structured Output

This example demonstrates how to analyze images and generate structured output using Pydantic models, creating movie scripts based on image content.

## Code

```python image_to_structured_output.py theme={null}
from typing import List

from agno.agent import Agent
from agno.media import Image
from agno.models.openai import OpenAIChat
from pydantic import BaseModel, Field
from rich.pretty import pprint


class MovieScript(BaseModel):
    name: str = Field(..., description="Give a name to this movie")
    setting: str = Field(
        ..., description="Provide a nice setting for a blockbuster movie."
    )
    characters: List[str] = Field(..., description="Name of characters for this movie.")
    storyline: str = Field(
        ..., description="3 sentence storyline for the movie. Make it exciting!"
    )


agent = Agent(model=OpenAIChat(id="gpt-5-mini"), output_schema=MovieScript)

response = agent.run(
    "Write a movie about this image",
    images=[
        Image(
            url="https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg"
        )
    ],
    stream=True,
)

for event in response:
    pprint(event.content)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai pydantic rich
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch image_to_structured_output.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python image_to_structured_output.py
      ```

      ```bash Windows theme={null}
      python image_to_structured_output.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/multimodal" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
