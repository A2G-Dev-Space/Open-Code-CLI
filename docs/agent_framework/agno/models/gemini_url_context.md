# Agent with URL Context

> Original Document: [Agent with URL Context](https://docs.agno.com/examples/models/gemini/url_context.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.801Z

---

# Agent with URL Context

## Code

```python cookbook/models/google/gemini/url_context.py theme={null}
from agno.agent import Agent
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.5-flash", url_context=True),
    markdown=True,
)

url1 = "https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592"
url2 = "https://www.allrecipes.com/recipe/83557/juicy-roasted-chicken/"

agent.print_response(
    f"Compare the ingredients and cooking times from the recipes at {url1} and {url2}"
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
      python cookbook/models/google/gemini/url_context.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/google/gemini/url_context.py
      ```
    </CodeGroup>
  </Step>
</Steps>
