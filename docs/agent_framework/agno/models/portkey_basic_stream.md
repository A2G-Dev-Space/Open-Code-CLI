# Basic Agent with Streaming

> Original Document: [Basic Agent with Streaming](https://docs.agno.com/examples/models/portkey/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.821Z

---

# Basic Agent with Streaming

## Code

```python cookbook/models/portkey/basic_stream.py theme={null}
from agno.agent import Agent
from agno.models.portkey import Portkey

agent = Agent(
    model=Portkey(
        id="@first-integrati-707071/gpt-5-nano",
    ),
    markdown=True,
)

# Print the response in the terminal
agent.print_response(
    "What is Portkey and why would I use it as an AI gateway?", stream=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
    export PORTKEY_API_KEY=***
    export PORTKEY_VIRTUAL_KEY=***
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/portkey/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/portkey/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
