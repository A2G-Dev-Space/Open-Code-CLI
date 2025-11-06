# Async Tools

> Original Document: [Async Tools](https://docs.agno.com/concepts/tools/async-tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:13.882Z

---

# Async Tools

> Learn how to use async tools in Agno.

Agno Agents can execute multiple tools concurrently, allowing you to process function calls that the model makes efficiently. This is especially valuable when the functions involve time-consuming operations. It improves responsiveness and reduces overall execution time.

<Check>
  When you call `arun` or `aprint_response`, your tools will execute concurrently. If you provide synchronous functions as tools, they will execute concurrently on separate threads.
</Check>

## Example

Here is an example:

```python async_tools.py theme={null}
import asyncio
import time

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.utils.log import logger

async def atask1(delay: int):
    """Simulate a task that takes a random amount of time to complete
    Args:
        delay (int): The amount of time to delay the task
    """
    logger.info("Task 1 has started")
    for _ in range(delay):
        await asyncio.sleep(1)
        logger.info("Task 1 has slept for 1s")
    logger.info("Task 1 has completed")
    return f"Task 1 completed in {delay:.2f}s"


async def atask2(delay: int):
    """Simulate a task that takes a random amount of time to complete
    Args:
        delay (int): The amount of time to delay the task
    """
    logger.info("Task 2 has started")
    for _ in range(delay):
        await asyncio.sleep(1)
        logger.info("Task 2 has slept for 1s")
    logger.info("Task 2 has completed")
    return f"Task 2 completed in {delay:.2f}s"


async def atask3(delay: int):
    """Simulate a task that takes a random amount of time to complete
    Args:
        delay (int): The amount of time to delay the task
    """
    logger.info("Task 3 has started")
    for _ in range(delay):
        await asyncio.sleep(1)
        logger.info("Task 3 has slept for 1s")
    logger.info("Task 3 has completed")
    return f"Task 3 completed in {delay:.2f}s"


async_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[atask2, atask1, atask3],
    markdown=True,
)

asyncio.run(
    async_agent.aprint_response("Please run all tasks with a delay of 3s", stream=True)
)
```

Run the Agent:

```bash  theme={null}
pip install -U agno openai

export OPENAI_API_KEY=***

python async_tools.py
```

How to use:

1. Provide your Agent with a list of tools, preferably asynchronous for optimal performance. However, synchronous functions can also be used since they will execute concurrently on separate threads.
2. Run the Agent using either the `arun` or `aprint_response` method, enabling concurrent execution of tool calls.

<Note>
  Concurrent execution of tools requires a model that supports parallel function
  calling. For example, OpenAI models have a `parallel_tool_calls` parameter
  (enabled by default) that allows multiple tool calls to be requested and
  executed simultaneously.
</Note>

In this example, `gpt-5-mini` makes three simultaneous tool calls to `atask1`, `atask2` and `atask3`. Normally these tool calls would execute sequentially, but using the `aprint_response` function, they run concurrently, improving execution time.

<img height="200" src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=4ec6216f4c1dafa6c7a675bd345c6ad2" style={{ borderRadius: "8px" }} data-og-width="344" data-og-height="463" data-path="images/async-tools.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2ef332604d86c02722791a3beffa7589 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=948e641806ce6a2224074a78a5dd9521 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=9bbc9234b871fdec04c5229f69637c4a 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7a8dcfeb62df06475d15981339375437 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7078423de7061f62251c3f6209dbb38e 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/async-tools.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=512ee4e5ccf4e4bfa33edac026b3a472 2500w" />
