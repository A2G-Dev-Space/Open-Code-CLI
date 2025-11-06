# Reasoning O3 Mini

> Original Document: [Reasoning O3 Mini](https://docs.agno.com/examples/models/openai/responses/reasoning_o3_mini.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.489Z

---

# Reasoning O3 Mini

## Code

```python cookbook/models/openai/responses/reasoning_o3_mini.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)

# Print the response in the terminal
agent.print_response("Write a report on the latest news on AI?", stream=True)

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
      python cookbook/models/openai/responses/reasoning_o3_mini.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/reasoning_o3_mini.py
      ```
    </CodeGroup>
  </Step>
</Steps>
