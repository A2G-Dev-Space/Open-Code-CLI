# Async Streaming Agent

> Original Document: [Async Streaming Agent](https://docs.agno.com/examples/models/nexus/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.250Z

---

# Async Streaming Agent

## Code

```python cookbook/models/nexus/async_basic_stream.py theme={null}
"""
Basic streaming async example using Nexus.
"""

import asyncio

from agno.agent import Agent
from agno.models.nexus import Nexus

agent = Agent(model=Nexus(id="anthropic/claude-sonnet-4-20250514"), markdown=True)

asyncio.run(agent.aprint_response("Share a 2 sentence horror story", stream=True))

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API keys">
    ```bash  theme={null}
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
      python cookbook/models/nexus/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/nexus/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
