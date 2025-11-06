# Agent with URL Context and Search

> Original Document: [Agent with URL Context and Search](https://docs.agno.com/examples/models/gemini/url_context_with_search.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.777Z

---

# Agent with URL Context and Search

## Code

```python cookbook/models/google/gemini/url_context_with_search.py theme={null}
"""Combine URL context with Google Search for comprehensive web analysis.

"""

from agno.agent import Agent
from agno.models.google import Gemini

# Create agent with both Google Search and URL context enabled
agent = Agent(
    model=Gemini(id="gemini-2.5-flash", search=True, url_context=True),
    markdown=True,
)

# The agent will first search for relevant URLs, then analyze their content in detail
agent.print_response(
    "Analyze the content of the following URL: https://docs.agno.com/introduction and also give me latest updates on AI agents"
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GOOGLE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-genai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/google/gemini/url_context_with_search.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/url_context_with_search.py
      ```
    </CodeGroup>
  </Step>
</Steps>
