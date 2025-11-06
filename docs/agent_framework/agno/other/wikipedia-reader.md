# Wikipedia Reader

> Original Document: [Wikipedia Reader](https://docs.agno.com/examples/concepts/knowledge/readers/wikipedia/wikipedia-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.905Z

---

# Wikipedia Reader

The **Wikipedia Reader** allows you to search and read Wikipedia articles synchronously, converting them into vector embeddings for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/wikipedia_reader_sync.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.wikipedia_reader import WikipediaReader
from agno.vectordb.pgvector import PgVector

# Create Knowledge Instance
knowledge = Knowledge(
    name="Wikipedia Knowledge Base",
    description="Knowledge base from Wikipedia articles",
    vector_db=PgVector(
        table_name="wikipedia_vectors", 
        db_url="postgresql+psycopg://ai:ai@localhost:5532/ai"
    ),
)

# Add topics from Wikipedia synchronously
knowledge.add_content(
    metadata={"source": "wikipedia", "type": "encyclopedia"},
    topics=["Manchester United", "Artificial Intelligence"],
    reader=WikipediaReader(),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

# Query the knowledge base
agent.print_response(
    "What can you tell me about Manchester United?",
    markdown=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U wikipedia sqlalchemy psycopg pgvector agno openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Snippet file="run-pgvector-step.mdx" />

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/wikipedia_reader_sync.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/wikipedia_reader_sync.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="wikipedia-reader-reference.mdx" />
