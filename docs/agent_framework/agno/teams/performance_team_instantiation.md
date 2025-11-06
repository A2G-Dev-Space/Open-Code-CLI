# Performance with Teams

> Original Document: [Performance with Teams](https://docs.agno.com/examples/concepts/evals/performance/performance_team_instantiation.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:14.643Z

---

# Performance with Teams

> Learn how to analyze the runtime and memory usage of an Agno Team.

## Code

```python  theme={null}
"""Run `pip install agno openai` to install dependencies."""

from agno.agent import Agent
from agno.eval.performance import PerformanceEval
from agno.models.openai import OpenAIChat
from agno.team.team import Team

team_member = Agent(model=OpenAIChat(id="gpt-5-mini"))


def instantiate_team():
    return Team(members=[team_member])


instantiation_perf = PerformanceEval(
    name="Instantiation Performance Team", func=instantiate_team, num_iterations=1000
)

if __name__ == "__main__":
    instantiation_perf.run(print_results=True, print_summary=True)
```
