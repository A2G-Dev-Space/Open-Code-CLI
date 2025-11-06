# Basic Stream

> Original Document: [Basic Stream](https://docs.agno.com/examples/models/ollama/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.257Z

---

# Basic Stream

## Code

```python cookbook/models/ollama/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="llama3.1:8b"), markdown=True)

# Get the response in a variable
# run_response: Iterator[RunOutputEvent] = agent.run("Share a 2 sentence horror story", stream=True)
# for chunk in run_response:
#     print(chunk.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story", stream=True)

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
      python cookbook/models/ollama/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/ollama/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Cloud Alternative

For easier setup without local installation, you can use [Ollama Cloud](/examples/models/ollama/cloud) with your API key:

```python  theme={null}
from agno.agent import Agent
from agno.models.ollama import Ollama

# No local setup required - just set OLLAMA_API_KEY
agent = Agent(model=Ollama(id="gpt-oss:120b-cloud", host="https://ollama.com"))
agent.print_response("Share a 2 sentence horror story", stream=True)
```
