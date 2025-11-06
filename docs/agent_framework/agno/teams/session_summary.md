# Session Summary Management

> Original Document: [Session Summary Management](https://docs.agno.com/examples/concepts/teams/session/session_summary.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.088Z

---

# Session Summary Management

This example shows how to use session summary to store and maintain conversation summaries for better context management over long conversations.

## Code

```python 03_session_summary.py theme={null}
"""
This example shows how to use the session summary to store the conversation summary.
"""

from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from agno.session.summary import SessionSummaryManager  # noqa: F401
from agno.team import Team

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url, session_table="sessions")

# Method 1: Set enable_session_summaries to True

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
)

team = Team(
    model=OpenAIChat(id="gpt-5-mini"),
    members=[agent],
    db=db,
    enable_session_summaries=True,
)

team.print_response("Hi my name is John and I live in New York")
team.print_response("I like to play basketball and hike in the mountains")

# Method 2: Set session_summary_manager

# session_summary_manager = SessionSummaryManager(model=OpenAIChat(id="gpt-5-mini"))

# agent = Agent(
#     model=OpenAIChat(id="gpt-5-mini"),
# )

# team = Team(
#     model=OpenAIChat(id="gpt-5-mini"),
#     members=[agent],
#     db=db,
#     session_summary_manager=session_summary_manager,
# )

# team.print_response("Hi my name is John and I live in New York")
# team.print_response("I like to play basketball and hike in the mountains")
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
    python 03_session_summary.py
    ```
  </Step>
</Steps>
