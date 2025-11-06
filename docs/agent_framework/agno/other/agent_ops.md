# Agent Ops

> Original Document: [Agent Ops](https://docs.agno.com/examples/concepts/integrations/observability/agent_ops.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.662Z

---

# Agent Ops

This example shows how to add observability to your agno agent with Agent Ops.

## Code

```python cookbook/integrations/observability/agent_ops.py theme={null}
import agentops
from agno.agent import Agent
from agno.models.openai import OpenAIChat

# Initialize AgentOps
agentops.init()

# Create and run an agent
agent = Agent(model=OpenAIChat(id="gpt-5-mini"))
response = agent.run("Share a 2 sentence horror story")

# Print the response
print(response.content)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    Obtain an API key from [https://app.agentops.ai/](https://app.agentops.ai/)

    ```bash  theme={null}
    export AGENTOPS_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno agentops openai
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/integrations/observability/agent_ops.py
      ```

      ```bash Windows theme={null}
      python cookbook/integrations/observability/agent_ops.py
      ```
    </CodeGroup>

    <Step title="Set your API key">
      You can view the logs in the AgentOps dashboard: [https://app.agentops.ai/](https://app.agentops.ai/)
    </Step>
  </Step>
</Steps>
