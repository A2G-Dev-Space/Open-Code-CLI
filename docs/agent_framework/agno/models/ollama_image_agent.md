# Image Agent

> Original Document: [Image Agent](https://docs.agno.com/examples/models/ollama/image_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.283Z

---

# Image Agent

## Code

```python cookbook/models/ollama/image_agent.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.ollama import Ollama

agent = Agent(
    model=Ollama(id="llama3.2-vision"),
    markdown=True,
)

image_path = Path(__file__).parent.joinpath("super-agents.png")
agent.print_response(
    "Write a 3 sentence fiction story about the image",
    images=[Image(filepath=image_path)],
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.2-vision
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ollama agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ollama/image_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/image_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
