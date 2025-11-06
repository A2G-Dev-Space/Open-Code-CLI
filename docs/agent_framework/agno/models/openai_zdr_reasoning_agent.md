# ZDR Reasoning Agent

> Original Document: [ZDR Reasoning Agent](https://docs.agno.com/examples/models/openai/responses/zdr_reasoning_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.525Z

---

# ZDR Reasoning Agent

## Code

```python cookbook/models/openai/responses/zdr_reasoning_agent.py theme={null}
"""
An example of using OpenAI Responses with reasoning features and ZDR mode enabled.

Read more about ZDR mode here: https://openai.com/enterprise-privacy/.
"""

from agno.agent import Agent
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIResponses

agent = Agent(
    name="ZDR Compliant Agent",
    session_id="zdr_demo_session",
    model=OpenAIResponses(
        id="o4-mini",
        store=False,
        reasoning_summary="auto",  # Requesting a reasoning summary
    ),
    instructions="You are a helpful AI assistant operating in Zero Data Retention mode for maximum privacy and compliance.",
    db=InMemoryDb(),
    add_history_to_context=True,
    stream=True,
)

agent.print_response("What's the largest country in Europe by area?")
agent.print_response("What's the population of that country?")
agent.print_response("What's the population density per square kilometer?")
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
      python cookbook/models/openai/responses/zdr_reasoning_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/zdr_reasoning_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
