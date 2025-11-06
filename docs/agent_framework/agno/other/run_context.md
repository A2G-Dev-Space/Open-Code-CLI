# RunContext

> Original Document: [RunContext](https://docs.agno.com/reference/run/run_context.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.341Z

---

# RunContext

The `RunContext` is an object that can be referenced in pre- and post-hooks, tools, and other parts of the run.

See [Agent State](/concepts/agents/state) for examples of how to use the `RunContext` in your code.

## RunContext Attributes

| Attribute           | Type             | Description                      |
| ------------------- | ---------------- | -------------------------------- |
| `run_id`            | `str`            | Run ID                           |
| `session_id`        | `str`            | Session ID for the run           |
| `user_id`           | `Optional[str]`  | User ID associated with the run  |
| `dependencies`      | `Dict[str, Any]` | Dependencies for the run         |
| `knowledge_filters` | `Dict[str, Any]` | Knowledge filters for the run    |
| `metadata`          | `Dict[str, Any]` | Metadata associated with the run |
| `session_state`     | `Dict[str, Any]` | Session state for the run        |
