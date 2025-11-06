# Building Workflows

> Original Document: [Building Workflows](https://docs.agno.com/concepts/workflows/building-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.199Z

---

# Building Workflows

> Learn how to build your workflows.

Workflows are a powerful way to orchestrate your agents and teams. They are a series of steps that are executed in a flow that you control.

## Building Blocks

1. The **`Workflow`** class is the top-level orchestrator that manages the entire execution process.
2. **`Step`** is the fundamental unit of work in the workflow system. Each step encapsulates exactly one `executor` - either an `Agent`, a `Team`, or a custom Python function. This design ensures clarity and maintainability while preserving the individual characteristics of each executor.
3. **`Loop`** is a construct that allows you to execute one or more steps multiple times. This is useful when you need to repeat a set of steps until a certain condition is met.
4. **`Parallel`** is a construct that allows you to execute one or more steps in parallel. This is useful when you need to execute a set of steps concurrently with the outputs joined together.
5. **`Condition`** makes a step conditional based on criteria you specify.
6. **`Router`** allows you to specify which step(s) to execute next, effectively creating branching logic in your workflow.

<Note>
  When using a custom Python function as an executor for a step, `StepInput` and
  `StepOutput` provides standardized interfaces for data flow between steps:
</Note>

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=25129f55e1ead21d513c25b51dca412d" alt="Workflows step IO flow diagram" data-og-width="2001" width="2001" data-og-height="756" height="756" data-path="images/workflows-step-io-flow-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=280&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=67a933194ccf6f39606314d48784927f 280w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=560&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=3edc1003ffbee7b7767b1a84720bc616 560w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=840&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=cd83f97d789ba6e0a1980e8d25759281 840w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=1100&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=f018b152972888a037a239342bde7602 1100w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=1650&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=bd9ba2232ddd6801f4ece40477975608 1650w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow-light.png?w=2500&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=383ce2bcd2751e0b47a1304f797cf2d0 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=faa43206bfa64265fa4d32721a12216d" alt="Workflows step IO flow diagram" data-og-width="2001" width="2001" data-og-height="756" height="756" data-path="images/workflows-step-io-flow.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=280&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=50c47b8c564021b246ba034bc331c982 280w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=560&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=430d80604ed6927b914c7e9c1fcf8aa6 560w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=840&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=60dfe1d25956d8895f87b215607466cf 840w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=1100&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=8ac4c55ff3bb0c2f17baf76f0bae48a8 1100w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=1650&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=1c4237aa3bf8581c52b97f51f0b524e5 1650w, https://mintcdn.com/agno-v2/ZJv0T4EM1rVInAsr/images/workflows-step-io-flow.png?w=2500&fit=max&auto=format&n=ZJv0T4EM1rVInAsr&q=85&s=9ae7ba15375a9bb435b1765646047770 2500w" />

## How to make your first workflow?

There are different types of patterns you can use to build your workflows.
For example you can combine agents, teams, and functions to build a workflow.

```python  theme={null}
from agno.workflow import Step, Workflow, StepOutput

def data_preprocessor(step_input):
    # Custom preprocessing logic

    # Or you can also run any agent/team over here itself
    # response = some_agent.run(...)
    return StepOutput(content=f"Processed: {step_input.input}") # <-- Now pass the agent/team response in content here

workflow = Workflow(
    name="Mixed Execution Pipeline",
    steps=[
        research_team,      # Team
        data_preprocessor,  # Function
        content_agent,      # Agent
    ]
)

workflow.print_response("Analyze the competitive landscape for fintech startups", markdown=True)
```
