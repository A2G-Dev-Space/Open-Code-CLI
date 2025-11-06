# Reasoning Agent

> Original Document: [Reasoning Agent](https://docs.agno.com/examples/models/groq/reasoning_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.817Z

---

# Reasoning Agent

## Code

```python cookbook/models/groq/reasoning_agent.py theme={null}
from agno.agent import Agent
from agno.models.groq import Groq

# Create a reasoning agent that uses:
# - `deepseek-r1-distill-llama-70b` as the reasoning model
# - `llama-3.3-70b-versatile` to generate the final response
reasoning_agent = Agent(
    model=Groq(id="llama-3.3-70b-versatile"),
    reasoning_model=Groq(
        id="deepseek-r1-distill-llama-70b", temperature=0.6, max_tokens=1024, top_p=0.95
    ),
)

# Prompt the agent to solve the problem
reasoning_agent.print_response("Is 9.11 bigger or 9.9?", stream=True)
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
      python cookbook/models/groq/reasoning_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/groq/reasoning_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
