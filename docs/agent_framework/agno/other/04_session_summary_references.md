# Session Summary with References

> Original Document: [Session Summary with References](https://docs.agno.com/examples/concepts/agent/session/04_session_summary_references.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.497Z

---

# Session Summary with References

This example demonstrates how to use session summaries with context references, enabling the agent to maintain conversation context and reference previous session summaries.

## Code

```python 04_session_summary_references.py theme={null}
"""
This example shows how to use the `add_session_summary_to_context` parameter in the Agent config to
add session summaries to the Agent context.

Start the postgres db locally on Docker by running: cookbook/scripts/run_pgvector.sh
"""

from agno.agent.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

db = PostgresDb(db_url=db_url, session_table="sessions")

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    session_id="session_summary",
    enable_session_summaries=True,
)

# This will create a new session summary
agent.print_response(
    "My name is John Doe and I like to hike in the mountains on weekends.",
)

# You can use existing session summaries from session storage without creating or updating any new ones.
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    session_id="session_summary",
    add_session_summary_to_context=True,
)

agent.print_response("I also like to play basketball.")

# Alternatively, you can create a new session summary without adding the session summary to context.

# agent = Agent(
#     model=OpenAIChat(id="gpt-5-mini"),
#     db=db,
#     session_id="session_summary",
#     enable_session_summaries=True,
#     add_session_summary_to_context=False,
# )

# agent.print_response("I also like to play basketball.")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai psycopg
    ```
  </Step>

  <Step title="Setup PostgreSQL">
    ```bash  theme={null}
    # Start PostgreSQL container with pgvector
    cookbook/scripts/run_pgvector.sh
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch 04_session_summary_references.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python 04_session_summary_references.py
      ```

      ```bash Windows theme={null}
      python 04_session_summary_references.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/session" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
