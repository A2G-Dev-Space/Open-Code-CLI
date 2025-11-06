# Non-Reasoning Model Agent

> Original Document: [Non-Reasoning Model Agent](https://docs.agno.com/examples/concepts/reasoning/agents/non-reasoning-model.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.886Z

---

# Non-Reasoning Model Agent

This example demonstrates how to use a non-reasoning model as a reasoning model.

For reasoning, we recommend using a Reasoning Agent (with `reasoning=True`), or to use an appropriate reasoning model with `reasoning_model=`.

## Code

```python cookbook/reasoning/agents/default_chain_of_thought.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    reasoning_model=OpenAIChat(
        id="gpt-5-mini", # This model will be used for reasoning, although it is not a native reasoning model.
        max_tokens=1200,
    ),
    markdown=True,
)
reasoning_agent.print_response(
    "Give me steps to write a python script for fibonacci series",
    stream=True,
    show_full_reasoning=True,
)

# It uses the default model of the Agent
reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini", max_tokens=1200),
    reasoning=True,
    markdown=True,
)
reasoning_agent.print_response(
    "Give me steps to write a python script for fibonacci series",
    stream=True,
    show_full_reasoning=True,
)
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

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/agents/default_chain_of_thought.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/agents/default_chain_of_thought.py
      ```
    </CodeGroup>
  </Step>
</Steps>
