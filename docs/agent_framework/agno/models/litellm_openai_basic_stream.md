# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/litellm_openai/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.953Z

---

# Streaming Agent

Make sure to start the proxy server:

```shell  theme={null}
litellm --model gpt-5-mini --host 127.0.0.1 --port 4000
```

## Code

```python cookbook/models/litellm_openai/basic_stream.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.litellm import LiteLLMOpenAI

agent = Agent(model=LiteLLMOpenAI(id="gpt-5-mini"), markdown=True)

agent.print_response("Share a 2 sentence horror story", stream=True)
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
    pip install -U litellm[proxy] openai agno
    ```
  </Step>

  <Step title="Start the proxy server">
    ```bash  theme={null}
    litellm --model gpt-5-mini --host 127.0.0.1 --port 4000
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
