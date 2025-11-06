# In-Memory Storage for Agents

> Original Document: [In-Memory Storage for Agents](https://docs.agno.com/examples/concepts/db/in_memory/in_memory_for_agent.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.548Z

---

# In-Memory Storage for Agents

Example using `InMemoryDb` with agent.

## Usage

```python  theme={null}
from agno.agent import Agent
from agno.db.in_memory import InMemoryDb

# Setup in-memory database
db = InMemoryDb()

# Create agent with database
agent = Agent(db=db)

# Agent sessions stored in memory
agent.print_response("Give me an easy dinner recipe")
```

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/blob/main/cookbook/db/in_memory/in_memory_storage_for_agent.py)
