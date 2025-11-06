# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/mistral/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.087Z

---

# Basic Agent

## Code

```python cookbook/models/mistral/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.mistral import MistralChat


agent = Agent(
    model=MistralChat(id="mistral-small-latest"),
    markdown=True,
)

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
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
