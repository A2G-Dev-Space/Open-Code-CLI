# Conversational Workflows

> Original Document: [Conversational Workflows](https://docs.agno.com/concepts/workflows/conversational-workflows.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.223Z

---

# Conversational Workflows

> Learn about conversational workflows in Agno.

If your users interact directly with a Workflow, it is often useful to make it a **Conversational Workflow**. Users will then be able to chat with the Workflow,
in the same way you'd interact with an Agent or a Team.

This feature allows you to add a `WorkflowAgent` to your workflow that intelligently decides whether to:

1. **Answer directly** based on the current input and past workflow results
2. **Run the workflow** when the input cannot be answered based on past results

<Note>
  What is a **WorkflowAgent**?

  `WorkflowAgent` is a restricted version of the `Agent` class specifically designed for workflow orchestration.
</Note>

## Quick Start

This is how you can add a `WorkflowAgent` to your workflow:

```python  theme={null}
from agno.workflow import WorkflowAgent
from agno.workflow.workflow import Workflow
from agno.models.openai import OpenAIChat

workflow_agent = WorkflowAgent(
    model=OpenAIChat(id="gpt-4o-mini"),  # Set the model that should be used
    num_history_runs=4  # How many of the previous runs should it take into account
)

workflow = Workflow(
    name="Story Generation Workflow",
    description="A workflow that generates stories, formats them, and adds references",
    agent=workflow_agent,
)
```

## Architecture

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=ec5144a1155be8ca93b18d50be13b084" alt="Workflows conversational workflows diagram" style={{ maxWidth: '500px', width: '100%', height: 'auto' }} data-og-width="958" width="958" data-og-height="1362" height="1362" data-path="images/workflow-agent-flow-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=280&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=e5d8ed7fb9cb4d802b194a8aea60d9ca 280w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=560&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=5e3bc26dd499d6ce3e5e262f73988ad2 560w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=840&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=7c24aad031f8caf88fb0b67348140101 840w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=1100&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=1e6f92a0a2dffd2bd99bf60b893fa4b9 1100w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=1650&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=95e73e7791ff58af2342aa8efff4a3f8 1650w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-light.png?w=2500&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=56702e0fdd18e1f8946c2f216b24e1e2 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=a9f050d257d118db37b63c11937397ad" alt="Workflows conversational workflows diagram" style={{ maxWidth: '500px', width: '100%', height: 'auto' }} data-og-width="958" width="958" data-og-height="1332" height="1332" data-path="images/workflow-agent-flow-dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=280&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=e0d45e2df7934ac3d654039f6c4e1ccb 280w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=560&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=ae85021963cbde778149b133472b1991 560w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=840&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=f6f984a95ebb6a6bdcf08cf2644d40c9 840w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=1100&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=e7323d14876732545fdde33c6b8c83fb 1100w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=1650&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=685e3d8f72f6b654fbc6f5e0e52da7f7 1650w, https://mintcdn.com/agno-v2/zKmlURgt8K26VBJI/images/workflow-agent-flow-dark.png?w=2500&fit=max&auto=format&n=zKmlURgt8K26VBJI&q=85&s=0eacd3dc568b6828e48ee8b4f1edf3d1 2500w" />

## Workflow History for Conversational Workflows:

Similar to [workflow history for steps](/concepts/workflows/workflow_with_history), the `WorkflowAgent` has access to the full history of workflow runs for the current session.
This makes it possible to answer questions about previous results, compare outputs from multiple runs, and maintain conversation continuity.

<Tip>
  How to control the number of previous runs the workflow agent can see?

  The `num_history_runs` parameter controls how many previous workflow runs the agent can see when making decisions. This is crucial for:

  * **Context awareness**: The agent needs to see past runs to answer follow-up questions
  * **Memory limits**: Including too many runs can exceed the model context window
  * **Performance**: Fewer runs mean faster processing and lower input tokens
</Tip>

## Instructions for the WorkflowAgent:

You can provide custom instructions to the `WorkflowAgent` to control its behavior. Although default instructions are provided which instruct the agent to answer directly from history
or to run the workflow when new processing is needed, you can override them by providing your own instructions.

<Warning>
  We recommend using the default instructions unless you have a specific use case where you want the agent to answer in a particular way or include some specific information in the response.
  The default instructions should be sufficient for most use cases.
</Warning>

```python  theme={null}
workflow_agent = WorkflowAgent(
    model=OpenAIChat(id="gpt-4o-mini"),
    num_history_runs=4,
    instructions="You are a helpful assistant that can answer questions and run workflows when new processing is needed.",
)
```

## Usage Example

```python  theme={null}
from agno.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.openai import OpenAIChat
from agno.workflow import WorkflowAgent
from agno.workflow.types import StepInput
from agno.workflow.workflow import Workflow

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"


story_writer = Agent(
    model=OpenAIChat(id="gpt-4o-mini"),
    instructions="You are tasked with writing a 100 word story based on a given topic",
)

story_formatter = Agent(
    model=OpenAIChat(id="gpt-4o-mini"),
    instructions="You are tasked with breaking down a short story in prelogues, body and epilogue",
)


def add_references(step_input: StepInput):
    """Add references to the story"""

    previous_output = step_input.previous_step_content

    if isinstance(previous_output, str):
        return previous_output + "\n\nReferences: https://www.agno.com"


# Create a WorkflowAgent that will decide when to run the workflow
workflow_agent = WorkflowAgent(model=OpenAIChat(id="gpt-4o-mini"), num_history_runs=4)

# Create workflow with the WorkflowAgent
workflow = Workflow(
    name="Story Generation Workflow",
    description="A workflow that generates stories, formats them, and adds references",
    agent=workflow_agent,
    steps=[story_writer, story_formatter, add_references],
    db=PostgresDb(db_url),
)

# First call - will run the workflow (new topic)
workflow.print_response(
    "Tell me a story about a dog named Rocky",
    stream=True,
    stream_events=True,
)

# Second call - will answer directly from history
workflow.print_response(
    "What was Rocky's personality?", stream=True, stream_events=True
)

# Third call - will run the workflow (new topic)
workflow.print_response(
    "Now tell me a story about a cat named Luna",
    stream=True,
    stream_events=True,
)

# Fourth call - will answer directly from history
workflow.print_response(
    "Compare Rocky and Luna", stream=True, stream_events=True
)
```

## Developer Resources

Explore the different examples in [Conversational Workflows Examples](/examples/concepts/workflows/06_workflows_advanced_concepts/conversational_workflows/conversational_workflow_with_conditional_step) section for more details.
