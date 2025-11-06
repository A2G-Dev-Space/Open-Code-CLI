# Groq DeepSeek R1

> Original Document: [Groq DeepSeek R1](https://docs.agno.com/examples/concepts/reasoning/models/groq/groq-basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.913Z

---

# Groq DeepSeek R1

## Code

```python cookbook/reasoning/models/groq/9_11_or_9_9.py theme={null}
from agno.agent import Agent
from agno.models.groq import Groq

agent = Agent(
    model=Groq(
        id="deepseek-r1-distill-llama-70b", temperature=0.6, max_tokens=1024, top_p=0.95
    ),
    markdown=True,
)
agent.print_response("9.11 and 9.9 -- which is bigger?", stream=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GROQ_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U groq agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/models/groq/9_11_or_9_9.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/groq/9_11_or_9_9.py
      ```
    </CodeGroup>
  </Step>
</Steps>
