# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/cerebras_openai/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.426Z

---

# Streaming Agent

## Code

```python cookbook/models/cerebras_openai/basic_stream.py theme={null}
from agno.agent import Agent
from agno.models.cerebras import CerebrasOpenAI

agent = Agent(
    model=CerebrasOpenAI(id="llama-4-scout-17b-16e-instruct"),
    markdown=True,
)

# Print the response in the terminal
agent.print_response("write a two sentence horror story", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export CEREBRAS_API_KEY=xxx
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
      python cookbook/models/cerebras_openai/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/cerebras_openai/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
