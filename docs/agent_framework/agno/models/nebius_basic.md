# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/nebius/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.452Z

---

# Basic Agent

## Code

```python cookbook/models/nebius/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.nebius import Nebius

agent = Agent(
    model=Nebius(),
        markdown=True,
    debug_mode=True,
)

# Get the response in a variable
# run: RunOutput = agent.run("write a two sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("write a two sentence horror story")
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
      python cookbook/models/nebius/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nebius/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
