# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/cerebras/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.408Z

---

# Basic Agent

## Code

```python cookbook/models/cerebras/basic.py theme={null}
from agno.agent import Agent
from agno.models.cerebras import Cerebras

agent = Agent(
    model=Cerebras(id="llama-4-scout-17b-16e-instruct"),
    markdown=True,
)

# Print the response in the terminal
agent.print_response("write a two sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export CEREBRAS_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U cerebras-cloud-sdk agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/cerebras/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cerebras/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
