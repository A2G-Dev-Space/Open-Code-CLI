# Accuracy with Given Answer

> Original Document: [Accuracy with Given Answer](https://docs.agno.com/examples/concepts/evals/accuracy/accuracy_with_given_answer.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.616Z

---

# Accuracy with Given Answer

> Learn how to evaluate the accuracy of an Agno Agent's response with a given answer.

For this example an agent won't be executed, but the given result will be evaluated against the expected output for correctness.

## Code

```python  theme={null}
from typing import Optional

from agno.eval.accuracy import AccuracyEval, AccuracyResult
from agno.models.openai import OpenAIChat

evaluation = AccuracyEval(
    name="Given Answer Evaluation",
    model=OpenAIChat(id="o4-mini"),
    input="What is 10*5 then to the power of 2? do it step by step",
    expected_output="2500",
)
result_with_given_answer: Optional[AccuracyResult] = evaluation.run_with_output(
    output="2500", print_results=True
)
assert result_with_given_answer is not None and result_with_given_answer.avg_score >= 8
```
