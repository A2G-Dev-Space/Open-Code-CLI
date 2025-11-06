# Websearch Builtin Tool

> Original Document: [Websearch Builtin Tool](https://docs.agno.com/examples/models/openai/responses/websearch_builtin_tool.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.520Z

---

# Websearch Builtin Tool

## Code

```python cookbook/models/openai/responses/websearch_builtin_tool.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.file import FileTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5-mini"),
    tools=[{"type": "web_search_preview"}, FileTools()],
    instructions="Save the results to a file with a relevant name.",
    markdown=True,
)
agent.print_response("Whats happening in France?")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/websearch_builtin_tool.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/websearch_builtin_tool.py
      ```
    </CodeGroup>
  </Step>
</Steps>
