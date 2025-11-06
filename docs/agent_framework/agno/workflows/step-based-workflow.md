# Step-Based Workflows

> Original Document: [Step-Based Workflows](https://docs.agno.com/concepts/workflows/workflow-patterns/step-based-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.222Z

---

# Step-Based Workflows

> Named steps for better logging and support on the AgentOS chat page

**You can name your steps** for better logging and future support on the Agno platform.
This also changes the name of a step when accessing that step's output inside a `StepInput` object.

## Example

```python  theme={null}
from agno.workflow import Step, Workflow

# Named steps for better tracking
workflow = Workflow(
    name="Content Creation Pipeline",
    steps=[
        Step(name="Research Phase", team=researcher),
        Step(name="Analysis Phase", executor=custom_function),
        Step(name="Writing Phase", agent=writer),
    ]
)

workflow.print_response(
    "AI trends in 2024",
    markdown=True,
)
```

## Developer Resources

* [Sequence of Steps](/examples/concepts/workflows/01-basic-workflows/sequence_of_steps)
* [Step with a Custom Function](/examples/concepts/workflows/01-basic-workflows/step_with_function)

## Reference

For complete API documentation, see [Step Reference](/reference/workflows/step).
