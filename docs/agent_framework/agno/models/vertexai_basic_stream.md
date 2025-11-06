# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/vertexai/claude/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.547Z

---

# Streaming Agent

## Code

```python cookbook/models/vertexai/claude/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.vertexai.claude import Claude

agent = Agent(model=Claude(id="claude-sonnet-4@20250514"), markdown=True)

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

  <Step title="Set your environment variables">
    <CodeGroup>
      ```bash Mac theme={null}
      export CLOUD_ML_REGION=xxx
      export GOOGLE_CLOUD_PROJECT=xxx
      ```

      ```bash Windows theme={null}
        setx CLOUD_ML_REGION xxx
        setx GOOGLE_CLOUD_PROJECT xxx
      ```
    </CodeGroup>
  </Step>

  <Step title="Authenticate your CLI session">
    `gcloud auth application-default login `

    <Note>You dont need to authenticate your CLI every time. </Note>
  </Step>

  <Step title="Install libraries">`pip install -U anthropic agno `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vertexai/claude/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
