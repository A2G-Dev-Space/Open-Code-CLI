# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/fireworks/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.700Z

---

# Streaming Agent

## Code

```python cookbook/models/fireworks/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.fireworks import Fireworks

agent = Agent(
    model=Fireworks(id="accounts/fireworks/models/llama-v3p1-405b-instruct"),
    markdown=True,
)

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

  <Step title="Set your API key">
    ```bash  theme={null}
    export FIREWORKS_API_KEY=xxx
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
      python cookbook/models/fireworks/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/fireworks/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
