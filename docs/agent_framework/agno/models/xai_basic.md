# Basic

> Original Document: [Basic](https://docs.agno.com/examples/models/xai/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.800Z

---

# Basic

## Code

```python cookbook/models/xai/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.xai import xAI

agent = Agent(model=xAI(id="grok-2"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story")

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
    pip install -U xai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
