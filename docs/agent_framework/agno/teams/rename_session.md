# Session Name Management

> Original Document: [Session Name Management](https://docs.agno.com/examples/concepts/teams/session/rename_session.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.090Z

---

# Session Name Management

This example demonstrates how to set custom session names or automatically generate meaningful names for better session organization and identification.

## Code

```python cookbook/examples/teams/session/06_rename_session.py theme={null}
from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from agno.team import Team

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url)

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
)

team = Team(
    model=OpenAIChat(id="gpt-5-mini"),
    members=[agent],
    db=db,
)

team.print_response("Tell me a new interesting fact about space")
team.set_session_name(session_name="Interesting Space Facts")
print(team.get_session_name())

# Autogenerate session name
team.set_session_name(autogenerate=True)
print(team.get_session_name())
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
    python cookbook/examples/teams/session/06_rename_session.py
    ```
  </Step>
</Steps>
