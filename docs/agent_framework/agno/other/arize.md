# Arize

> Original Document: [Arize](https://docs.agno.com/integrations/observability/arize.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.066Z

---

# Arize

> Integrate Agno with Arize Phoenix to send traces and gain insights into your agent's performance.

## Integrating Agno with Arize Phoenix

[Arize Phoenix](https://phoenix.arize.com/) is a powerful platform for monitoring and analyzing AI models. By integrating Agno with Arize Phoenix, you can leverage OpenInference to send traces and gain insights into your agent's performance.

## Prerequisites

1. **Install Dependencies**

   Ensure you have the necessary packages installed:

   ```bash  theme={null}
   pip install arize-phoenix openai openinference-instrumentation-agno opentelemetry-sdk opentelemetry-exporter-otlp
   ```

2. **Setup Arize Phoenix Account**

   * Create an account at [Arize Phoenix](https://phoenix.arize.com/).
   * Obtain your API key from the Arize Phoenix dashboard.

3. **Set Environment Variables**

   Configure your environment with the Arize Phoenix API key:

   ```bash  theme={null}
   export ARIZE_PHOENIX_API_KEY=<your-key>
   ```

## Sending Traces to Arize Phoenix

* ### Example: Using Arize Phoenix with OpenInference

This example demonstrates how to instrument your Agno agent with OpenInference and send traces to Arize Phoenix.

```python  theme={null}
import asyncio
import os

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from phoenix.otel import register

# Set environment variables for Arize Phoenix
os.environ["PHOENIX_CLIENT_HEADERS"] = f"api_key={os.getenv('ARIZE_PHOENIX_API_KEY')}"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://app.phoenix.arize.com"

# Configure the Phoenix tracer
tracer_provider = register(
    project_name="agno-stock-price-agent",  # Default is 'default'
    auto_instrument=True,  # Automatically use the installed OpenInference instrumentation
)

# Create and configure the agent
agent = Agent(
    name="Stock Price Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[YFinanceTools()],
    instructions="You are a stock price agent. Answer questions in the style of a stock analyst.",
    debug_mode=True,
)

# Use the agent
agent.print_response("What is the current price of Tesla?")
```

Now go to the [phoenix cloud](https://app.phoenix.arize.com) and view the traces created by your agent. You can visualize the execution flow, monitor performance, and debug issues directly from the Arize Phoenix dashboard.

<Frame caption="Arize Phoenix Trace">
  <img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=4cf3e72fb6ccbcb4e888180f8697edd2" style={{ borderRadius: '10px', width: '100%', maxWidth: '800px' }} alt="arize-agno observability" data-og-width="2160" width="2160" data-og-height="1239" height="1239" data-path="images/arize-phoenix-trace.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=45a468f95e21528368f9e756386d7db0 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7094e80a2c0ca54769d664e76a7d4cad 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=8fafca5315b18a0277f14d720aa49e60 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=4d5df2fb5e6f0642fd339f90e9885eb6 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=b57cff98e108efdf5c5e5bebdac43e73 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/arize-phoenix-trace.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=57dc5c8addbb1396dc08e4c8ced0d67d 2500w" />
</Frame>

* ### Example: Local Collector Setup

For local development, you can run a local collector using

```bash  theme={null}
phoenix serve
```

```python  theme={null}
import os

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from phoenix.otel import register

# Set the local collector endpoint
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "http://localhost:6006"

# Configure the Phoenix tracer
tracer_provider = register(
    project_name="agno-stock-price-agent",  # Default is 'default'
    auto_instrument=True,  # Automatically use the installed OpenInference instrumentation
)

# Create and configure the agent
agent = Agent(
    name="Stock Price Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[YFinanceTools()],
    instructions="You are a stock price agent. Answer questions in the style of a stock analyst.",
    debug_mode=True,
)

# Use the agent
agent.print_response("What is the current price of Tesla?")
```

## Notes

* **Environment Variables**: Ensure your environment variables are correctly set for the API key and collector endpoint.
* **Local Development**: Use `phoenix serve` to start a local collector for development purposes.

By following these steps, you can effectively integrate Agno with Arize Phoenix, enabling comprehensive observability and monitoring of your AI agents.
