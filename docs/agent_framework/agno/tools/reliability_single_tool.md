# Single Tool Reliability

> Original Document: [Single Tool Reliability](https://docs.agno.com/examples/concepts/evals/reliability/reliability_single_tool.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.645Z

---

# Single Tool Reliability

> Learn how to evaluate reliability of single tool calls.

This example shows how to evaluate the reliability of a single tool call.

## Code

```python  theme={null}
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
        name="Tool Call Reliability",
        agent_response=response,
        expected_tool_calls=["factorial"],
    )
    result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
    result.assert_passed()


if __name__ == "__main__":
    factorial()
```
