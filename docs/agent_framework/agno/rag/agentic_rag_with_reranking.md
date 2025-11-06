# Agentic RAG with Reranking

> Original Document: [Agentic RAG with Reranking](https://docs.agno.com/examples/concepts/agent/rag/agentic_rag_with_reranking.md)
> Category: rag
> Downloaded: 2025-11-06T11:51:14.480Z

---

# Agentic RAG with Reranking

This example demonstrates how to implement Agentic RAG using LanceDB with Cohere reranking for improved search results.

## Code

```python agentic_rag_with_reranking.py theme={null}
"""
1. Run: `pip install openai agno cohere lancedb tantivy sqlalchemy pandas` to install the dependencies
2. Export your OPENAI_API_KEY and CO_API_KEY
3. Run: `python cookbook/agent_concepts/rag/agentic_rag_with_reranking.py` to run the agent
"""

from agno.agent import Agent
from agno.knowledge.embedder.openai import OpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reranker.cohere import CohereReranker
from agno.models.openai import OpenAIChat
from agno.vectordb.lancedb import LanceDb, SearchType

knowledge = Knowledge(
    # Use LanceDB as the vector database and store embeddings in the `agno_docs` table
    vector_db=LanceDb(
        uri="tmp/lancedb",
        table_name="agno_docs",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(
            id="text-embedding-3-small"
        ),  # Use OpenAI for embeddings
        reranker=CohereReranker(
            model="rerank-multilingual-v3.0"
        ),  # Use Cohere for reranking
    ),
)

knowledge.add_content_sync(
    name="Agno Docs", url="https://docs.agno.com/introduction.md"
)

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    # Agentic RAG is enabled by default when `knowledge` is provided to the Agent.
    knowledge=knowledge,
    markdown=True,
)

if __name__ == "__main__":
    # Load the knowledge base, comment after first run
    # agent.knowledge.load(recreate=True)
    agent.print_response("What are Agno's key features?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno cohere lancedb tantivy sqlalchemy pandas
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=your_openai_api_key
    export CO_API_KEY=your_cohere_api_key
    ```
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch agentic_rag_with_reranking.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python agentic_rag_with_reranking.py
      ```

      ```bash Windows theme={null}
      python agentic_rag_with_reranking.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/rag" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
