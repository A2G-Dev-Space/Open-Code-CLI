# Async Basic Stream

> Original Document: [Async Basic Stream](https://docs.agno.com/examples/models/openai/responses/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.386Z

---

# Async Basic Stream

## Code

```python cookbook/models/openai/responses/async_basic_stream.py theme={null}
import asyncio
from typing import Iterator  # noqa

from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.openai import OpenAIResponses

agent = Agent(model=OpenAIResponses(id="gpt-5-mini"), markdown=True)

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

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
