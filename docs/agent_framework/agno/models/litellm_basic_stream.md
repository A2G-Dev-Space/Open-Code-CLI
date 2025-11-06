# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/litellm/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.929Z

---

# Streaming Agent

## Code

```python cookbook/models/litellm/basic_stream.py theme={null}
from agno.agent import Agent
from agno.models.litellm import LiteLLM

openai_agent = Agent(
    model=LiteLLM(
        id="gpt-5-mini",
        name="LiteLLM",
    ),
    markdown=True,
)

openai_agent.print_response("Share a 2 sentence horror story", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export LITELLM_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U litellm openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
