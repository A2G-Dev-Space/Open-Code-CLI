# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/perplexity/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.540Z

---

# Async Basic Agent

## Code

```python cookbook/models/perplexity/async_basic.py theme={null}
import asyncio

from agno.agent import Agent, RunOutput  # noqa
from agno.models.perplexity import Perplexity

agent = Agent(model=Perplexity(id="sonar"), markdown=True)

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
    export PERPLEXITY_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/perplexity/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/perplexity/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
