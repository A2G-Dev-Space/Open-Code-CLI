# MongoDB Database

> Original Document: [MongoDB Database](https://docs.agno.com/concepts/db/mongodb.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.597Z

---

# MongoDB Database

> Learn to use MongoDB as a database for your Agents

Agno supports using [MongoDB](https://www.mongodb.com/) as a database with the `MongoDb` class.

<Tip>
  **v2 Migration Support**: If you're upgrading from Agno v1, MongoDB is fully supported in the v2 migration script. See the [migration guide](/how-to/v2-migration) for details.
</Tip>

## Usage

```python mongodb_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.mongo import MongoDb

# MongoDB connection settings
db_url = "mongodb://localhost:27017"

db = MongoDb(db_url=db_url)

# Setup your Agent with the Database
agent = Agent(db=db)
```

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

## Params

<Snippet file="db-mongo-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/mongo/mongodb_for_agent.py)
