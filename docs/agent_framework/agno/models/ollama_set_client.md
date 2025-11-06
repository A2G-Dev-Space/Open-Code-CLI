# Set Client

> Original Document: [Set Client](https://docs.agno.com/examples/models/ollama/set_client.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.304Z

---

# Set Client

## Code

```python cookbook/models/ollama/set_client.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.ollama import Ollama
from ollama import Client as OllamaClient

agent = Agent(
    model=Ollama(id="llama3.1:8b", client=OllamaClient()),
    markdown=True,
)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.1:8b
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
      python cookbook/models/ollama/set_client.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/set_client.py
      ```
    </CodeGroup>
  </Step>
</Steps>
