# Memory with Redis

> Original Document: [Memory with Redis](https://docs.agno.com/examples/concepts/memory/db/mem-redis-memory.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:14.850Z

---

# Memory with Redis

## Code

```python cookbook/memory/db/mem-redis-memory.py theme={null}
from agno.agent import Agent
from agno.db.redis import RedisDb

# Setup Redis
# Initialize Redis db (use the right db_url for your setup)
db = RedisDb(db_url="redis://localhost:6379")

# Create agent with Redis db
agent = Agent(
    db=db,
    enable_user_memories=True,
)

agent.print_response("My name is John Doe and I like to play basketball on the weekends.")
agent.print_response("What's do I do in weekends?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai redis
    ```
  </Step>

  <Step title="Run Redis">
    ```bash  theme={null}
    docker run --name my-redis -p 6379:6379 -d redis
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
      python cookbook/memory/db/mem-redis-memory.py
      ```

      ```bash Windows theme={null}
      python cookbook/memory/db/mem-redis-memory.py
      ```
    </CodeGroup>
  </Step>
</Steps>
