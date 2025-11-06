# JSON Files as Database

> Original Document: [JSON Files as Database](https://docs.agno.com/concepts/db/json.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.600Z

---

# JSON Files as Database

Agno supports using local JSON files as a "database" with the `JsonDb` class.
This is a simple way to store your Agent's session data without having to setup a database.

<Warning>
  Using JSON files as a database is not recommended for production applications.
  Use it for demos, testing and any other use case where you don't want to setup a database.
</Warning>

## Usage

```python json_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.json import JsonDb

# Setup the JSON database
db = JsonDb(db_path="tmp/json_db")

# Setup your Agent with the Database
agent = Agent(db=db)
```

## Params

<Snippet file="db-json-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/json/json_for_agent.py)
