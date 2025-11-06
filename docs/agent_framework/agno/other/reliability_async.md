# Async Reliability Evaluation

> Original Document: [Async Reliability Evaluation](https://docs.agno.com/examples/concepts/evals/reliability/reliability_async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.649Z

---

# Async Reliability Evaluation

> Learn how to run reliability evaluations asynchronously.

This example shows how to run a Reliability evaluation asynchronously.

## Code

```python  theme={null}
"""This example shows how to run a Reliability evaluation asynchronously."""

import asyncio
from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.agent import RunOutput
from agno.tools.calculator import CalculatorTools


def factorial():
    agent = Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        tools=[CalculatorTools()],
    )
    response: RunOutput = agent.run("What is 10!?")
    evaluation = ReliabilityEval(
        agent_response=response,
        expected_tool_calls=["factorial"],
    )

    # Run the evaluation calling the arun method.
    result: Optional[ReliabilityResult] = asyncio.run(
        evaluation.arun(print_results=True)
    )
    if result:
        result.assert_passed()


if __name__ == "__main__":
    factorial()
```
