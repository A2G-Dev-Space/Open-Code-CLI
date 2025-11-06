# Iterative Workflow

> Original Document: [Iterative Workflow](https://docs.agno.com/concepts/workflows/workflow-patterns/iterative-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.218Z

---

# Iterative Workflow

> Quality-driven processes requiring repetition until specific conditions are met

**Example Use-Cases**: Quality improvement loops, retry mechanisms, iterative refinement

Iterative workflows provide controlled repetition with deterministic exit conditions, ensuring consistent quality standards.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=edba198de555846a2ea8b2e5b65c6d8e" alt="Workflows loop steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-loop-steps-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=96d954f1d665b4b01e0fb030c0544504 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=f4ce273ba17af6b0b5b417ec2e73385c 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=15eb9ff0487ff79dccaa1a046ad7c32d 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=ac3e8fb6db4326f2e78948c467924f7c 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=45c09671d2bb3190bb14f23ecab28f85 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps-light.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=05a4004d7c8228caefbacbc21a2efd2f 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=30027b401899598a38a73c6038d1d988" alt="Workflows loop steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-loop-steps.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=aa15df4e2e353012150474b5fa26d5c5 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=f411273ea9e60981989e16324940fbc0 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=a71354c338a1520f27797ca6e53dc378 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=cf1495378fc757cd5995b96c734cda71 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=3d32977904938d0cc22407d61c6efd8e 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-loop-steps.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=e3e1c672c2953455defceb971b803bce 2500w" />

## Example

```python iterative_workflow.py theme={null}
from agno.workflow import Loop, Step, Workflow

def quality_check(outputs) -> bool:
    # Return True to break loop, False to continue
    return any(len(output.content) > 500 for output in outputs)

workflow = Workflow(
    name="Quality-Driven Research",
    steps=[
        Loop(
            name="Research Loop",
            steps=[Step(name="Deep Research", agent=researcher)],
            end_condition=quality_check,
            max_iterations=3
        ),
        Step(name="Final Analysis", agent=analyst),
    ]
)

workflow.print_response("Research the impact of renewable energy on global markets", markdown=True)
```

## Developer Resources

* [Loop Steps Workflow](/examples/concepts/workflows/03_workflows_loop_execution/loop_steps_workflow)

## Reference

For complete API documentation, see [Loop Steps Reference](/reference/workflows/loop-steps).
