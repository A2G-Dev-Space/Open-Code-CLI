# Accuracy with Tools

> Original Document: [Accuracy with Tools](https://docs.agno.com/examples/concepts/evals/accuracy/accuracy_with_tools.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.623Z

---

# Accuracy with Tools

> Learn how to evaluate the accuracy of an Agent that is using tools.

This example shows an evaluation that runs the provided agent with the provided input and then evaluates the answer that the agent gives.

## Code

```python  theme={null}
from typing import Optional

from agno.agent import Agent
from agno.eval.accuracy import AccuracyEval, AccuracyResult
from agno.models.openai import OpenAIChat
from agno.tools.calculator import CalculatorTools

evaluation = AccuracyEval(
    name="Tools Evaluation",
    model=OpenAIChat(id="o4-mini"),
    agent=Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        tools=[CalculatorTools()],
    ),
    input="What is 10!?",
    expected_output="3628800",
)

result: Optional[AccuracyResult] = evaluation.run(print_results=True)
assert result is not None and result.avg_score >= 8
```
