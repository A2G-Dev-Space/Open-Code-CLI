# Basic Reasoning Agent

> Original Document: [Basic Reasoning Agent](https://docs.agno.com/examples/concepts/reasoning/agents/basic-cot.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.890Z

---

# Basic Reasoning Agent

This example demonstrates how to configure a basic Reasoning Agent, using the `reasoning=True` flag.

## Code

```python cookbook/reasoning/agents/analyse_treaty_of_versailles.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

task = (
    "Analyze the key factors that led to the signing of the Treaty of Versailles in 1919. "
    "Discuss the political, economic, and social impacts of the treaty on Germany and how it "
    "contributed to the onset of World War II. Provide a nuanced assessment that includes "
    "multiple historical perspectives."
)

reasoning_agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    reasoning=True, # The Agent will be able to reason.
    markdown=True,
)
reasoning_agent.print_response(task, stream=True, show_full_reasoning=True)
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

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/agents/analyse_treaty_of_versailles.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/agents/analyse_treaty_of_versailles.py
      ```
    </CodeGroup>
  </Step>
</Steps>
