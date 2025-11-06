# Prompt Caching

> Original Document: [Prompt Caching](https://docs.agno.com/examples/models/anthropic/prompt_caching.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.348Z

---

# Prompt Caching

> Learn how to use prompt caching with Anthropic models and Agno.

Prompt caching can help reducing processing time and costs. Consider it if you are using the same prompt multiple times in any flow.

You can read more about prompt caching with Anthropic models [here](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching).

## Usage

To use prompt caching in your Agno setup, pass the `cache_system_prompt` argument when initializing the `Claude` model:

```python  theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude

agent = Agent(
    model=Claude(
        id="claude-3-5-sonnet-20241022",
        cache_system_prompt=True,
    ),
)
```

Notice that for prompt caching to work, the prompt needs to be of a certain length. You can read more about this on Anthropic's [docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#cache-limitations).

## Extended cache

You can also use Anthropic's extended cache beta feature. This updates the cache duration from 5 minutes to 1 hour. To activate it, pass the `extended_cache_time` argument and the following beta header:

```python  theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude

agent = Agent(
    model=Claude(
        id="claude-3-5-sonnet-20241022",
        default_headers={"anthropic-beta": "extended-cache-ttl-2025-04-11"},
        cache_system_prompt=True,
        extended_cache_time=True,
    ),
)
```

## Working example

```python cookbook/models/anthropic/prompt_caching_extended.py theme={null}
from pathlib import Path
from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.utils.media import download_file

# Load an example large system message from S3. A large prompt like this would benefit from caching.
txt_path = Path(__file__).parent.joinpath("system_prompt.txt")
download_file(
    "https://agno-public.s3.amazonaws.com/prompts/system_promt.txt",
    str(txt_path),
)
system_message = txt_path.read_text()

agent = Agent(
    model=Claude(
        id="claude-sonnet-4-20250514",
        cache_system_prompt=True,  # Activate prompt caching for Anthropic to cache the system prompt
    ),
    system_message=system_message,
    markdown=True,
)

# First run - this will create the cache
response = agent.run(
    "Explain the difference between REST and GraphQL APIs with examples"
)
if response and response.metrics:
    print(f"First run cache write tokens = {response.metrics.cache_write_tokens}")

# Second run - this will use the cached system prompt
response = agent.run(
    "What are the key principles of clean code and how do I apply them in Python?"
)
if response and response.metrics:
    print(f"Second run cache read tokens = {response.metrics.cache_read_tokens}")
```
