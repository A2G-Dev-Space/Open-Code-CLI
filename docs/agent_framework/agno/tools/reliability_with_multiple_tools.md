# Reliability with Multiple Tools

> Original Document: [Reliability with Multiple Tools](https://docs.agno.com/examples/concepts/evals/reliability/reliability_with_multiple_tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.651Z

---

# Reliability with Multiple Tools

> Learn how to assert an Agno Agent is making multiple expected tool calls.

## Code

```python  theme={null}
from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.agent import RunOutput
from agno.tools.calculator import CalculatorTools


def multiply_and_exponentiate():
    agent = Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        tools=[CalculatorTools(add=True, multiply=True, exponentiate=True)],
    )
    response: RunOutput = agent.run(
        "What is 10*5 then to the power of 2? do it step by step"
    )
    evaluation = ReliabilityEval(
        name="Tool Calls Reliability",
        agent_response=response,
        expected_tool_calls=["multiply", "exponentiate"],
    )
    result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
    if result:
        result.assert_passed()


if __name__ == "__main__":
    multiply_and_exponentiate()
```
