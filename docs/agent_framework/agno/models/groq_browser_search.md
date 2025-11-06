# Browser Search Agent

> Original Document: [Browser Search Agent](https://docs.agno.com/examples/models/groq/browser_search.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.803Z

---

# Browser Search Agent

## Code

```python cookbook/models/groq/browser_search.py theme={null}
from agno.agent import Agent
from agno.models.groq import Groq

agent = Agent(
    model=Groq(id="openai/gpt-oss-20b"),
    tools=[{"type": "browser_search"}],
)
agent.print_response("Is the Going-to-the-sun road open for public?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GROQ_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U groq agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/groq/browser_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/groq/browser_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
