# Async Data Analyst Agent with DuckDB

> Original Document: [Async Data Analyst Agent with DuckDB](https://docs.agno.com/examples/concepts/agent/async/data_analyst.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.280Z

---

# Async Data Analyst Agent with DuckDB

This example demonstrates how to create an asynchronous data analyst agent that can analyze movie data using DuckDB tools and provide insights about movie ratings.

## Code

```python data_analyst.py theme={null}
"""Run `pip install duckdb` to install dependencies."""

import asyncio
from textwrap import dedent

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckdb import DuckDbTools

duckdb_tools = DuckDbTools(
    create_tables=False, export_tables=False, summarize_tables=False
)
duckdb_tools.create_table_from_path(
    path="https://agno-public.s3.amazonaws.com/demo_data/IMDB-Movie-Data.csv",
    table="movies",
)

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[duckdb_tools],
    markdown=True,
    additional_context=dedent("""\
    You have access to the following tables:
    - movies: contains information about movies from IMDB.
    """),
)
asyncio.run(agent.aprint_response("What is the average rating of movies?"))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai duckdb
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
    touch data_analyst.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python data_analyst.py
      ```

      ```bash Windows theme={null}
      python data_analyst.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/async" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
