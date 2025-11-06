# Agentic Memory

> Original Document: [Agentic Memory](https://docs.agno.com/examples/concepts/memory/02-agentic-memory.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:14.845Z

---

# Agentic Memory

This example shows you how to use persistent memory with an Agent.

During each run the Agent can create/update/delete user memories.

To enable this, set `enable_agentic_memory=True` in the Agent config.

## Code

```python agentic_memory.py theme={null}
from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from rich.pretty import pprint

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url)


john_doe_id = "john_doe@example.com"

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    enable_agentic_memory=True,
)

agent.print_response(
    "My name is John Doe and I like to hike in the mountains on weekends.",
    stream=True,
    user_id=john_doe_id,
)

agent.print_response("What are my hobbies?", stream=True, user_id=john_doe_id)

memories = agent.get_user_memories(user_id=john_doe_id)
print("Memories about John Doe:")
pprint(memories)


agent.print_response(
    "Remove all existing memories of me.",
    stream=True,
    user_id=john_doe_id,
)

memories = agent.get_user_memories(user_id=john_doe_id)
print("Memories about John Doe:")
pprint(memories)

agent.print_response(
    "My name is John Doe and I like to paint.", stream=True, user_id=john_doe_id
)

memories = agent.get_user_memories(user_id=john_doe_id)
print("Memories about John Doe:")
pprint(memories)


agent.print_response(
    "I don't paint anymore, i draw instead.", stream=True, user_id=john_doe_id
)

memories = agent.get_user_memories(user_id=john_doe_id)

print("Memories about John Doe:")
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
      python cookbook/memory/02_agentic_memory.py
      ```

      ```bash Windows theme={null}
      python cookbook/memory/02_agentic_memory.py
      ```
    </CodeGroup>
  </Step>
</Steps>
