# Conditional Workflow

> Original Document: [Conditional Workflow](https://docs.agno.com/concepts/workflows/workflow-patterns/conditional-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.202Z

---

# Conditional Workflow

> Deterministic branching based on input analysis or business rules

**Example Use-Cases**: Content type routing, topic-specific processing, quality-based decisions

Conditional workflows provide predictable branching logic while maintaining deterministic execution paths.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=7bc060741f060c43747d9866246d0587" alt="Workflows condition steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-condition-steps-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=051009cf50418538acbc49a9c690cdf8 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5f8e6a2ed1301cf1d4edda7804c5ec08 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=65a6ba82ef0a22a0927439644a6c7912 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=f5d676c0bf82f2045e61f31126b66a42 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=408f8ed2a78755b289c7a0b4e07d6f0e 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps-light.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=548ca991ffb6e9e5d7669bf37e98fed2 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=de3fa0bc3fc9b4079e7dd3596d6e589a" alt="Workflows condition steps diagram" data-og-width="3441" width="3441" data-og-height="756" height="756" data-path="images/workflows-condition-steps.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=3b0eb6ed78b037dd85346647665f373e 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=9c5e9785043d807c36b6ee130fde63ef 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5044466baae4103aadf462fb81b9be60 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=d67a6cb9bb25245259a4001be56f7d91 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=ff169ab64d750cfb21073305fdedd213 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-condition-steps.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=0f44b53b13a00c51b26314825d605013 2500w" />

## Example

```python conditional_workflow.py theme={null}
from agno.workflow import Condition, Step, Workflow

def is_tech_topic(step_input) -> bool:
    topic = step_input.input.lower()
    return any(keyword in topic for keyword in ["ai", "tech", "software"])

workflow = Workflow(
    name="Conditional Research",
    steps=[
        Condition(
            name="Tech Topic Check",
            evaluator=is_tech_topic,
            steps=[Step(name="Tech Research", agent=tech_researcher)]
        ),
        Step(name="General Analysis", agent=general_analyst),
    ]
)

workflow.print_response("Comprehensive analysis of AI and machine learning trends", markdown=True)
```

## Developer Resources

* [Condition Steps Workflow](/examples/concepts/workflows/02-workflows-conditional-execution/condition_steps_workflow_stream)
* [Condition with List of Steps](/examples/concepts/workflows/02-workflows-conditional-execution/condition_with_list_of_steps)

## Reference

For complete API documentation, see [Condition Steps Reference](/reference/workflows/conditional-steps).
