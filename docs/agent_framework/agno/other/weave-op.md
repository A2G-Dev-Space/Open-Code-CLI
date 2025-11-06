# Weave

> Original Document: [Weave](https://docs.agno.com/examples/concepts/integrations/observability/weave-op.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.743Z

---

# Weave

## Overview

This example demonstrates how to use Weave by Weights & Biases (WandB) to log model calls from your Agno agent.

## Code

```python  theme={null}
import weave
from agno.agent import Agent
from agno.models.openai import OpenAIChat

# Create and configure the agent
agent = Agent(model=OpenAIChat(id="gpt-5-mini"), markdown=True, debug_mode=True)

# Initialize Weave with your project name
weave.init("agno")

# Define a function to run the agent, decorated with weave.op()
@weave.op()
def run(content: str):
    return agent.run(content)

# Use the function to log a model call
run("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Step title="Install Weave">
    ```bash  theme={null}
    pip install agno openai weave
    ```
  </Step>

  <Step title="Authenticate with WandB">
    * Go to [WandB](https://wandb.ai) and copy your API key from [here](https://wandb.ai/authorize).
    * Enter your API key in the terminal when prompted, or export it as an environment variable:

    ```bash  theme={null}
    export WANDB_API_KEY=<your-api-key>
    ```
  </Step>

  <Step title="Run the Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/observability/weave_op.py
      ```

      ```bash Windows theme={null}
      python cookbook/observability/weave_op.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Notes

* **Initialization**: Call `weave.init("project-name")` to initialize Weave with your project name.
* **Decorators**: Use `@weave.op()` to decorate functions you want to log with Weave.
