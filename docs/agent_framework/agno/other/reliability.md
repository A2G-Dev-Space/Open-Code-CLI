# Reliability Evals

> Original Document: [Reliability Evals](https://docs.agno.com/concepts/evals/reliability.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.618Z

---

# Reliability Evals

> Learn how to evaluate your Agno Agents and Teams for reliability by testing tool calls and error handling.

What makes an Agent or Team reliable?

* Does it make the expected tool calls?
* Does it handle errors gracefully?
* Does it respect the rate limits of the model API?

## Basic Tool Call Reliability

The first check is to ensure the Agent makes the expected tool calls. Here's an example:

```python reliability.py theme={null}
from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.agent import RunOutput
from agno.tools.calculator import CalculatorTools


def factorial():
    agent = Agent(
        model=OpenAIChat(id="gpt-5-mini"),
        tools=[CalculatorTools()],
    )
    response: RunOutput = agent.run("What is 10!?")
    evaluation = ReliabilityEval(
        name="Tool Call Reliability",
        agent_response=response,
        expected_tool_calls=["factorial"],
    )
    result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
    result.assert_passed()


if __name__ == "__main__":
    factorial()
```

<Frame>
  <img height="200" src="https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=816d4832aa2d3d19ae007f85e9573c13" data-og-width="1148" data-og-height="488" data-path="images/evals/reliability_basic.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=280&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=2cc17d3702c17b96b1a4828793dcad08 280w, https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=560&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=6cb3b00f1c366ee9ae87db978ba96c14 560w, https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=840&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=445cd7213631a55a500414dc1fe20152 840w, https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=1100&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=c8a131d365b92fd94d67b6cd67b8eea5 1100w, https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=1650&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=83f280c6bd6929bfe56870283599826a 1650w, https://mintcdn.com/agno-v2/3rn2Dg1ZNvoQRtu4/images/evals/reliability_basic.png?w=2500&fit=max&auto=format&n=3rn2Dg1ZNvoQRtu4&q=85&s=d47181b3504263137665022f59073978 2500w" />
</Frame>

## Multiple Tool Calls Reliability

Test that agents make multiple tool calls:

```python multiple_tool_calls.py theme={null}
from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.agent import RunOutput
from agno.tools.calculator import CalculatorTools


def multiply_and_exponentiate():
    agent = Agent(
        model=OpenAIChat(id="gpt-4o-mini"),
        tools=[CalculatorTools()],
    )
    response: RunOutput = agent.run(
        "What is 10*5 then to the power of 2? do it step by step"
    )
    evaluation = ReliabilityEval(
        name="Tool Calls Reliability",
        agent_response=response,
        expected_tool_calls=["multiply", "exponentiate"],
    )
    result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
    if result:
        result.assert_passed()


if __name__ == "__main__":
    multiply_and_exponentiate()
```

## Team Reliability

Test how teams handle various error conditions:

```python team_reliability.py theme={null}
from typing import Optional

from agno.agent import Agent
from agno.eval.reliability import ReliabilityEval, ReliabilityResult
from agno.models.openai import OpenAIChat
from agno.run.team import TeamRunOutput
from agno.team import Team
from agno.tools.duckduckgo import DuckDuckGoTools

team_member = Agent(
    name="Web Searcher",
    model=OpenAIChat("gpt-5-mini"),
    role="Searches the web for information.",
    tools=[DuckDuckGoTools(enable_news=True)],
)

team = Team(
    name="Web Searcher Team",
    model=OpenAIChat("gpt-5-mini"),
    members=[team_member],
    markdown=True,
    show_members_responses=True,
)

expected_tool_calls = [
    "delegate_task_to_member",  # Tool call used to delegate a task to a Team member
    "duckduckgo_news",  # Tool call used to get the latest news on AI
]


def evaluate_team_reliability():
    response: TeamRunOutput = team.run("What is the latest news on AI?")
    evaluation = ReliabilityEval(
        name="Team Reliability Evaluation",
        team_response=response,
        expected_tool_calls=expected_tool_calls,
    )
    result: Optional[ReliabilityResult] = evaluation.run(print_results=True)
    if result:
        result.assert_passed()


if __name__ == "__main__":
    evaluate_team_reliability()

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
    ```
  </Step>

  <Step title="Run Basic Tool Call Reliability Test">
    <CodeGroup>
      ```bash Mac theme={null}
      python reliability.py
      ```

      ```bash Windows theme={null}
      python reliability.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Test Multiple Tool Calls">
    <CodeGroup>
      ```bash Mac theme={null}
      python multiple_tool_calls.py
      ```

      ```bash Windows theme={null}
      python multiple_tool_calls.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Test Team Reliability">
    <CodeGroup>
      ```bash Mac theme={null}
      python team_reliability.py
      ```

      ```bash Windows theme={null}
      python team_reliability.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Track Evals in AgnoOS platform

<video autoPlay muted controls className="w-full aspect-video" src="https://mintcdn.com/agno-v2/hzelS2cST9lEqMuM/videos/eval_platform.mp4?fit=max&auto=format&n=hzelS2cST9lEqMuM&q=85&s=9329eaac5cd0f551081e51656cc0227c" data-path="videos/eval_platform.mp4" />

```python evals_demo.py theme={null}

"""Simple example creating a evals and using the AgentOS."""

from agno.agent import Agent
from agno.db.postgres.postgres import PostgresDb
from agno.eval.accuracy import AccuracyEval
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from agno.tools.calculator import CalculatorTools

# Setup the database
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
db = PostgresDb(db_url=db_url)

# Setup the agent
basic_agent = Agent(
    id="basic-agent",
    name="Calculator Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    db=db,
    markdown=True,
    instructions="You are an assistant that can answer arithmetic questions. Always use the Calculator tools you have.",
    tools=[CalculatorTools()],
)

# Setting up and running an eval for our agent
evaluation = AccuracyEval(
    db=db,  # Pass the database to the evaluation. Results will be stored in the database.
    name="Calculator Evaluation",
    model=OpenAIChat(id="gpt-5-mini"),
    input="Should I post my password online? Answer yes or no.",
    expected_output="No",
    num_iterations=1,
    # Agent or team to evaluate:
    agent=basic_agent,
    # team=basic_team,
)
# evaluation.run(print_results=True)

# Setup the Agno API App
agent_os = AgentOS(
    description="Example app for basic agent with eval capabilities",
    id="eval-demo",
    agents=[basic_agent],
)
app = agent_os.get_app()


if __name__ == "__main__":
    """ Run your AgentOS:
    Now you can interact with your eval runs using the API. Examples:
    - http://localhost:8001/eval/{index}/eval-runs
    - http://localhost:8001/eval/{index}/eval-runs/123
    - http://localhost:8001/eval/{index}/eval-runs?agent_id=123
    - http://localhost:8001/eval/{index}/eval-runs?limit=10&page=0&sort_by=created_at&sort_order=desc
    - http://localhost:8001/eval/{index}/eval-runs/accuracy
    - http://localhost:8001/eval/{index}/eval-runs/performance
    - http://localhost:8001/eval/{index}/eval-runs/reliability
    """
    agent_os.serve(app="evals_demo:app", reload=True)

```

<Steps>
  <Step title="Run the Evals Demo">
    <CodeGroup>
      ```bash Mac theme={null}
      python evals_demo.py
      ```
    </CodeGroup>
  </Step>

  <Step title="View the Evals Demo">
    Head over to <a href="https://os.agno.com/evaluation">[https://os.agno.com/evaluation](https://os.agno.com/evaluation)</a> to view the evals.
  </Step>
</Steps>
