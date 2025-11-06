# Web Search Agent

> Original Document: [Web Search Agent](https://docs.agno.com/examples/models/langdb/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.165Z

---

# Web Search Agent

## Code

```python cookbook/models/langdb/web_search.py theme={null}
from agno.agent import Agent
from agno.models.langdb import LangDB
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=LangDB(id="llama3-1-70b-instruct-v1.0"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Whats happening in France?", stream=True)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export LANGDB_API_KEY=xxx
    export LANGDB_PROJECT_ID=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/langdb/web_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/langdb/web_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
