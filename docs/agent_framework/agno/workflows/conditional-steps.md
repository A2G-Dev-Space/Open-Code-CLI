# Conditional Steps

> Original Document: [Conditional Steps](https://docs.agno.com/reference/workflows/conditional-steps.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:17.345Z

---

# Conditional Steps

| Parameter     | Type                                                                               | Default  | Description                                   |
| ------------- | ---------------------------------------------------------------------------------- | -------- | --------------------------------------------- |
| `evaluator`   | `Union[Callable[[StepInput], bool], Callable[[StepInput], Awaitable[bool]], bool]` | Required | Function or boolean to evaluate the condition |
| `steps`       | `WorkflowSteps`                                                                    | Required | Steps to execute if the condition is met      |
| `name`        | `Optional[str]`                                                                    | `None`   | Name of the condition step                    |
| `description` | `Optional[str]`                                                                    | `None`   | Description of the condition step             |
