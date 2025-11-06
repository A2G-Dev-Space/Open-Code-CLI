# Teams with Memory

> Original Document: [Teams with Memory](https://docs.agno.com/concepts/teams/memory.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:13.838Z

---

# Teams with Memory

> Learn how to use teams with memory.

The team can also manage user memories, just like agents:

```python  theme={null}
from agno.team import Team
from agno.db.sqlite import SqliteDb

db = SqliteDb(db_file="agno.db")

team_with_memory = Team(
    name="Team with Memory",
    members=[agent1, agent2],
    db=db,
    enable_user_memories=True,
)

team_with_memory.print_response("Hi! My name is John Doe.")
team_with_memory.print_response("What is my name?")
```

See more in the [Memory](/concepts/memory/overview) section.
