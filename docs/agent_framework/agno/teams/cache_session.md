# Session Caching for Performance

> Original Document: [Session Caching for Performance](https://docs.agno.com/examples/concepts/teams/session/cache_session.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.066Z

---

# Session Caching for Performance

This example demonstrates how to enable session caching to store team sessions in memory for faster access and improved performance.

## Code

```python cookbook/examples/teams/session/08_cache_session.py theme={null}
"""Example of how to cache the team session in memory for faster access."""

from agno.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from agno.team import Team

# Setup the database
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(db_url=db_url, session_table="sessions")

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    name="Research Assistant",
)

# Setup the team
team = Team(
    model=OpenAIChat(id="gpt-5-mini"),
    members=[agent],
    db=db,
    session_id="team_session_cache",
    add_history_to_context=True,
    # Activate session caching. The session will be cached in memory for faster access.
    cache_session=True,
)

team.print_response("Tell me a new interesting fact about space")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install required libraries">
    ```bash  theme={null}
    pip install agno psycopg2-binary
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=****
    ```
  </Step>

  <Step title="Start PostgreSQL database">
    ```bash  theme={null}
    cookbook/run_pgvector.sh
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python cookbook/examples/teams/session/08_cache_session.py
    ```
  </Step>
</Steps>
