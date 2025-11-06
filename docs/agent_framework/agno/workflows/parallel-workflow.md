# Parallel Workflow

> Original Document: [Parallel Workflow](https://docs.agno.com/concepts/workflows/workflow-patterns/parallel-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.226Z

---

# Parallel Workflow

> Independent, concurrent tasks that can execute simultaneously for improved efficiency

**Example Use-Cases**: Multi-source research, parallel analysis, concurrent data processing

Parallel workflows maintain deterministic results while dramatically reducing execution time for independent operations.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=afda5268ab0637c6064ace8edd6f35e5" alt="Workflows parallel steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-parallel-steps-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c153b9934fa98b2b886a9435022b020a 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=17253f58b485bb6180827516f7f947be 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=b067f30b291f2de8cb6a04e208ee61cc 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=a814e829581fb1d7c64e49fa87ca847e 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=1cd456c3e949af82fd6325b3f3865f23 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps-light.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=52fcc51f72ee6e1df2648612451cae70 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=ec4f6c7c9a6ef76cec8f0866eb1acc5b" alt="Workflows parallel steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-parallel-steps.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=39624cca7177ba0064491bb64c645db2 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c3e5cde671f164b7dd13eb417f5f74db 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=db6672401fdf35e0eb616e72016ec41c 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=831053d087a3bf26e966f8f896ac9b61 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=445e07ea13a74913e67e2a2a9c8e9c5f 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-parallel-steps.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=77083544c8387f660207dfaf645bdaf0 2500w" />

## Example

```python parallel_workflow.py theme={null}
from agno.workflow import Parallel, Step, Workflow

workflow = Workflow(
    name="Parallel Research Pipeline",
    steps=[
        Parallel(
            Step(name="HackerNews Research", agent=hn_researcher),
            Step(name="Web Research", agent=web_researcher),
            Step(name="Academic Research", agent=academic_researcher),
            name="Research Step"
        ),
        Step(name="Synthesis", agent=synthesizer),  # Combines the results and produces a report
    ]
)

workflow.print_response("Write about the latest AI developments", markdown=True)
```

## Developer Resources

* [Parallel Steps Workflow](/examples/concepts/workflows/04-workflows-parallel-execution/parallel_steps_workflow)

## Reference

For complete API documentation, see [Parallel Steps Reference](/reference/workflows/parallel-steps).
