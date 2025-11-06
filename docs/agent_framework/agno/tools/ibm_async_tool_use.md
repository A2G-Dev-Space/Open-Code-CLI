# Agent with Async Tool Usage

> Original Document: [Agent with Async Tool Usage](https://docs.agno.com/examples/models/ibm/async_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.869Z

---

# Agent with Async Tool Usage

## Code

```python cookbook/models/ibm/watsonx/async_tool_use.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.ibm import WatsonX
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=WatsonX(id="meta-llama/llama-3-3-70b-instruct"),
    tools=[DuckDuckGoTools()],
        markdown=True,
)

asyncio.run(agent.aprint_response("Whats happening in France?", stream=True))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export IBM_WATSONX_API_KEY=xxx
    export IBM_WATSONX_PROJECT_ID=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ibm-watsonx-ai ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ibm/watsonx/async_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook\models\ibm\watsonx\async_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
