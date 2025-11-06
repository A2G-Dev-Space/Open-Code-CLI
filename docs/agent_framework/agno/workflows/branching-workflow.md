# Branching Workflow

> Original Document: [Branching Workflow](https://docs.agno.com/concepts/workflows/workflow-patterns/branching-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.204Z

---

# Branching Workflow

> Complex decision trees requiring dynamic path selection based on content analysis

**Example Use-Cases**: Expert routing, content type detection, multi-path processing

Dynamic routing workflows provide intelligent path selection while maintaining predictable execution within each chosen branch.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=11256e6d5ebe78ee137ba56647bb732c" alt="Workflows router steps diagram" data-og-width="2493" width="2493" data-og-height="921" height="921" data-path="images/workflows-router-steps-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=280&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=bbbf338fb349e3d6e9e66f92873ca74b 280w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=560&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=3c341c1b87faa0eca3092ea8f93c5d0b 560w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=840&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=75dabdfd37b0806915bd56520c176d0a 840w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=1100&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=8e91a1cb88327098c3420a0bd4994e69 1100w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=1650&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=e948b1e5b7f48fde2637265f2daef7f5 1650w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps-light.png?w=2500&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=74139a11491c79a755974923831ad406 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=593bc69b1647af6571151c051145e7c6" alt="Workflows router steps diagram" data-og-width="2493" width="2493" data-og-height="921" height="921" data-path="images/workflows-router-steps.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=280&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=575bc73e719bb2ccf703278e5aaaa4b3 280w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=560&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=6886d723d73a9fc1ffec318b2fe33d3c 560w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=840&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=0c364bb81456fc509a64fcac0cb8373a 840w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=1100&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=d9ede7db094389fc173c590ea28aa21c 1100w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=1650&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=117488ab5bcecbf9e982474dd91580e8 1650w, https://mintcdn.com/agno-v2/6A2IKapU7R02zCpZ/images/workflows-router-steps.png?w=2500&fit=max&auto=format&n=6A2IKapU7R02zCpZ&q=85&s=e0f5a19e133076f0ba74ced4f21ba411 2500w" />

## Example

```python branching_workflow.py theme={null}
from agno.workflow import Router, Step, Workflow

def route_by_topic(step_input) -> List[Step]:
    topic = step_input.input.lower()

    if "tech" in topic:
        return [Step(name="Tech Research", agent=tech_expert)]
    elif "business" in topic:
        return [Step(name="Business Research", agent=biz_expert)]
    else:
        return [Step(name="General Research", agent=generalist)]

workflow = Workflow(
    name="Expert Routing",
    steps=[
        Router(
            name="Topic Router",
            selector=route_by_topic,
            choices=[tech_step, business_step, general_step]
        ),
        Step(name="Synthesis", agent=synthesizer),
    ]
)

workflow.print_response("Latest developments in artificial intelligence and machine learning", markdown=True)
```

## Developer Resources

* [Router Steps Workflow](/examples/concepts/workflows/05_workflows_conditional_branching/router_steps_workflow)

## Reference

For complete API documentation, see [Router Steps Reference](/reference/workflows/router-steps).
