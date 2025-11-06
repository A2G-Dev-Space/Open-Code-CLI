# Google Search Tools

> Original Document: [Google Search Tools](https://docs.agno.com/examples/concepts/tools/search/google_search.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.144Z

---

# Google Search Tools

## Code

```python cookbook/tools/googlesearch_tools.py theme={null}
from agno.agent import Agent
from agno.tools.googlesearch import GoogleSearchTools

agent = Agent(
    tools=[GoogleSearchTools()],
        markdown=True,
)
agent.print_response("What are the latest developments in AI?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API credentials">
    ```bash  theme={null}
    export GOOGLE_CSE_ID=xxx
    export GOOGLE_API_KEY=xxx
    export OPENAI_API_KEY=xxx 
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-api-python-client openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/tools/googlesearch_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/tools/googlesearch_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
