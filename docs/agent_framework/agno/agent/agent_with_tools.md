# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/agent-os/interfaces/ag-ui/agent_with_tools.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:14.247Z

---

# Agent with Tools

> Investment analyst agent with financial tools and web interface

## Code

```python cookbook/os/interfaces/agui/agent_with_tool.py theme={null}
from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from agno.os.interfaces.agui import AGUI
from agno.tools.yfinance import YFinanceTools

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[
        YFinanceTools(
            stock_price=True, 
            analyst_recommendations=True, 
            stock_fundamentals=True
        )
    ],
    description="You are an investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
    instructions="Format your response using markdown and use tables to display data where possible.",
)

agent_os = AgentOS(
    agents=[agent],
    interfaces=[AGUI(agent=agent)],
)
app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve(app="agent_with_tool:app", reload=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set Environment Variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=your_openai_api_key
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno yfinance
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/os/interfaces/agui/agent_with_tool.py
      ```

      ```bash Windows theme={null}
      python cookbook/os/interfaces/agui/agent_with_tool.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Key Features

* **Financial Data Tools**: Real-time stock prices, analyst recommendations, fundamentals
* **Investment Analysis**: Comprehensive company analysis and recommendations
* **Data Visualization**: Tables and formatted financial information
* **Web Interface**: Professional browser-based interaction
* **GPT-4o Powered**: Advanced reasoning for financial insights
