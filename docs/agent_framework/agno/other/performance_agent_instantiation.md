# Performance on Agent Instantiation

> Original Document: [Performance on Agent Instantiation](https://docs.agno.com/examples/concepts/evals/performance/performance_agent_instantiation.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.626Z

---

# Performance on Agent Instantiation

> Evaluation to analyze the runtime and memory usage of an Agent.

## Code

```python  theme={null}
"""Run `pip install agno openai` to install dependencies."""

from agno.agent import Agent
from agno.eval.performance import PerformanceEval


def instantiate_agent():
    return Agent(system_message="Be concise, reply with one sentence.")


instantiation_perf = PerformanceEval(
    name="Instantiation Performance", func=instantiate_agent, num_iterations=1000
)

if __name__ == "__main__":
    instantiation_perf.run(print_results=True, print_summary=True)
```
