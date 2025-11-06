# Live Search Agent Stream

> Original Document: [Live Search Agent Stream](https://docs.agno.com/examples/models/xai/live_search_agent_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.862Z

---

# Live Search Agent Stream

## Code

```python cookbook/models/xai/live_search_agent_stream.py theme={null}
from agno.agent import Agent
from agno.models.xai.xai import xAI

agent = Agent(
    model=xAI(
        id="grok-3",
        search_parameters={
            "mode": "on",
            "max_search_results": 20,
            "return_citations": True,
        },
    ),
    markdown=True,
)
agent.print_response(
    "Provide me a digest of world news in the last 24 hours.", stream=True
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export XAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U xai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/xai/live_search_agent_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/xai/live_search_agent_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
