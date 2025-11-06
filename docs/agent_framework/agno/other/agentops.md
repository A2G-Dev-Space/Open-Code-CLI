# AgentOps

> Original Document: [AgentOps](https://docs.agno.com/integrations/observability/agentops.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.058Z

---

# AgentOps

> Integrate Agno with AgentOps to send traces and logs to a centralized observability platform.

## Integrating Agno with AgentOps

[AgentOps](https://app.agentops.ai/) provides automatic instrumentation for your Agno agents to track all operations including agent interactions, team coordination, tool usage, and workflow execution.

## Prerequisites

1. **Install AgentOps**

   Ensure you have the AgentOps package installed:

   ```bash  theme={null}
   pip install agentops
   ```

2. **Authentication**
   Go to [AgentOps](https://app.agentops.ai/) and copy your API key
   ```bash  theme={null}
   export AGENTOPS_API_KEY=<your-api-key>
   ```

## Logging Model Calls with AgentOps

This example demonstrates how to use AgentOps to log model calls.

```python  theme={null}
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

## Notes

* **Environment Variables**: Ensure your environment variable is correctly set for the AgentOps API key.
* **Initialization**: Call `agentops.init()` to initialize AgentOps.
* **AgentOps Docs**: [AgentOps Docs](https://docs.agentops.ai/v2/integrations/agno)

Following these steps will integrate Agno with AgentOps, providing comprehensive logging and visualization for your AI agents’ model calls.
