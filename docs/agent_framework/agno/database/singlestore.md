# Singlestore

> Original Document: [Singlestore](https://docs.agno.com/concepts/db/singlestore.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.651Z

---

# Singlestore

> Learn to use Singlestore as a database for your Agents

Agno supports using [Singlestore](https://www.singlestore.com/) as a database with the `SingleStoreDb` class.

You can get started with Singlestore following their [documentation](https://docs.singlestore.com/db/v9.0/introduction/).

## Usage

```python singlestore_for_agent.py theme={null}
from os import getenv

from agno.agent import Agent
from agno.db.singlestore import SingleStoreDb

# Configure SingleStore DB connection
USERNAME = getenv("SINGLESTORE_USERNAME")
PASSWORD = getenv("SINGLESTORE_PASSWORD")
HOST = getenv("SINGLESTORE_HOST")
PORT = getenv("SINGLESTORE_PORT")
DATABASE = getenv("SINGLESTORE_DATABASE")
db_url = (
    f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}?charset=utf8mb4"
)

# Setup your Database
db = SingleStoreDb(db_url=db_url)

# Create an agent with SingleStore db
agent = Agent(db=db)
```

## Params

<Snippet file="db-singlestore-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/singlestore/singlestore_for_agent.py)
