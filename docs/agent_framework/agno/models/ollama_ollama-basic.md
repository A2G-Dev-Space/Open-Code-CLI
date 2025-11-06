# Ollama DeepSeek R1

> Original Document: [Ollama DeepSeek R1](https://docs.agno.com/examples/concepts/reasoning/models/ollama/ollama-basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.916Z

---

# Ollama DeepSeek R1

## Code

```python cookbook/reasoning/models/ollama/reasoning_model_deepseek.py theme={null}
from agno.agent import Agent
from agno.models.ollama.chat import Ollama

agent = Agent(
    model=Ollama(id="llama3.2:latest"),
    reasoning_model=Ollama(id="deepseek-r1:14b", max_tokens=4096),
)
agent.print_response(
    "Solve the trolley problem. Evaluate multiple ethical frameworks. "
    "Include an ASCII diagram of your solution.",
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.2:latest
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
      python cookbook/reasoning/models/ollama/reasoning_model_deepseek.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/ollama/reasoning_model_deepseek.py
      ```
    </CodeGroup>
  </Step>
</Steps>
