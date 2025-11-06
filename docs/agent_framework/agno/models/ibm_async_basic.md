# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/ibm/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.860Z

---

# Async Basic Agent

## Code

```python cookbook/models/ibm/watsonx/async_basic.py theme={null}
import asyncio

from agno.agent import Agent, RunOutput
from agno.models.ibm import WatsonX

agent = Agent(model=WatsonX(id="ibm/granite-20b-code-instruct"), markdown=True)

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
    export IBM_WATSONX_API_KEY=xxx
    export IBM_WATSONX_PROJECT_ID=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ibm-watsonx-ai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ibm/watsonx/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook\models\ibm\watsonx\async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>

This example shows how to use the asynchronous API of Agno with IBM WatsonX. It creates an agent and uses `asyncio.run()` to execute the asynchronous `aprint_response` method.
