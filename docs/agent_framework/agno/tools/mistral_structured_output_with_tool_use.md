# Structured Output With Tool Use

> Original Document: [Structured Output With Tool Use](https://docs.agno.com/examples/models/mistral/structured_output_with_tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.141Z

---

# Structured Output With Tool Use

## Code

```python cookbook/models/mistral/structured_output_with_tool_use.py theme={null}
from agno.agent import Agent
from agno.models.mistral import MistralChat
from agno.tools.duckduckgo import DuckDuckGoTools
from pydantic import BaseModel


class Person(BaseModel):
    name: str
    description: str


model = MistralChat(
    id="mistral-medium-latest",
    temperature=0.0,
)

researcher = Agent(
    name="Researcher",
    model=model,
    role="You find people with a specific role at a provided company.",
    instructions=[
        "- Search the web for the person described"
        "- Find out if they have public contact details"
        "- Return the information in a structured format"
    ],
    tools=[DuckDuckGoTools()],
    output_schema=Person,
    add_datetime_to_context=True,
)

researcher.print_response("Find information about Elon Musk")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno ddgs
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/structured_output_with_tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/structured_output_with_tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
