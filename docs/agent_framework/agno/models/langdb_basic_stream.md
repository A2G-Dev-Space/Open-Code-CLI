# Basic Streaming Agent

> Original Document: [Basic Streaming Agent](https://docs.agno.com/examples/models/langdb/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.899Z

---

# Basic Streaming Agent

## Code

```python cookbook/models/langdb/basic_stream.py theme={null}
from typing import Iterator  # noqa
from agno.agent import Agent, RunOutput  # noqa
from agno.models.langdb import LangDB

agent = Agent(
    model=LangDB(id="llama3-1-70b-instruct-v1.0"),
    markdown=True,
)

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

  <Step title="Set your API key">
    ```bash  theme={null}
    export LANGDB_API_KEY=xxx
    export LANGDB_PROJECT_ID=xxx
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
      python cookbook/models/langdb/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/langdb/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
