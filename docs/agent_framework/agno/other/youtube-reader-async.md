# YouTube Reader (Async)

> Original Document: [YouTube Reader (Async)](https://docs.agno.com/examples/concepts/knowledge/readers/youtube/youtube-reader-async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.811Z

---

# YouTube Reader (Async)

The **YouTube Reader** allows you to extract transcripts from YouTube videos and convert them into vector embeddings for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/youtube_reader.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.youtube_reader import YouTubeReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

# Create Knowledge Instance
knowledge = Knowledge(
    name="YouTube Knowledge Base",
    description="Knowledge base from YouTube video transcripts",
    vector_db=PgVector(
        table_name="youtube_vectors", 
        db_url=db_url
    ),
)

# Create an agent with the knowledge
agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

async def main():
    # Add YouTube video content
    await knowledge.add_content_async(
        metadata={"source": "youtube", "type": "educational"},
        urls=[
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  # Replace with actual educational video
            "https://www.youtube.com/watch?v=example123"   # Replace with actual video URL
        ],
        reader=YouTubeReader(),
    )

    # Query the knowledge base
    await agent.aprint_response(
        "What are the main topics discussed in the videos?",
        markdown=True
    )

if __name__ == "__main__":
    asyncio.run(main())
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U youtube-transcript-api pytube sqlalchemy psycopg pgvector agno openai
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
      python examples/concepts/knowledge/readers/youtube_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/youtube_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="youtube-reader-reference.mdx" />
