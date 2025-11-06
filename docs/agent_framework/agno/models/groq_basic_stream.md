# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/groq/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.803Z

---

# Streaming Agent

## Code

```python cookbook/models/groq/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.groq import Groq

agent = Agent(model=Groq(id="llama-3.3-70b-versatile"), markdown=True)

# Get the response in a variable
# run_response: Iterator[RunOutputEvent] = agent.run("Share a 2 sentence horror story", stream=True)
# for chunk in run_response:
#     print(chunk.content)

# Print the response on the terminal
agent.print_response("Share a 2 sentence horror story", stream=True)
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
      python cookbook/models/groq/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/groq/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
