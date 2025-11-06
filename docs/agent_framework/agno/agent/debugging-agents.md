# Debugging Agents

> Original Document: [Debugging Agents](https://docs.agno.com/concepts/agents/debugging-agents.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.544Z

---

# Debugging Agents

> Learn how to debug Agno Agents.

Agno comes with a exceptionally well-built debug mode that takes your development experience to the next level. It helps you understand the flow of execution and the intermediate steps. For example:

1. Inspect the messages sent to the model and the response it generates.
2. Trace intermediate steps and monitor metrics like token usage, execution time, etc.
3. Inspect tool calls, errors, and their results.

## Debug Mode

To enable debug mode:

1. Set the `debug_mode` parameter on your agent, to enable it for all runs.
2. Set the `debug_mode` parameter on the `run` method, to enable it for the current run.
3. Set the `AGNO_DEBUG` environment variable to `True`, to enable debug mode for all agents.

```python  theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.tools.hackernews import HackerNewsTools

agent = Agent(
    model=Claude(id="claude-sonnet-4-5"),
    tools=[HackerNewsTools()],
    instructions="Write a report on the topic. Output only the report.",
    markdown=True,
    debug_mode=True,
    # debug_level=2, # Uncomment to get more detailed logs
)

# Run agent and print response to the terminal
agent.print_response("Trending startups and products.")
```

<Tip>
  You can set `debug_level=2` to get even more detailed logs.
</Tip>

Here's how it looks:

<Frame>
  <video autoPlay muted loop playsInline style={{ borderRadius: "0.5rem", width: "100%", height: "auto" }}>
    <source src="https://mintcdn.com/agno-v2/Xc0-_OHxxYe_vtGw/videos/debug_mode.mp4?fit=max&auto=format&n=Xc0-_OHxxYe_vtGw&q=85&s=67b080deec475663e285c22130987541" type="video/mp4" data-path="videos/debug_mode.mp4" />
  </video>
</Frame>

## Interactive CLI

Agno also comes with a pre-built interactive CLI that runs your Agent as a command-line application. You can use this to test back-and-forth conversations with your agent.

```python  theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.anthropic import Claude
from agno.tools.hackernews import HackerNewsTools

agent = Agent(
    model=Claude(id="claude-sonnet-4-5"),
    tools=[HackerNewsTools()],
    db=SqliteDb(db_file="tmp/data.db"),
    add_history_to_context=True,
    num_history_runs=3,
    markdown=True,
)

# Run agent as an interactive CLI app
agent.cli_app(stream=True)
```
