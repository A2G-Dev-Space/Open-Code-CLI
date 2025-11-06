# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/vertexai/claude/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:17.070Z

---

# Agent with Tools

## Code

```python cookbook/models/vertexai/claude/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.vertexai.claude import Claude
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=Claude(id="claude-sonnet-4@20250514"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Whats happening in France?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your environment variables">
    <CodeGroup>
      ```bash Mac theme={null}
      export CLOUD_ML_REGION=xxx
      export GOOGLE_CLOUD_PROJECT=xxx
      ```

      ```bash Windows theme={null}
        setx CLOUD_ML_REGION xxx
        setx GOOGLE_CLOUD_PROJECT xxx
      ```
    </CodeGroup>
  </Step>

  <Step title="Authenticate your CLI session">
    `gcloud auth application-default login `

    <Note>You dont need to authenticate your CLI every time. </Note>
  </Step>

  <Step title="Install libraries">`pip install -U anthropic agno `</Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vertexai/claude/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vertexai/claude/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
