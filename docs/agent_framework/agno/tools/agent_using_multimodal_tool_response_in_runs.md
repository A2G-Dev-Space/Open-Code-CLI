# Agent Using Multimodal Tool Response in Runs

> Original Document: [Agent Using Multimodal Tool Response in Runs](https://docs.agno.com/examples/concepts/agent/multimodal/agent_using_multimodal_tool_response_in_runs.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.452Z

---

# Agent Using Multimodal Tool Response in Runs

This example demonstrates how to create an agent that uses DALL-E to generate images and maintains conversation history across multiple runs, allowing the agent to remember previous interactions and images generated.

## Code

```python agent_using_multimodal_tool_response_in_runs.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.tools.dalle import DalleTools

# Create an Agent with the DALL-E tool
agent = Agent(
    tools=[DalleTools()],
    name="DALL-E Image Generator",
    add_history_to_context=True,
    db=SqliteDb(db_file="tmp/test.db"),
)

agent.print_response(
    "Generate an image of a Siamese white furry cat sitting on a couch?",
    markdown=True,
)

agent.print_response(
    "Which type of animal and the breed are we talking about?", markdown=True
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch agent_using_multimodal_tool_response_in_runs.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python agent_using_multimodal_tool_response_in_runs.py
      ```

      ```bash Windows theme={null}
      python agent_using_multimodal_tool_response_in_runs.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/multimodal" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
