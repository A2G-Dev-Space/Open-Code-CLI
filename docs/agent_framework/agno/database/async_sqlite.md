# Async SQLite

> Original Document: [Async SQLite](https://docs.agno.com/concepts/db/async_sqlite.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.575Z

---

# Async SQLite

> Learn to use SQLite asynchronously as a database for your Agents

Agno supports using [Sqlite](https://www.sqlite.org) asynchronously, with the `AsyncSqliteDb` class.

## Usage

```python async_sqlite_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import AsyncSqliteDb

# Setup the SQLite database
db = AsyncSqliteDb(db_file="tmp/data.db")

# Setup a basic agent with the SQLite database
agent = Agent(db=db)
```

## Params

<Snippet file="db-async-sqlite-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/sqlite/async_sqlite)
