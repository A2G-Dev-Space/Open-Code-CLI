# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/openai/chat/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.333Z

---

# Basic Agent

## Code

```python cookbook/models/openai/chat/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.openai import OpenAIChat

agent = Agent(model=OpenAIChat(id="gpt-5-mini"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
run_response = agent.run("Share a 2 sentence horror story")

# Access metrics from the response
# print(run_response.metrics)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
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
        python cookbook/models/openai/chat/basic.py
      ```

      ```bash Windows theme={null}
        python cookbook/models/openai/chat/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
