# Router Steps

> Original Document: [Router Steps](https://docs.agno.com/reference/workflows/router-steps.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:17.362Z

---

# Router Steps

| Parameter     | Type                                                                                                                                                   | Default  | Description                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------- |
| `selector`    | `Union[Callable[[StepInput], Union[WorkflowSteps, List[WorkflowSteps]]], Callable[[StepInput], Awaitable[Union[WorkflowSteps, List[WorkflowSteps]]]]]` | Required | Function to select steps dynamically (supports both sync and async functions) |
| `choices`     | `WorkflowSteps`                                                                                                                                        | Required | Available steps for selection                                                 |
| `name`        | `Optional[str]`                                                                                                                                        | `None`   | Name of the router step                                                       |
| `description` | `Optional[str]`                                                                                                                                        | `None`   | Description of the router step                                                |
