# Field Labeled CSV Reader

> Original Document: [Field Labeled CSV Reader](https://docs.agno.com/examples/concepts/knowledge/readers/field-labeled-csv/field-labeled-csv-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.774Z

---

# Field Labeled CSV Reader

The **Field Labeled CSV Reader** converts CSV rows into field-labeled text documents, making them more readable for natural language processing and agent-based retrieval systems.

## Code

```python cookbook/knowledge/readers/csv_field_labeled_reader.py theme={null}
from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.knowledge.reader.field_labeled_csv_reader import FieldLabeledCSVReader
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

reader = FieldLabeledCSVReader(
    chunk_title="🎬 Movie Information",
    field_names=[
        "Movie Rank",
        "Movie Title",
        "Genre",
        "Description",
        "Director",
        "Actors",
        "Year",
        "Runtime (Minutes)",
        "Rating",
        "Votes",
        "Revenue (Millions)",
        "Metascore",
    ],
    format_headers=True,
    skip_empty_fields=True,
)

knowledge_base = Knowledge(
    vector_db=PgVector(
        table_name="imdb_movies_field_labeled_readr",
        db_url=db_url,
    ),
)

knowledge_base.add_content(
    url="https://agno-public.s3.amazonaws.com/demo_data/IMDB-Movie-Data.csv",
    reader=reader,
)

agent = Agent(
    knowledge=knowledge_base,
    search_knowledge=True,
    instructions=[
        "You are a movie expert assistant.",
        "Use the search_knowledge_base tool to find detailed information about movies.",
        "The movie data is formatted in a field-labeled, human-readable way with clear field labels.",
        "Each movie entry starts with '🎬 Movie Information' followed by labeled fields.",
        "Provide comprehensive answers based on the movie information available.",
    ],
)

agent.print_response(
    "which movies are directed by Christopher Nolan", markdown=True, stream=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno aiofiles sqlalchemy psycopg[binary] pgvector openai
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
      python cookbook/knowledge/readers/csv_field_labeled_reader.py
      ```

      ```bash Windows theme={null}
      python cookbook/knowledge/readers/csv_field_labeled_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="field-labeled-csv-reader-reference.mdx" />
