# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/xai/basic_async.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.818Z

---

# Async Basic Agent

## Code

```python cookbook/models/xai/basic_async.py theme={null}
import asyncio

from agno.agent import Agent, RunOutput
from agno.models.xai import xAI

agent = Agent(model=xAI(id="grok-3"), markdown=True)

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
    export XAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    ```bash  theme={null}
    python cookbook/models/xai/basic_async.py
    ```
  </Step>
</Steps>
