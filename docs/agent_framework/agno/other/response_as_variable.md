# Capturing Agent Response as Variable

> Original Document: [Capturing Agent Response as Variable](https://docs.agno.com/examples/concepts/agent/input_and_output/response_as_variable.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.412Z

---

# Capturing Agent Response as Variable

This example demonstrates how to capture and work with agent responses as variables, enabling programmatic access to response data and metadata.

## Code

```python response_as_variable.py theme={null}
from typing import Iterator  # noqa
from rich.pretty import pprint
from agno.agent import Agent, RunOutput
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools


agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[
        DuckDuckGoTools(
            stock_price=True,
            analyst_recommendations=True,
            company_info=True,
            company_news=True,
        )
    ],
    instructions=["Use tables where possible"],
    markdown=True,
)

run_response: RunOutput = agent.run("What is the stock price of NVDA")
pprint(run_response)

# run_response_strem: Iterator[RunOutputEvent] = agent.run("What is the stock price of NVDA", stream=True)
# for response in run_response_strem:
#     pprint(response)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai ddgs rich
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
    touch response_as_variable.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python response_as_variable.py
      ```

      ```bash Windows theme={null}
      python response_as_variable.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/input_and_output" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
