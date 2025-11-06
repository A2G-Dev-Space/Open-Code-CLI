# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/lmstudio/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.985Z

---

# Basic Agent

## Code

```python cookbook/models/lmstudio/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.lmstudio import LMStudio

agent = Agent(model=LMStudio(id="qwen2.5-7b-instruct-1m"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install LM Studio">
    Install LM Studio from [here](https://lmstudio.ai/download) and download the
    model you want to use.
  </Step>

  <Step title="Install libraries">`bash pip install -U agno `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/lmstudio/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/lmstudio/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
