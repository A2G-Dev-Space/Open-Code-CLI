# Agno Assist

> Original Document: [Agno Assist](https://docs.agno.com/examples/use-cases/agents/agno_assist.md)
> Category: other
> Downloaded: 2025-11-06T11:51:16.891Z

---

# Agno Assist

This example shows how to create a specialized AI assistant that helps users understand and work with the Agno framework. Learn how to build domain-specific agents that provide expert guidance, answer technical questions, and help users navigate complex systems. Perfect for creating help desk agents, technical support systems, and educational AI assistants.

## Code

```python cookbook/examples/agents/agno_assist.py theme={null}
import asyncio

from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.knowledge.embedder.openai import OpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.models.openai import OpenAIChat
from agno.vectordb.lancedb import LanceDb, SearchType

knowledge = Knowledge(
    vector_db=LanceDb(
        uri="tmp/lancedb",
        table_name="agno_assist_knowledge",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(id="text-embedding-3-small"),
    ),
)

asyncio.run(
    knowledge.add_content_async(name="Agno Docs", url="https://docs.agno.com/llms-full.txt")
)

agno_assist = Agent(
    name="Agno Assist",
    model=OpenAIChat(id="gpt-5-mini"),
    description="You help answer questions about the Agno framework.",
    instructions="Search your knowledge before answering the question.",
    knowledge=knowledge,
    db=SqliteDb(session_table="agno_assist_sessions", db_file="tmp/agents.db"),
    add_history_to_context=True,
    add_datetime_to_context=True,
    markdown=True,
)

if __name__ == "__main__":
    agno_assist.print_response("What is Agno?")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai lancedb
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/examples/agents/agno_assist.py
      ```

      ```bash Windows theme={null}
      python cookbook/examples/agents/agno_assist.py
      ```
    </CodeGroup>
  </Step>
</Steps>
