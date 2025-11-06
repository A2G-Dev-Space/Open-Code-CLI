# Filtering on ChromaDB

> Original Document: [Filtering on ChromaDB](https://docs.agno.com/examples/concepts/knowledge/filters/vector-dbs/filtering_chroma_db.md)
> Category: vector_db
> Downloaded: 2025-11-06T11:51:14.739Z

---

# Filtering on ChromaDB

> Learn how to filter knowledge base searches using Pdf documents with user-specific metadata in ChromaDB.

## Code

```python  theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.utils.media import (
    SampleDataFileExtension,
    download_knowledge_filters_sample_data,
)
from agno.vectordb.chroma import ChromaDb

# Download all sample CVs and get their paths
downloaded_cv_paths = download_knowledge_filters_sample_data(
    num_files=5, file_extension=SampleDataFileExtension.PDF
)

# Initialize ChromaDB
vector_db = ChromaDb(collection="recipes", path="tmp/chromadb", persistent_client=True)

# Step 1: Initialize knowledge with documents and metadata
# ------------------------------------------------------------------------------
# When initializing the knowledge, we can attach metadata that will be used for filtering
# This metadata can include user IDs, document types, dates, or any other attributes

knowledge = Knowledge(
    name="ChromaDB Knowledge Base",
    description="A knowledge base for ChromaDB",
    vector_db=vector_db,
)

# Load all documents into the vector database
knowledge.add_contents(
    [
        {
            "path": downloaded_cv_paths[0],
            "metadata": {
                "user_id": "jordan_mitchell",
                "document_type": "cv",
                "year": 2025,
            },
        },
        {
            "path": downloaded_cv_paths[1],
            "metadata": {
                "user_id": "taylor_brooks",
                "document_type": "cv",
                "year": 2025,
            },
        },
        {
            "path": downloaded_cv_paths[2],
            "metadata": {
                "user_id": "morgan_lee",
                "document_type": "cv",
                "year": 2025,
            },
        },
        {
            "path": downloaded_cv_paths[3],
            "metadata": {
                "user_id": "casey_jordan",
                "document_type": "cv",
                "year": 2025,
            },
        },
        {
            "path": downloaded_cv_paths[4],
            "metadata": {
                "user_id": "alex_rivera",
                "document_type": "cv",
                "year": 2025,
            },
        },
    ]
)
# Step 2: Query the knowledge base with different filter combinations
# ------------------------------------------------------------------------------

agent = Agent(
    knowledge=knowledge,
    search_knowledge=True,
)

agent.print_response(
    "Tell me about Jordan Mitchell's experience and skills",
    knowledge_filters={"user_id": "jordan_mitchell"},
    markdown=True,
)

```

## Usage

<Steps>
  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno chromadb openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Run the example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/knowledge/filters/vector_dbs/filtering_chroma_db.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/filters/vector_dbs/filtering_chroma_db.py 
      ```
    </CodeGroup>
  </Step>
</Steps>
