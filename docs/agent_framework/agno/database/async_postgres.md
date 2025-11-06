# Async PostgreSQL

> Original Document: [Async PostgreSQL](https://docs.agno.com/concepts/db/async_postgres.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.571Z

---

# Async PostgreSQL

> Learn to use PostgreSQL asynchronously as a database for your Agents

Agno supports using [PostgreSQL](https://www.postgresql.org/) asynchronously, with the `AsyncPostgresDb` class.

## Usage

```python postgres_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.postgres import AsyncPostgresDb

# Replace with your own connection string, and notice the `async_` prefix
db_url = "postgresql+psycopg_async://ai:ai@localhost:5532/ai"

# Setup your Database
db = AsyncPostgresDb(db_url=db_url)

# Setup your Agent with the Database
agent = Agent(db=db)
```

### Run Postgres (with PgVector)

Install [docker desktop](https://docs.docker.com/desktop/install/mac-install/) and run **PgVector** on port **5532** using:

```bash  theme={null}
docker run -d \
  -e POSTGRES_DB=ai \
  -e POSTGRES_USER=ai \
  -e POSTGRES_PASSWORD=ai \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v pgvolume:/var/lib/postgresql/data \
  -p 5532:5432 \
  --name pgvector \
  agnohq/pgvector:16
```

## Params

<Snippet file="db-async-postgres-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/postgres/async_postgres)
