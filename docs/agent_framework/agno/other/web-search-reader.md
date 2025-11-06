# Web Search Reader

> Original Document: [Web Search Reader](https://docs.agno.com/examples/concepts/knowledge/readers/web-search/web-search-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.809Z

---

# Web Search Reader

The **Web Search Reader** searches and reads web search results, converting them into vector embeddings for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/web_search_reader.py theme={null}
from agno.agent import Agent
from agno.db.postgres.postgres import PostgresDb
from agno.knowledge.embedder.openai import OpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.web_search_reader import WebSearchReader
from agno.models.openai import OpenAIChat
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(id="web-search-db", db_url=db_url)

vector_db = PgVector(
    db_url=db_url,
    table_name="web_search_documents",
)
knowledge = Knowledge(
    name="Web Search Documents",
    contents_db=db,
    vector_db=vector_db,
)


# Load knowledge from web search
knowledge.add_content(
    topics=["agno"],
    reader=WebSearchReader(
        max_results=3,
        search_engine="duckduckgo",
        chunk=True,
    ),
)

# Create an agent with the knowledge
agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    knowledge=knowledge,
    search_knowledge=True,
    debug_mode=True,
)

# Ask the agent about the knowledge
agent.print_response(
    "What are the latest AI trends according to the search results?", markdown=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U requests beautifulsoup4 agno openai
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/web_search_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/web_search_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="web-search-reader-reference.mdx" />
