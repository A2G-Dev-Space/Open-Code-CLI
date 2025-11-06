# Groq Llama Finance Agent

> Original Document: [Groq Llama Finance Agent](https://docs.agno.com/examples/concepts/reasoning/tools/groq-llama-finance-agent.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.951Z

---

# Groq Llama Finance Agent

This example shows how to use `ReasoningTools` with a Groq Llama model.

## Code

```python cookbook/reasoning/tools/groq_llama_finance_agent.py theme={null}
from textwrap import dedent

from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools

thinking_llama = Agent(
    model=Groq(id="meta-llama/llama-4-scout-17b-16e-instruct"),
    tools=[
        ReasoningTools(),
        DuckDuckGoTools(),
    ],
    instructions=dedent("""\
    ## General Instructions
    - Always start by using the think tool to map out the steps needed to complete the task.
    - After receiving tool results, use the think tool as a scratchpad to validate the results for correctness
    - Before responding to the user, use the think tool to jot down final thoughts and ideas.
    - Present final outputs in well-organized tables whenever possible.

    ## Using the think tool
    At every step, use the think tool as a scratchpad to:
    - Restate the object in your own words to ensure full comprehension.
    - List the  specific rules that apply to the current request
    - Check if all required information is collected and is valid
    - Verify that the planned action completes the task\
    """),
    markdown=True,
)
thinking_llama.print_response("Write a report comparing NVDA to TSLA", stream=True)
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
    pip install -U groq agno ddgs
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/reasoning/tools/groq_llama_finance_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/reasoning/tools/groq_llama_finance_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
