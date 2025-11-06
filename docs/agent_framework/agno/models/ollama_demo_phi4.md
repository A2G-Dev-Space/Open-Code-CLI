# Demo Phi4

> Original Document: [Demo Phi4](https://docs.agno.com/examples/models/ollama/demo_phi4.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.268Z

---

# Demo Phi4

## Code

```python cookbook/models/ollama/demo_phi4.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="phi4"), markdown=True)

# Print the response in the terminal
agent.print_response("Tell me a scary story in exactly 10 words.")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull phi4
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
      python cookbook/models/ollama/demo_phi4.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/demo_phi4.py
      ```
    </CodeGroup>
  </Step>
</Steps>
