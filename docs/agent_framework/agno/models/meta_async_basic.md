# Asynchronous Agent

> Original Document: [Asynchronous Agent](https://docs.agno.com/examples/models/meta/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.008Z

---

# Asynchronous Agent

## Code

```python cookbook/models/meta/llama/async_basic.py theme={null}
import asyncio

from agno.agent import Agent, RunOutput  # noqa
from agno.models.meta import Llama

agent = Agent(
    model=Llama(id="Llama-4-Maverick-17B-128E-Instruct-FP8"),
    markdown=True
)

# Get the response in a variable
# run: RunOutput = asyncio.run(agent.arun("Share a 2 sentence horror story"))
# print(run.content)

# Print the response in the terminal
asyncio.run(agent.aprint_response("Share a 2 sentence horror story"))
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
      python cookbook/models/meta/llama/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/meta/llama/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
