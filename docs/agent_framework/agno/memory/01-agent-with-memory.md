# Agent with Memory

> Original Document: [Agent with Memory](https://docs.agno.com/examples/concepts/memory/01-agent-with-memory.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:14.835Z

---

# Agent with Memory

This example shows you how to use persistent memory with an Agent.

After each run, user memories are created/updated.

To enable this, set `enable_user_memories=True` in the Agent config.

## Code

```python agent_with_memory.py theme={null}
from uuid import uuid4

from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from rich.pretty import pprint

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url)

db.clear_memories()

session_id = str(uuid4())
john_doe_id = "john_doe@example.com"

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    enable_user_memories=True,
)

agent.print_response(
    "My name is John Doe and I like to hike in the mountains on weekends.",
    stream=True,
    user_id=john_doe_id,
    session_id=session_id,
)

agent.print_response(
    "What are my hobbies?", stream=True, user_id=john_doe_id, session_id=session_id
)

memories = agent.get_user_memories(user_id=john_doe_id)
print("John Doe's memories:")
pprint(memories)

agent.print_response(
    "Ok i dont like hiking anymore, i like to play soccer instead.",
    stream=True,
    user_id=john_doe_id,
    session_id=session_id,
)

# You can also get the user memories from the agent
memories = agent.get_user_memories(user_id=john_doe_id)
print("John Doe's memories:")
pprint(memories)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/memory/01_agent_with_memory.py
      ```

      ```bash Windows theme={null}
      python cookbook/memory/01_agent_with_memory.py
      ```
    </CodeGroup>
  </Step>
</Steps>
