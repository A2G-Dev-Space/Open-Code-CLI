# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/portkey/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.833Z

---

# Basic Agent

## Code

```python cookbook/models/portkey/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.portkey import Portkey

# Create model using Portkey
model = Portkey(
    id="@first-integrati-707071/gpt-5-nano",
)

agent = Agent(model=model, markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("What is Portkey and why would I use it as an AI gateway?")
# print(run.content)

# Print the response in the terminal
agent.print_response("What is Portkey and why would I use it as an AI gateway?")
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
      python cookbook/models/portkey/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/portkey/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
