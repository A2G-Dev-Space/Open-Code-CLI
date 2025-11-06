# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/groq/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.068Z

---

# Basic Agent

## Code

```python cookbook/models/groq/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.groq import Groq

agent = Agent(model=Groq(id="llama-3.3-70b-versatile"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response on the terminal
agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GROQ_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U groq agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/groq/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/groq/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
