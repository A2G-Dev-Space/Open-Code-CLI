# Loop Steps

> Original Document: [Loop Steps](https://docs.agno.com/reference/workflows/loop-steps.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:17.341Z

---

# Loop Steps

| Parameter        | Type                                                                                                 | Default  | Description                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------- |
| `steps`          | `WorkflowSteps`                                                                                      | Required | Steps to execute in each loop iteration     |
| `name`           | `Optional[str]`                                                                                      | `None`   | Name of the loop step                       |
| `description`    | `Optional[str]`                                                                                      | `None`   | Description of the loop step                |
| `max_iterations` | `int`                                                                                                | `3`      | Maximum number of iterations for the loop   |
| `end_condition`  | `Optional[Union[Callable[[List[StepOutput]], bool], Callable[[List[StepOutput]], Awaitable[bool]]]]` | `None`   | Function to evaluate if the loop should end |
