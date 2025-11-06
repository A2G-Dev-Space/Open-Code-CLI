# Async Basic Stream

> Original Document: [Async Basic Stream](https://docs.agno.com/examples/models/ollama/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.237Z

---

# Async Basic Stream

## Code

```python cookbook/models/ollama/async_basic_stream.py theme={null}
import asyncio
from typing import Iterator  # noqa

from agno.agent import Agent, RunOutput  # noqa
from agno.models.ollama import Ollama

agent = Agent(model=Ollama(id="llama3.1:8b"), markdown=True)

# Get the response in a variable
# run_response: Iterator[RunOutputEvent] = agent.run("Share a 2 sentence horror story", stream=True)
# for chunk in run_response:
#     print(chunk.content)

# Print the response in the terminal
asyncio.run(agent.aprint_response("Share a 2 sentence horror story", stream=True))

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

  <Step title="Run the example">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
      python examples/models/ollama/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python examples/models/ollama/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
