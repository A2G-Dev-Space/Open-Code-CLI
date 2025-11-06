# Team with Output Model

> Original Document: [Team with Output Model](https://docs.agno.com/examples/concepts/teams/structured_input_output/team_with_output_model.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:15.116Z

---

# Team with Output Model

This example shows how to use the output\_model parameter to specify the model that should be used to generate the final response from a team.

## Code

```python cookbook/examples/teams/structured_input_output/03_team_with_output_model.py theme={null}
"""
This example shows how to use the output_model parameter to specify the model that should be used to generate the final response.
"""

from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.models.openai import OpenAIChat
from agno.team import Team
from agno.tools.duckduckgo import DuckDuckGoTools

itinerary_planner = Agent(
    name="Itinerary Planner",
    model=Claude(id="claude-sonnet-4-20250514"),
    description="You help people plan amazing vacations. Use the tools at your disposal to find latest information about the destination.",
    tools=[DuckDuckGoTools()],
)

travel_expert = Team(
    model=OpenAIChat(id="gpt-5-mini"),
    members=[itinerary_planner],
    output_model=OpenAIChat(id="gpt-5-mini"),
)

travel_expert.print_response("Plan a summer vacation in Paris", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install required libraries">
    ```bash  theme={null}
    pip install agno ddgs
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=****
    export ANTHROPIC_API_KEY=****
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python cookbook/examples/teams/structured_input_output/03_team_with_output_model.py
    ```
  </Step>
</Steps>
