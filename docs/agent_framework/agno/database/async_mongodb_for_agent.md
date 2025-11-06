# Async MongoDB for Agent

> Original Document: [Async MongoDB for Agent](https://docs.agno.com/examples/concepts/db/mongodb/async_mongodb_for_agent.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.557Z

---

# Async MongoDB for Agent

Agno supports using MongoDB asynchronously as a storage backend for Agents, with the `AsyncMongoDb` class.

## Usage

You need to provide either `db_url` or `client`. The following example uses `db_url`.

### Run MongoDB

Install [docker desktop](https://docs.docker.com/desktop/install/mac-install/) and run **MongoDB** on port **27017** using:

```bash  theme={null}
docker run -d \
  --name local-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo
```

```python async_mongodb_for_agent.py theme={null}
"""
Run `pip install agno openai motor pymongo` to install dependencies.
"""
from agno.agent import Agent
from agno.db.mongo import AsyncMongoDb
from agno.tools.duckduckgo import DuckDuckGoTools

# MongoDB connection settings
db_url = "mongodb://localhost:27017"

db = AsyncMongoDb(db_url=db_url)

agent = Agent(
    db=db,
    tools=[DuckDuckGoTools()],
    add_history_to_context=True,
)
agent.print_response("How many people live in Canada?")
agent.print_response("What is their national anthem called?")
```

## Params

<Snippet file="db-async-mongo-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/blob/main/cookbook/db/mongo/async_mongo/async_mongodb_for_agent.py)
