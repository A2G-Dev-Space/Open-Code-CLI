# Demo Gemma

> Original Document: [Demo Gemma](https://docs.agno.com/examples/models/ollama/demo_gemma.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.268Z

---

# Demo Gemma

## Code

```python cookbook/models/ollama/demo_gemma.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="gemma3:12b"), markdown=True)

image_path = Path(__file__).parent.joinpath("super-agents.png")
agent.print_response(
    "Write a 3 sentence fiction story about the image",
    images=[Image(filepath=image_path)],
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull gemma3:12b
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
      python cookbook/models/ollama/demo_gemma.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/demo_gemma.py
      ```
    </CodeGroup>
  </Step>
</Steps>
