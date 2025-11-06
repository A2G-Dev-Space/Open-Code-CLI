# Performance on Agent Response

> Original Document: [Performance on Agent Response](https://docs.agno.com/examples/concepts/evals/performance/performance_simple_response.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.632Z

---

# Performance on Agent Response

> Example showing how to analyze the runtime and memory usage of an Agent's run, given its response.

## Code

```python  theme={null}
"""Run `pip install openai agno memory_profiler` to install dependencies."""

from agno.agent import Agent
from agno.eval.performance import PerformanceEval
from agno.models.openai import OpenAIChat


def run_agent():
    agent = Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        system_message="Be concise, reply with one sentence.",
    )

    response = agent.run("What is the capital of France?")
    print(f"Agent response: {response.content}")

    return response


simple_response_perf = PerformanceEval(
    name="Simple Performance Evaluation",
    func=run_agent,
    num_iterations=1,
    warmup_runs=0,
)

if __name__ == "__main__":
    simple_response_perf.run(print_results=True, print_summary=True)
```
