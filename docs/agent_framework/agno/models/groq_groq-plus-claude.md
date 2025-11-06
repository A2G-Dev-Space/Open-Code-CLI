# Groq Claude + DeepSeek R1

> Original Document: [Groq Claude + DeepSeek R1](https://docs.agno.com/examples/concepts/reasoning/models/groq/groq-plus-claude.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.916Z

---

# Groq Claude + DeepSeek R1

## Code

```python cookbook/reasoning/models/groq/deepseek_plus_claude.py theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.models.groq import Groq

deepseek_plus_claude = Agent(
    model=Claude(id="claude-3-7-sonnet-20250219"),
    reasoning_model=Groq(
        id="deepseek-r1-distill-llama-70b", temperature=0.6, max_tokens=1024, top_p=0.95
    ),
)
deepseek_plus_claude.print_response("9.11 and 9.9 -- which is bigger?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GROQ_API_KEY=xxx
    export ANTHROPIC_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U groq anthropic agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/models/groq/deepseek_plus_claude.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/groq/deepseek_plus_claude.py
      ```
    </CodeGroup>
  </Step>
</Steps>
