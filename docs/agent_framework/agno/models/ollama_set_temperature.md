# Set Temperature

> Original Document: [Set Temperature](https://docs.agno.com/examples/models/ollama/set_temperature.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.300Z

---

# Set Temperature

## Code

```python cookbook/models/ollama/set_temperature.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="llama3.2", options={"temperature": 0.5}), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Ollama">
    Follow the [Ollama installation guide](https://github.com/ollama/ollama?tab=readme-ov-file#macos) and run:

    ```bash  theme={null}
    ollama pull llama3.2
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
      python cookbook/models/ollama/set_temperature.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/set_temperature.py
      ```
    </CodeGroup>
  </Step>
</Steps>
