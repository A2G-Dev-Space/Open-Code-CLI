# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/litellm/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.936Z

---

# Basic Agent

## Code

```python cookbook/models/litellm/basic.py theme={null}
from agno.agent import Agent
from agno.models.litellm import LiteLLM

openai_agent = Agent(
    model=LiteLLM(
        id="huggingface/mistralai/Mistral-7B-Instruct-v0.2",
        top_p=0.95,
    ),
    markdown=True,
)

openai_agent.print_response("Whats happening in France?")

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
    pip install -U litellm agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/litellm/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/litellm/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
