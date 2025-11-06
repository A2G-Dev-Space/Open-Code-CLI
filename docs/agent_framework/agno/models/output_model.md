# Agent with Output Model

> Original Document: [Agent with Output Model](https://docs.agno.com/examples/concepts/agent/input_and_output/output_model.md)
> Category: models
> Downloaded: 2025-11-06T11:51:14.405Z

---

# Agent with Output Model

This example demonstrates how to use the output\_model parameter to specify a different model for generating the final response, enabling model switching during agent execution.

## Code

```python output_model.py theme={null}
"""
This example shows how to use the output_model parameter to specify the model that will be used to generate the final response.
"""

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-4.1"),
    output_model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
)

agent.print_response("Latest news from France?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai ddgs
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
    touch output_model.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python output_model.py
      ```

      ```bash Windows theme={null}
      python output_model.py
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
