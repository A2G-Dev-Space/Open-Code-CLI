# DeepSeek Reasoner

> Original Document: [DeepSeek Reasoner](https://docs.agno.com/examples/concepts/reasoning/models/deepseek/trolley-problem.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.920Z

---

# DeepSeek Reasoner

## Code

```python cookbook/reasoning/models/deepseek/trolley_problem.py theme={null}
from agno.agent import Agent
from agno.models.deepseek import DeepSeek
from agno.models.openai import OpenAIChat

task = (
    "You are a philosopher tasked with analyzing the classic 'Trolley Problem'. In this scenario, a runaway trolley "
    "is barreling down the tracks towards five people who are tied up and unable to move. You are standing next to "
    "a large stranger on a footbridge above the tracks. The only way to save the five people is to push this stranger "
    "off the bridge onto the tracks below. This will kill the stranger, but save the five people on the tracks. "
    "Should you push the stranger to save the five people? Provide a well-reasoned answer considering utilitarian, "
    "deontological, and virtue ethics frameworks. "
    "Include a simple ASCII art diagram to illustrate the scenario."
)

reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    reasoning_model=DeepSeek(id="deepseek-reasoner"),
    markdown=True,
)
reasoning_agent.print_response(task, stream=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export DEEPSEEK_API_KEY=xxx
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
      python cookbook/reasoning/models/deepseek/trolley_problem.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/models/deepseek/trolley_problem.py
      ```
    </CodeGroup>
  </Step>
</Steps>
