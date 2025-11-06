# Sqlite for Agent

> Original Document: [Sqlite for Agent](https://docs.agno.com/examples/concepts/db/sqlite/sqlite_for_agent.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.610Z

---

# Sqlite for Agent

Agno supports using Sqlite as a storage backend for Agents using the `SqliteDb` class.

## Usage

You need to provide either `db_url`, `db_file` or `db_engine`. The following example uses `db_file`.

```python sqlite_for_agent.py theme={null}

from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.tools.duckduckgo import DuckDuckGoTools

# Setup the SQLite database
db = SqliteDb(db_file="tmp/data.db")

# Setup a basic agent with the SQLite database
agent = Agent(
    db=db,
    tools=[DuckDuckGoTools()],
    add_history_to_context=True,
    add_datetime_to_context=True,
)

# The Agent sessions and runs will now be stored in SQLite
agent.print_response("How many people live in Canada?")
agent.print_response("What is their national anthem?")
agent.print_response("List my messages one by one")

```

## Params

<Snippet file="db-sqlite-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/blob/main/cookbook/db/sqlite/sqlite_for_agent.py)
