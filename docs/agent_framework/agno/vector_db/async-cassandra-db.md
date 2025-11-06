# Cassandra Async

> Original Document: [Cassandra Async](https://docs.agno.com/examples/concepts/vectordb/cassandra-db/async-cassandra-db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:15.157Z

---

# Cassandra Async

## Code

```python cookbook/knowledge/vector_db/cassandra_db/async_cassandra_db.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.embedder.mistral import MistralEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.models.mistral import MistralChat
from agno.vectordb.cassandra import Cassandra

try:
    from cassandra.cluster import Cluster  # type: ignore
except (ImportError, ModuleNotFoundError):
    raise ImportError(
        "Could not import cassandra-driver python package.Please install it with pip install cassandra-driver."
    )

cluster = Cluster()

session = cluster.connect()
session.execute(
    """
    CREATE KEYSPACE IF NOT EXISTS testkeyspace
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }
    """
)

knowledge = Knowledge(
    vector_db=Cassandra(
        table_name="recipes",
        keyspace="testkeyspace",
        session=session,
        embedder=MistralEmbedder(),
    ),
)

agent = Agent(
    model=MistralChat(),
    knowledge=knowledge,
)

if __name__ == "__main__":
    asyncio.run(
        knowledge.add_content(url="https://docs.agno.com/introduction/agents.md")
    )

    asyncio.run(
        agent.aprint_response(
            "What is the purpose of an Agno Agent?",
            markdown=True,
        )
    )
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U cassandra-driver pypdf mistralai agno
    ```
  </Step>

  <Step title="Run Cassandra">
    ```bash  theme={null}
    docker run -d \
    --name cassandra-db \
    -p 9042:9042 \
    cassandra:latest
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export CASSANDRA_HOST="localhost"
    export CASSANDRA_PORT="9042"
    export CASSANDRA_USER="cassandra"
    export CASSANDRA_PASSWORD="cassandra"
    export MISTRAL_API_KEY="your-mistral-api-key"
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/vector_db/cassandra_db/async_cassandra_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/vector_db/cassandra_db/async_cassandra_db.py
      ```
    </CodeGroup>
  </Step>
</Steps>
