# SQLite

> Original Document: [SQLite](https://docs.agno.com/concepts/db/sqlite.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.619Z

---

# SQLite

> Learn to use Sqlite as a database for your Agents

Agno supports using [Sqlite](https://www.sqlite.org) as a database with the `SqliteDb` class.

## Usage

```python sqlite_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb

# Setup the SQLite database
db = SqliteDb(db_file="tmp/data.db")

# Setup a basic agent with the SQLite database
agent = Agent(db=db)
```

## Params

<Snippet file="db-sqlite-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/sqlite/sqlite_for_agent.py)
