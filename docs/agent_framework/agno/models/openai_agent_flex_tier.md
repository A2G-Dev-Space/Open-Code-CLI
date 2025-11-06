# Agent Flex Tier

> Original Document: [Agent Flex Tier](https://docs.agno.com/examples/models/openai/responses/agent_flex_tier.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.394Z

---

# Agent Flex Tier

## Code

```python cookbook/models/openai/responses/agent_flex_tier.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIResponses

agent = Agent(
    model=OpenAIResponses(id="o4-mini", service_tier="flex"),
    markdown=True,
)

agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
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
      python cookbook/models/openai/responses/agent_flex_tier.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/agent_flex_tier.py
      ```
    </CodeGroup>
  </Step>
</Steps>
