# Demo Deepseek R1

> Original Document: [Demo Deepseek R1](https://docs.agno.com/examples/models/ollama/demo_deepseek_r1.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.278Z

---

# Demo Deepseek R1

## Code

```python cookbook/models/ollama/demo_deepseek_r1.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="deepseek-r1:14b"), markdown=True)

# Print the response in the terminal
agent.print_response(
    "Write me python code to solve quadratic equations. Explain your reasoning."
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull deepseek-r1:14b
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
      python cookbook/models/ollama/demo_deepseek_r1.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/demo_deepseek_r1.py
      ```
    </CodeGroup>
  </Step>
</Steps>
