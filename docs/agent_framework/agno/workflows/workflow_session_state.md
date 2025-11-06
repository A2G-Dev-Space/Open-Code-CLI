# How does shared state work between workflows, teams and agents?

> Original Document: [How does shared state work between workflows, teams and agents?](https://docs.agno.com/concepts/workflows/workflow_session_state.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.233Z

---

# How does shared state work between workflows, teams and agents?

> Learn to handle shared state between the different components of a Workflow.

Workflow session state enables sharing and updating state data across all components within a workflow: agents, teams, and custom functions.

Session state data will be persisted if a database is available, and loaded from there in subsequent runs of the workflow.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=eb9f2f37de2699763ae1cab8b26e5792" alt="Workflows session state diagram" data-og-width="2199" width="2199" data-og-height="1203" height="1203" data-path="images/workflows-session-state-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=be8235601f44c3d5c899e769bd7e10a7 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c54d2a340511cf08b6f62ee2dc725ab6 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=a8704d97da7f5fd6490acd6e9e847f21 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=88b25555c12572fbb92d1b7724e77cc6 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=e0c24367b61326e2115cfa74059d1316 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state-light.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=c5d4f68f953670a714b4a5d334f9b5fb 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5e56bc8354bbb79f31d6c4140e5dea2e" alt="Workflows session state diagram" data-og-width="2199" width="2199" data-og-height="1203" height="1203" data-path="images/workflows-session-state.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=280&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=494e73f94a71a1611b068a2561ed6c7a 280w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=560&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=3c754db0830ab28e7640f553c9dd93a9 560w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=840&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=fa17e5cf5ebf2d45a85a328abbd52bf7 840w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=1100&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=e82eae67add368163f04fcb09dab4271 1100w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=1650&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=d66bd915da648ef787dd86aa2a5eede6 1650w, https://mintcdn.com/agno-v2/JYIBgMrzFEujZh3_/images/workflows-session-state.png?w=2500&fit=max&auto=format&n=JYIBgMrzFEujZh3_&q=85&s=5bf1239ad621457d50d67b28153b9a1b 2500w" />

## How Workflow Session State Works

### 1. State Initialization

Initialize session state when creating a workflow. The session state can start empty or with predefined data that all workflow components can access and modify.

```python  theme={null}
shopping_workflow = Workflow(
    name="Shopping List Workflow",
    steps=[manage_items_step, view_list_step],
    session_state={"shopping_list": []},  # Initialize with structured data
)
```

### 2. Access and Modify State Data

All workflow components - agents, teams, and functions - can read from and write to the shared session state. This enables persistent data flow and coordination across the entire workflow execution.

From tools, you can access the session state via `run_context.session_state`.

**Example: Shopping List Management**

```python  theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai.chat import OpenAIChat
from agno.workflow.step import Step
from agno.workflow.workflow import Workflow
from agno.run import RunContext

db = SqliteDb(db_file="tmp/workflow.db")


# Define tools to manage a shopping list in workflow session state
def add_item(run_context: RunContext, item: str) -> str:
    """Add an item to the shopping list in workflow session state.

    Args:
        item (str): The item to add to the shopping list
    """
    if not run_context.session_state:
        run_context.session_state = {}

    # Check if item already exists (case-insensitive)
    existing_items = [
        existing_item.lower() for existing_item in run_context.session_state["shopping_list"]
    ]
    if item.lower() not in existing_items:
        run_context.session_state["shopping_list"].append(item)
        return f"Added '{item}' to the shopping list."
    else:
        return f"'{item}' is already in the shopping list."


def remove_item(run_context: RunContext, item: str) -> str:
    """Remove an item from the shopping list in workflow session state.

    Args:
        item (str): The item to remove from the shopping list
    """
    if not run_context.session_state:
        run_context.session_state = {}

    if len(run_context.session_state["shopping_list"]) == 0:
        return f"Shopping list is empty. Cannot remove '{item}'."

    # Find and remove item (case-insensitive)
    shopping_list = run_context.session_state["shopping_list"]
    for i, existing_item in enumerate(shopping_list):
        if existing_item.lower() == item.lower():
            removed_item = shopping_list.pop(i)
            return f"Removed '{removed_item}' from the shopping list."

    return f"'{item}' not found in the shopping list."


def remove_all_items(run_context: RunContext) -> str:
    """Remove all items from the shopping list in workflow session state."""
    if not run_context.session_state:
        run_context.session_state = {}

    run_context.session_state["shopping_list"] = []
    return "Removed all items from the shopping list."


def list_items(run_context: RunContext) -> str:
    """List all items in the shopping list from workflow session state."""
    if not run_context.session_state:
        run_context.session_state = {}

    if len(run_context.session_state["shopping_list"]) == 0:
        return "Shopping list is empty."

    items = run_context.session_state["shopping_list"]
    items_str = "\n".join([f"- {item}" for item in items])
    return f"Shopping list:\n{items_str}"


# Create agents with tools that use workflow session state
shopping_assistant = Agent(
    name="Shopping Assistant",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[add_item, remove_item, list_items],
    instructions=[
        "You are a helpful shopping assistant.",
        "You can help users manage their shopping list by adding, removing, and listing items.",
        "Always use the provided tools to interact with the shopping list.",
        "Be friendly and helpful in your responses.",
    ],
)

list_manager = Agent(
    name="List Manager",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[list_items, remove_all_items],
    instructions=[
        "You are a list management specialist.",
        "You can view the current shopping list and clear it when needed.",
        "Always show the current list when asked.",
        "Confirm actions clearly to the user.",
    ],
)

# Create steps
manage_items_step = Step(
    name="manage_items",
    description="Help manage shopping list items (add/remove)",
    agent=shopping_assistant,
)

view_list_step = Step(
    name="view_list",
    description="View and manage the complete shopping list",
    agent=list_manager,
)

# Create workflow with workflow_session_state
shopping_workflow = Workflow(
    name="Shopping List Workflow",
    db=db,
    steps=[manage_items_step, view_list_step],
    session_state={"shopping_list": []},
)

if __name__ == "__main__":
    # Example 1: Add items to the shopping list
    print("=== Example 1: Adding Items ===")
    shopping_workflow.print_response(
        input="Please add milk, bread, and eggs to my shopping list."
    )
    print("Workflow session state:", shopping_workflow.get_session_state())

    # Example 2: Add more items and view list
    print("\n=== Example 2: Adding More Items ===")
    shopping_workflow.print_response(
        input="Add apples and bananas to the list, then show me the complete list."
    )
    print("Workflow session state:", shopping_workflow.get_session_state())

    # Example 3: Remove items
    print("\n=== Example 3: Removing Items ===")
    shopping_workflow.print_response(
        input="Remove bread from the list and show me what's left."
    )
    print("Workflow session state:", shopping_workflow.get_session_state())

    # Example 4: Clear the entire list
    print("\n=== Example 4: Clearing List ===")
    shopping_workflow.print_response(
        input="Clear the entire shopping list and confirm it's empty."
    )
    print("Final workflow session state:", shopping_workflow.get_session_state())
```

See the [RunContext schema](/reference/run/run_context) for more information.

### 3. `session_state` as a parameter for custom python functions step in workflow

You can use the `session_state` as a parameter for custom python functions step in workflow to access and modify the session state.

<Note>
  On the function of the custom python function step for a workflow

  ```python  theme={null}
  def custom_function_step(step_input: StepInput, session_state):
      session_state["test"] = test_1 # updates the workflow session state
  ```
</Note>

See [examples](/examples/concepts/workflows/06_workflows_advanced_concepts/access_session_state_in_custom_python_function_step) for more details.

The `session_state` is also available as a parameter in the evaluator and selector functions of the `Condition` and `Router` steps:

```python  theme={null}
def evaluator_function(step_input: StepInput, session_state):
    return session_state["test"] == "test_1"

condition_step = Condition(
    name="condition_step",
    evaluator=evaluator_function,
    steps=[step_1, step_2],
)
```

```python  theme={null}
def selector_function(step_input: StepInput, session_state):
    return session_state["test"] == "test_1"

router_step = Router(
    name="router_step",
    selector=selector_function,
    choices=[step_1, step_2],
)
```

See example of [Session State in Condition Evaluator Function](/examples/concepts/workflows/06_workflows_advanced_concepts/access_session_state_in_condition_evaluator_function)
and [Session State in Router Selector Function](/examples/concepts/workflows/06_workflows_advanced_concepts/access_session_state_in_router_selector_function) for more details.

## Key Benefits

**Persistent State Management**

* Data persists across all workflow steps and components
* Enables complex, stateful workflows with memory
* Supports deterministic execution with consistent state

**Cross-Component Coordination**

* Agents, teams, and functions share the same state object
* Enables sophisticated collaboration patterns
* Maintains data consistency across workflow execution

**Flexible Data Structure**

* Use any Python data structure (dictionaries, lists, objects)
* Structure data to match your workflow requirements
* Access and modify state through standard Python operations

<Note>
  The `session_state` is automatically passed to all agents and teams within a
  workflow, enabling seamless collaboration and data sharing between different
  components without manual state management.
</Note>

## Useful Links

<CardGroup cols={2}>
  <Card title="Agent Examples" icon="user" href="https://github.com/agno-agi/agno/tree/main/cookbook/workflows/_06_advanced_concepts/_04_shared_session_state/shared_session_state_with_agent.py">
    See how agents interact with shared session state
  </Card>

  <Card title="Team Examples" icon="users" href="https://github.com/agno-agi/agno/tree/main/cookbook/workflows/_06_advanced_concepts/_04_shared_session_state/shared_session_state_with_team.py">
    Learn how teams coordinate using shared state
  </Card>
</CardGroup>
