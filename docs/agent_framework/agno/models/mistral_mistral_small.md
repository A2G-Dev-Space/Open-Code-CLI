# Mistral Small

> Original Document: [Mistral Small](https://docs.agno.com/examples/models/mistral/mistral_small.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.115Z

---

# Mistral Small

## Code

```python cookbook/models/mistral/mistral_small.py theme={null}
from agno.agent import Agent
from agno.models.mistral import MistralChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=MistralChat(id="mistral-small-latest"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Tell me about mistrall small, any news", stream=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/mistral_small.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/mistral_small.py
      ```
    </CodeGroup>
  </Step>
</Steps>
