# ClickUp

> Original Document: [ClickUp](https://docs.agno.com/concepts/tools/toolkits/others/clickup.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:13.965Z

---

# ClickUp

> ClickUpTools enables agents to interact with ClickUp workspaces for project management and task organization.

## Example

The following agent can manage ClickUp tasks and projects:

```python  theme={null}
from agno.agent import Agent
from agno.tools.clickup import ClickUpTools

agent = Agent(
    instructions=[
        "You are a ClickUp project management assistant",
        "Help users manage their tasks, projects, and workspaces",
        "Create, update, and organize tasks efficiently",
        "Provide clear status updates on task operations",
    ],
    tools=[ClickUpTools()],
)

agent.print_response("Create a new task called 'Review documentation' in the todo list", stream=True)
```

## Toolkit Params

| Parameter         | Type            | Default | Description                                                 |
| ----------------- | --------------- | ------- | ----------------------------------------------------------- |
| `api_key`         | `Optional[str]` | `None`  | ClickUp API key. Uses CLICKUP\_API\_KEY if not set.         |
| `master_space_id` | `Optional[str]` | `None`  | Default space ID to use. Uses MASTER\_SPACE\_ID if not set. |

## Toolkit Functions

| Function      | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `list_tasks`  | List tasks with optional filtering by status, assignee, etc. |
| `create_task` | Create a new task in a specified list.                       |
| `get_task`    | Get detailed information about a specific task.              |
| `update_task` | Update an existing task's properties.                        |
| `delete_task` | Delete a task from ClickUp.                                  |
| `list_spaces` | List all spaces accessible to the user.                      |
| `list_lists`  | List all lists within a space or folder.                     |

You can use `include_tools` or `exclude_tools` to modify the list of tools the agent has access to. Learn more about [selecting tools](/concepts/tools/selecting-tools).

## Developer Resources

* View [Tools Source](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/clickup.py)
* [ClickUp API Documentation](https://clickup.com/api/)
