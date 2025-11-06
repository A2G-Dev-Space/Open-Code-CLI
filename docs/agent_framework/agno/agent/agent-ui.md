# AgentUI

> Original Document: [AgentUI](https://docs.agno.com/agent-os/agent-ui.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.435Z

---

# AgentUI

> An Open Source AgentUI for your AgentOS

<Frame>
  <img height="200" src="https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=72cd1f0888dea4f1ec60a67bff5664c4" style={{ borderRadius: '8px' }} data-og-width="5364" data-og-height="2808" data-path="images/agent-ui.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=280&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=8a962c7d75c6fd40d37b696f258b69fc 280w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=560&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=729e6c42c46d47f9c56c66451576c53a 560w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=840&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=cabb3ed5cb4c1934bd3a5a1cba70a2d1 840w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=1100&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=d880656a6c120ed2ef06879bb522b840 1100w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=1650&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=55b22efc72db2bbb9e26079d46aea5b5 1650w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui.png?w=2500&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=5331541ccf7abdb289f0e213f65c9649 2500w" />
</Frame>

Agno provides a beautiful UI for interacting with your agents, completely open source, free to use and build on top of. It's a simple interface that allows you to chat with your agents, view their memory, knowledge, and more.

<Note>
  The AgentOS only uses data in your database. No data is sent to Agno.
</Note>

The Open Source Agent UI is built with Next.js and TypeScript. After the success of the [Agent AgentOS](/agent-os/introduction), the community asked for a self-hosted alternative and we delivered!

## Get Started with Agent UI

To clone the Agent UI, run the following command in your terminal:

```bash  theme={null}
npx create-agent-ui@latest
```

Enter `y` to create a new project, install dependencies, then run the agent-ui using:

```bash  theme={null}
cd agent-ui && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Agent UI, but remember to connect to your local agents.

<Frame>
  <img height="200" src="https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=8f6e365622aefac39432083f2ec587df" style={{ borderRadius: '8px' }} data-og-width="3096" data-og-height="1832" data-path="images/agent-ui-homepage.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=280&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=f1d2aa67b73246a4d71f84fc9b581cd0 280w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=560&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=969732c206fb7c33e7f575aae105294a 560w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=840&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=f1cf21fec03209156f4d1eeec6a12163 840w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=1100&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=adf49bc5198a1c4283d0bdb9ffcf91f7 1100w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=1650&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=438d2965108fb49d808e89f9928613a3 1650w, https://mintcdn.com/agno-v2/QfHdyhk-tu-JEw8s/images/agent-ui-homepage.png?w=2500&fit=max&auto=format&n=QfHdyhk-tu-JEw8s&q=85&s=b02e0c727983bc3329b8046dfa18d3a5 2500w" />
</Frame>

<br />

<Accordion title="Clone the repository manually" icon="github">
  You can also clone the repository manually

  ```bash  theme={null}
  git clone https://github.com/agno-agi/agent-ui.git
  ```

  And run the agent-ui using

  ```bash  theme={null}
  cd agent-ui && pnpm install && pnpm dev
  ```
</Accordion>

## Connect your AgentOS

The Agent UI needs to connect to a AgentOS server, which you can run locally or on any cloud provider.

Let's start with a local AgentOS server. Create a file `agentos.py`

```python agentos.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from agno.db.sqlite import SqliteDb
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.yfinance import YFinanceTools

agent_storage: str = "tmp/agents.db"

web_agent = Agent(
    name="Web Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    instructions=["Always include sources"],
    # Store the agent sessions in a sqlite database
    db=SqliteDb(db_file=agent_storage),
    # Adds the current date and time to the context
    add_datetime_to_context=True,
    # Adds the history of the conversation to the messages
    add_history_to_context=True,
    # Number of history responses to add to the messages
    num_history_runs=5,
    # Adds markdown formatting to the messages
    markdown=True,
)

finance_agent = Agent(
    name="Finance Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True, company_info=True, company_news=True)],
    instructions=["Always use tables to display data"],
    db=SqliteDb(db_file=agent_storage),
    add_datetime_to_context=True,
    add_history_to_context=True,
    num_history_runs=5,
    markdown=True,
)

agent_os = AgentOS(agents=[web_agent, finance_agent])
app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve("agentos:app", reload=True)
```

In another terminal, run the AgentOS server:

<Steps>
  <Step title="Setup your virtual environment">
    <CodeGroup>
      ```bash Mac theme={null}
      python3 -m venv .venv
      source .venv/bin/activate
      ```

      ```bash Windows theme={null}
      python3 -m venv aienv
      aienv/scripts/activate
      ```
    </CodeGroup>
  </Step>

  <Step title="Install dependencies">
    <CodeGroup>
      ```bash Mac theme={null}
      pip install -U openai ddgs yfinance sqlalchemy 'fastapi[standard]' agno
      ```

      ```bash Windows theme={null}
      pip install -U openai ddgs yfinance sqlalchemy 'fastapi[standard]' agno
      ```
    </CodeGroup>
  </Step>

  <Step title="Export your OpenAI key">
    <CodeGroup>
      ```bash Mac theme={null}
      export OPENAI_API_KEY=sk-***
      ```

      ```bash Windows theme={null}
      setx OPENAI_API_KEY sk-***
      ```
    </CodeGroup>
  </Step>

  <Step title="Run the AgentOS">
    ```shell  theme={null}
    python agentos.py
    ```
  </Step>
</Steps>

<Tip>Make sure the `serve_agentos_app()` points to the file containing your `AgentOS` app.</Tip>

## View the AgentUI

* Open [http://localhost:3000](http://localhost:3000) to view the Agent UI
* Enter the `localhost:7777` endpoint on the left sidebar and start chatting with your agents and teams!

<video autoPlay muted controls className="w-full aspect-video" src="https://mintcdn.com/agno-v2/APlycdxch1exeM4A/videos/agent-ui-demo.mp4?fit=max&auto=format&n=APlycdxch1exeM4A&q=85&s=646f460d718e8c3d09b479277088fa19" data-path="videos/agent-ui-demo.mp4" />
