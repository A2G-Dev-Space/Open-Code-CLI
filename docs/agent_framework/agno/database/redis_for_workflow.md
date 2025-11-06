# Redis for Workflows

> Original Document: [Redis for Workflows](https://docs.agno.com/examples/concepts/db/redis/redis_for_workflow.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.586Z

---

# Redis for Workflows

Agno supports using Redis as a storage backend for Workflows using the `RedisDb` class.

## Usage

### Run Redis

Install [docker desktop](https://docs.docker.com/desktop/install/mac-install/) and run **Redis** on port **6379** using:

```bash  theme={null}
docker run --name my-redis -p 6379:6379 -d redis
```

```python redis_for_workflow.py theme={null}
"""
Run: `pip install openai httpx newspaper4k redis agno` to install the dependencies
"""
from agno.agent import Agent
from agno.db.redis import RedisDb
from agno.models.openai import OpenAIChat
from agno.team import Team
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.hackernews import HackerNewsTools
from agno.workflow.step import Step
from agno.workflow.workflow import Workflow

# Define agents
hackernews_agent = Agent(
    name="Hackernews Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[HackerNewsTools()],
    role="Extract key insights and content from Hackernews posts",
)
web_agent = Agent(
    name="Web Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    role="Search the web for the latest news and trends",
)

# Define research team for complex analysis
research_team = Team(
    name="Research Team",
    members=[hackernews_agent, web_agent],
    instructions="Research tech topics from Hackernews and the web",
)

content_planner = Agent(
    name="Content Planner",
    model=OpenAIChat(id="gpt-5-mini"),
    instructions=[
        "Plan a content schedule over 4 weeks for the provided topic and research content",
        "Ensure that I have posts for 3 posts per week",
    ],
)

# Define steps
research_step = Step(
    name="Research Step",
    team=research_team,
)

content_planning_step = Step(
    name="Content Planning Step",
    agent=content_planner,
)

# Create and use workflow
if __name__ == "__main__":
    content_creation_workflow = Workflow(
        name="Content Creation Workflow",
        description="Automated content creation from blog posts to social media",
        db=RedisDb(
            session_table="workflow_session",
            db_url="redis://localhost:6379",
        ),
        steps=[research_step, content_planning_step],
    )
    content_creation_workflow.print_response(
        input="AI trends in 2024",
        markdown=True,
    )

```

## Params

<Snippet file="db-redis-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/redis/redis_for_workflow.py)
