# Basic Streaming Agent

> Original Document: [Basic Streaming Agent](https://docs.agno.com/examples/models/nexus/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.444Z

---

# Basic Streaming Agent

## Code

```python cookbook/models/nexus/basic_stream.py theme={null}
from agno.agent import Agent, RunOutputEvent  # noqa
from agno.models.nvidia import Nvidia

agent = Agent(model=Nvidia(id="meta/llama-3.3-70b-instruct"), markdown=True)

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

  <Step title="Set your API keys">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    export ANTHROPIC_API_KEY=xxx 
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai 
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nexus/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nexus/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
