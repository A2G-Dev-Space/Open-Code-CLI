# Fully Python Workflow

> Original Document: [Fully Python Workflow](https://docs.agno.com/concepts/workflows/workflow-patterns/fully-python-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.210Z

---

# Fully Python Workflow

> Keep it Simple with Pure Python, in v1 workflows style

**Keep it Simple with Pure Python**: If you prefer the Workflows 1.0 approach or need maximum flexibility, you can still use a single Python function to handle everything.
This approach gives you complete control over the execution flow while still benefiting from workflow features like storage, streaming, and session management.

Replace all the steps in the workflow with a single executable function where you can control everything.

```python fully_python_workflow.py theme={null}
from agno.workflow import Workflow, WorkflowExecutionInput

def custom_workflow_function(workflow: Workflow, execution_input: WorkflowExecutionInput):
    # Custom orchestration logic
    research_result = research_team.run(execution_input.message)
    analysis_result = analysis_agent.run(research_result.content)
    return f"Final: {analysis_result.content}"

workflow = Workflow(
    name="Function-Based Workflow",
    steps=custom_workflow_function  # Single function replaces all steps
)

workflow.print_response("Evaluate the market potential for quantum computing applications", markdown=True)
```

**See Example**:

* [Function-Based Workflow](/examples/concepts/workflows/01-basic-workflows/function_instead_of_steps) - Complete function-based workflow

For migration from 1.0 style workflows, refer to the page for [Migrating to Workflows 2.0](/how-to/v2-migration)
