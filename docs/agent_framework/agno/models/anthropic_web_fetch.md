# Web Fetch

> Original Document: [Web Fetch](https://docs.agno.com/examples/models/anthropic/web_fetch.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.357Z

---

# Web Fetch

## Code

```python cookbook/models/anthropic/web_fetch.py theme={null}
from agno.agent import Agent
from agno.models.anthropic import Claude

agent = Agent(
    model=Claude(
        id="claude-opus-4-1-20250805",
        default_headers={"anthropic-beta": "web-fetch-2025-09-10"},
    ),
    tools=[
        {
            "type": "web_fetch_20250910",
            "name": "web_fetch",
            "max_uses": 5,
        }
    ],
    markdown=True,
)

agent.print_response(
    "Tell me more about https://en.wikipedia.org/wiki/Glacier_National_Park_(U.S.)",
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export ANTHROPIC_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U anthropic agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/anthropic/web_fetch.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/anthropic/web_fetch.py
      ```
    </CodeGroup>
  </Step>
</Steps>
