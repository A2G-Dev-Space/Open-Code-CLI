# Async Basic

> Original Document: [Async Basic](https://docs.agno.com/examples/models/openai/responses/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.658Z

---

# Async Basic

## Code

```python cookbook/models/openai/responses/async_basic.py theme={null}
import asyncio

from agno.agent import Agent, RunOutput  # noqa
from agno.models.openai import OpenAIResponses

agent = Agent(model=OpenAIResponses(id="gpt-5-mini"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
asyncio.run(agent.aprint_response("Share a 2 sentence horror story"))

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
      python cookbook/models/openai/responses/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
