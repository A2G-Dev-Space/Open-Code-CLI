# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/litellm/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.952Z

---

# Agent with Tools

## Code

```python cookbook/models/litellm/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.litellm import LiteLLM
from agno.tools.duckduckgo import DuckDuckGoTools

openai_agent = Agent(
    model=LiteLLM(
        id="gpt-5-mini",
        name="LiteLLM",
    ),
    markdown=True,
    tools=[DuckDuckGoTools()],
)

# Ask a question that would likely trigger tool use
openai_agent.print_response("What is happening in France?")
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
    pip install -U litellm openai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
