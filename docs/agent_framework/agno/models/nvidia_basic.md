# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/nvidia/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.228Z

---

# Basic Agent

## Code

```python cookbook/models/nvidia/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.nvidia import Nvidia

agent = Agent(model=Nvidia(id="meta/llama-3.3-70b-instruct"), markdown=True)

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
    export NVIDIA_API_KEY=xxx
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
      python cookbook/models/nvidia/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nvidia/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
