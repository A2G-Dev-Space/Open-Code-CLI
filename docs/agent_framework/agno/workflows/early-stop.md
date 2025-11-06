# Early Stopping

> Original Document: [Early Stopping](https://docs.agno.com/concepts/workflows/early-stop.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.189Z

---

# Early Stopping

> How to early stop workflows

Workflows support early termination when specific conditions are met, preventing unnecessary processing and implementing safety gates. Any step can trigger early termination by returning `StepOutput(stop=True)`, immediately halting the entire workflow execution.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=8d2d411a2853e475b18e4a195a9d65df" alt="Workflows early stop diagram" data-og-width="7281" width="7281" data-og-height="1179" height="1179" data-path="images/workflows-early-stop-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c0dcd798df8113cf9c146b8d6946f2e4 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=230326e06f4d0d607e4fff253910b7d0 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=7ea8b5e50c4303af888b0bab7fcdb6f9 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=28702a9fcd250dd3f678f84b40b4f207 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=9cddb518531d6dc748a4d7a9da2308a4 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop-light.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=1c1b977a426432c9e08df94a524a4d2f 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=6c2609a237ba9a60fde24fb6ef3c25dc" alt="Workflows early stop diagram" data-og-width="7281" width="7281" data-og-height="1179" height="1179" data-path="images/workflows-early-stop.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=8ab6aca3447a781d230858aefc525613 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5ad070c303d4203799af900d5bf15dae 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c29866bad79a0fa0215962c59605e93f 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5b498d3d0faacc133474650fb236e29a 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=8b8e0f5a7070635380fdf23217e5fda3 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-early-stop.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=97cf31c8418685c1b28185e594c11e44 2500w" />

## Example

```python  theme={null}
from agno.workflow import Step, Workflow, StepInput, StepOutput

def security_gate(step_input: StepInput) -> StepOutput:
    """Security gate that stops deployment if vulnerabilities found"""
    security_result = step_input.previous_step_content or ""
    
    if "VULNERABLE" in security_result.upper():
        return StepOutput(
            content="🚨 SECURITY ALERT: Critical vulnerabilities detected. Deployment blocked.",
            stop=True  # Stop the entire workflow
        )
    else:
        return StepOutput(
            content="✅ Security check passed. Proceeding with deployment...",
            stop=False
        )

# Secure deployment pipeline
workflow = Workflow(
    name="Secure Deployment Pipeline",
    steps=[
        Step(name="Security Scan", agent=security_scanner),
        Step(name="Security Gate", executor=security_gate),  # May stop here
        Step(name="Deploy Code", agent=code_deployer),       # Only if secure
        Step(name="Setup Monitoring", agent=monitoring_agent), # Only if deployed
    ]
)

# Test with vulnerable code - workflow stops at security gate
workflow.print_response("Scan this code: exec(input('Enter command: '))")
```

## Developer Resources

* [Early Stop Workflow](/examples/concepts/workflows/06_workflows_advanced_concepts/early_stop_workflow)
