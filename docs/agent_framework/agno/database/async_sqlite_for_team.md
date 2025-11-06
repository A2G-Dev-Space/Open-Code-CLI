# Async Sqlite for Team

> Original Document: [Async Sqlite for Team](https://docs.agno.com/examples/concepts/db/sqlite/async_sqlite_for_team.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.609Z

---

# Async Sqlite for Team

Agno supports using Sqlite asynchronously as a storage backend for Teams, with the `AsyncSqliteDb` class.

## Usage

You need to provide either `db_url`, `db_file` or `db_engine`. The following example uses `db_file`.

```python async_sqlite_for_team.py theme={null}
"""
Run: `pip install openai ddgs newspaper4k lxml_html_clean agno sqlalchemy aiosqlite` to install the dependencies
"""
import asyncio
from typing import List

from agno.agent import Agent
from agno.db.sqlite import AsyncSqliteDb
from agno.models.openai import OpenAIChat
from agno.team import Team
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.hackernews import HackerNewsTools
from pydantic import BaseModel

# Initialize AsyncSqliteDb with a database file
db = AsyncSqliteDb(db_file="team_storage.db")


class Article(BaseModel):
    title: str
    summary: str
    reference_links: List[str]


hn_researcher = Agent(
    name="HackerNews Researcher",
    model=OpenAIChat("gpt-4o"),
    role="Gets top stories from hackernews.",
    tools=[HackerNewsTools()],
)

web_searcher = Agent(
    name="Web Searcher",
    model=OpenAIChat("gpt-4o"),
    role="Searches the web for information on a topic",
    tools=[DuckDuckGoTools()],
    add_datetime_to_context=True,
)


hn_team = Team(
    name="HackerNews Team",
    model=OpenAIChat("gpt-4o"),
    members=[hn_researcher, web_searcher],
    db=db,
    instructions=[
        "First, search hackernews for what the user is asking about.",
        "Then, ask the web searcher to search for each story to get more information.",
        "Finally, provide a thoughtful and engaging summary.",
    ],
    output_schema=Article,
    markdown=True,
    show_members_responses=True,
)

asyncio.run(
    hn_team.aprint_response("Write an article about the top 2 stories on hackernews")
)
```

## Params

<Snippet file="db-async-sqlite-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/blob/main/cookbook/db/sqlite/async_sqlite/async_sqlite_for_team.py)
