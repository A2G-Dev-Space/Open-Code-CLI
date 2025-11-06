# Async Performance Evaluation

> Original Document: [Async Performance Evaluation](https://docs.agno.com/examples/concepts/evals/performance/performance_async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.626Z

---

# Async Performance Evaluation

> Learn how to run performance evaluations on async functions.

This example shows how to run a Performance evaluation on an async function.

## Code

```python  theme={null}
"""This example shows how to run a Performance evaluation on an async function."""

import asyncio

from agno.agent import Agent
from agno.eval.performance import PerformanceEval
from agno.models.openai import OpenAIChat


# Simple async function to run an Agent.
async def arun_agent():
    agent = Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        system_message="Be concise, reply with one sentence.",
    )
    response = await agent.arun("What is the capital of France?")
    return response


performance_eval = PerformanceEval(func=arun_agent, num_iterations=10)

# Because we are evaluating an async function, we use the arun method.
asyncio.run(performance_eval.arun(print_summary=True, print_results=True))
```
