# Atla

> Original Document: [Atla](https://docs.agno.com/integrations/observability/atla.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.076Z

---

# Atla

> Integrate `Atla` with Agno for real-time monitoring, automated evaluation, and performance analytics of your AI agents.

[Atla](https://www.atla-ai.com/) is an advanced observability platform designed specifically for AI agent monitoring and evaluation.
This integration provides comprehensive insights into agent performance, automated quality assessment, and detailed analytics for production AI systems.

## Prerequisites

* **API Key**: Obtain your API key from the [Atla dashboard](https://app.atla-ai.com)

Install the Atla Insights SDK with Agno support:

```bash  theme={null}
pip install "atla-insights"
```

## Configuration

Configure your API key as an environment variable:

```bash  theme={null}
export ATLA_API_KEY="your_api_key_from_atla_dashboard"
```

## Example

```python  theme={null}
from os import getenv
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from atla_insights import configure, instrument_agno

# Step 1: Configure Atla
configure(token=getenv("ATLA_API_KEY"))

# Step 2: Create your Agno agent
agent = Agent(
    name="Market Analysis Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    instructions="Provide professional market analysis with data-driven insights.",
    debug_mode=True,
)

# Step 3: Instrument and execute
with instrument_agno("openai"):
    response = agent.run("Retrieve the latest news about the stock market.")
    print(response.content)
```

Now go to the [Atla dashboard](https://app.atla-ai.com/app/) and view the traces created by your agent. You can visualize the execution flow, monitor performance, and debug issues directly from the Atla dashboard.

<Frame caption="Atla Agent run trace">
  <img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=83334fabbdbc6d69fd6c322568a79910" style={{ borderRadius: '10px', width: '100%', maxWidth: '800px' }} alt="atla-trace" data-og-width="1482" width="1482" data-og-height="853" height="853" data-path="images/atla-trace-summary.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c16251e3e7934ba377fcc96c87fb9c94 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=30b4c98898ac04641de69533b0e9b2b3 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=846aa70151fd7874c52b08db17fb25ac 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=0ddcdd1f24323b0cfe1f38af5bc56b03 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=6f8a77a8d026dfc3533084b788e3caf0 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/atla-trace-summary.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e9e30bd974ffc954415f1a9e0a5931d3 2500w" />
</Frame>
