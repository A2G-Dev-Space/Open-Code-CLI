# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/litellm_openai/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.962Z

---

# Agent with Tools

Make sure to start the proxy server:

```shell  theme={null}
litellm --model gpt-5-mini --host 127.0.0.1 --port 4000
```

## Code

```python cookbook/models/litellm_openai/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.litellm import LiteLLMOpenAI
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=LiteLLMOpenAI(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
        markdown=True,
)
agent.print_response("Whats happening in France?")
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
    pip install -U litellm[proxy] openai agno ddgs
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
      python cookbook/models/litellm_openai/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm_openai/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
