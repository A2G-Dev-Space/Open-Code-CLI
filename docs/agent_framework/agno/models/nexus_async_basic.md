# Async Basic Agent

> Original Document: [Async Basic Agent](https://docs.agno.com/examples/models/nexus/async_basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.467Z

---

# Async Basic Agent

## Code

```python cookbook/models/nexus/async_basic.py theme={null}
"""
Basic async example using Nexus.
"""

import asyncio

from agno.agent import Agent
from agno.models.nexus import Nexus

agent = Agent(model=Nexus(id="anthropic/claude-sonnet-4-20250514"), markdown=True)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story"))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    export ANTHROPIC_API_KEY=xxx 
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai 
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/nexus/async_basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nexus/async_basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
