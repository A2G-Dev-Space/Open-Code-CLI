# Agent with Input Schema

> Original Document: [Agent with Input Schema](https://docs.agno.com/examples/concepts/agent/input_and_output/input_schema_on_agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.399Z

---

# Agent with Input Schema

This example demonstrates how to define an input schema for an agent using Pydantic models, ensuring structured input validation.

## Code

```python input_schema_on_agent.py theme={null}
from typing import List

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.hackernews import HackerNewsTools
from pydantic import BaseModel, Field


class ResearchTopic(BaseModel):
    """Structured research topic with specific requirements"""

    topic: str
    focus_areas: List[str] = Field(description="Specific areas to focus on")
    target_audience: str = Field(description="Who this research is for")
    sources_required: int = Field(description="Number of sources needed", default=5)


# Define agents
hackernews_agent = Agent(
    name="Hackernews Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[HackerNewsTools()],
    role="Extract key insights and content from Hackernews posts",
    input_schema=ResearchTopic,
)

# Pass a dict that matches the input schema
hackernews_agent.print_response(
    input={
        "topic": "AI",
        "focus_areas": ["AI", "Machine Learning"],
        "target_audience": "Developers",
        "sources_required": "5",
    }
)

# Pass a pydantic model that matches the input schema
# hackernews_agent.print_response(
#     input=ResearchTopic(
#         topic="AI",
#         focus_areas=["AI", "Machine Learning"],
#         target_audience="Developers",
#         sources_required=5,
#     )
# )
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno pydantic
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
    touch input_schema_on_agent.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python input_schema_on_agent.py
      ```

      ```bash Windows   theme={null}
      python input_schema_on_agent.py
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
