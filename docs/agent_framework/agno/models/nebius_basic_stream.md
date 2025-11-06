# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/nebius/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.155Z

---

# Streaming Agent

## Code

```python cookbook/models/nebius/basic_stream.py theme={null}
from agno.agent import Agent
from agno.models.nebius import Nebius

agent = Agent(
    model=Nebius(),
        markdown=True,
    debug_mode=True,
)

# Print the response in the terminal
agent.print_response("write a two sentence horror story", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export NEBIUS_API_KEY=xxx
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
      python cookbook/models/nebius/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nebius/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
