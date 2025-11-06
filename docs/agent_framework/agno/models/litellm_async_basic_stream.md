# Async Basic Streaming Agent

> Original Document: [Async Basic Streaming Agent](https://docs.agno.com/examples/models/litellm/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.917Z

---

# Async Basic Streaming Agent

## Code

```python cookbook/models/litellm/async_basic_stream.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.litellm import LiteLLM

openai_agent = Agent(
    model=LiteLLM(
        id="gpt-5-mini",
        name="LiteLLM",
    ),
    markdown=True,
)

# Print the response in the terminal
asyncio.run(
    openai_agent.aprint_response("Share a 2 sentence horror story", stream=True)
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export LITELLM_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U litellm agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
