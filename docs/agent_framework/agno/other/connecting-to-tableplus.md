# Connecting to Tableplus

> Original Document: [Connecting to Tableplus](https://docs.agno.com/faq/connecting-to-tableplus.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.035Z

---

# Connecting to Tableplus

If you want to inspect your pgvector container to explore your storage or knowledge base, you can use TablePlus. Follow these steps:

## Step 1: Start Your `pgvector` Container

Run the following command to start a `pgvector` container locally:

```bash  theme={null}
docker run -d \
  -e POSTGRES_DB=ai \
  -e POSTGRES_USER=ai \
  -e POSTGRES_PASSWORD=ai \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v pgvolume:/var/lib/postgresql/data \
  -p 5532:5432 \
  --name pgvector \
  agno/pgvector:16
```

* `POSTGRES_DB=ai` sets the default database name.
* `POSTGRES_USER=ai` and `POSTGRES_PASSWORD=ai` define the database credentials.
* The container exposes port `5432` (mapped to `5532` on your local machine).

## Step 2: Configure TablePlus

1. **Open TablePlus**: Launch the TablePlus application.
2. **Create a New Connection**: Click on the `+` icon to add a new connection.
3. **Select `PostgreSQL`**: Choose PostgreSQL as the database type.

Fill in the following connection details:

* **Host**: `localhost`
* **Port**: `5532`
* **Database**: `ai`
* **User**: `ai`
* **Password**: `ai`

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=65f0ec170fdef92080bdc0e72feaacc4" data-og-width="492" width="492" data-og-height="386" height="386" data-path="images/tableplus.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=4c693a789381ec09ee8112a29a19a23f 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=83b7b78de5bb7e3e04337380be4a846a 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=a933eddefc5117323116e34eba956055 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=84a19124e98f325caa51ff1ee0032652 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=0a60723cf13d5771fcc8d9f89bb921f2 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tableplus.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=24d6892323098fdd654dcf4fcf579419 2500w" />
