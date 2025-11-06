# Deep Research Agent

> Original Document: [Deep Research Agent](https://docs.agno.com/examples/models/openai/responses/deep_research_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.424Z

---

# Deep Research Agent

## Code

```python cookbook/models/openai/responses/deep_research_agent.py theme={null}
from textwrap import dedent

from agno.agent import Agent
from agno.models.openai import OpenAIResponses

agent = Agent(
    model=OpenAIResponses(id="o4-mini-deep-research", max_tool_calls=1),
    instructions=dedent("""
        You are an expert research analyst with access to advanced research tools.

        When you are given a schema to use, pass it to the research tool as output_schema parameter to research tool.

        The research tool has two parameters:
        - instructions (str): The research topic/question
        - output_schema (dict, optional): A JSON schema for structured output
    """),
)

agent.print_response(
    """Research the economic impact of semaglutide on global healthcare systems.
    Do:
    - Include specific figures, trends, statistics, and measurable outcomes.
    - Prioritize reliable, up-to-date sources: peer-reviewed research, health
      organizations (e.g., WHO, CDC), regulatory agencies, or pharmaceutical
      earnings reports.
    - Include inline citations and return all source metadata.

    Be analytical, avoid generalities, and ensure that each section supports
    data-backed reasoning that could inform healthcare policy or financial modeling."""
)

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

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/openai/responses/deep_research_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/openai/responses/deep_research_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
