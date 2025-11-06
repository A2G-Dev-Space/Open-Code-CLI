# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/meta/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.032Z

---

# Streaming Agent

## Code

```python cookbook/models/meta/llama/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutput  # noqa
from agno.models.meta import Llama

agent = Agent(model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8"), markdown=True)

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

  <Step title="Set your LLAMA API key">
    ```bash  theme={null}
    export LLAMA_API_KEY=YOUR_API_KEY
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install llama-api-client agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/meta/llama/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/llama/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
