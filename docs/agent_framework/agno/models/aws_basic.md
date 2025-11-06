# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/aws/claude/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.377Z

---

# Basic Agent

## Code

```python cookbook/models/aws/claude/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.aws import Claude

agent = Agent(
    model=Claude(id="anthropic.claude-3-5-sonnet-20240620-v1:0"), markdown=True
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

  <Step title="Set your AWS Credentials">
    ```bash  theme={null}
    export AWS_ACCESS_KEY_ID=***
    export AWS_SECRET_ACCESS_KEY=***
    export AWS_REGION=***
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U anthropic[bedrock] agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/aws/claude/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/aws/claude/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
