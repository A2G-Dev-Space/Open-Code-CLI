# Langtrace

> Original Document: [Langtrace](https://docs.agno.com/integrations/observability/langtrace.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.072Z

---

# Langtrace

> Integrate Agno with Langtrace to send traces and gain insights into your agent's performance.

## Integrating Agno with Langtrace

Langtrace provides a powerful platform for tracing and monitoring AI model calls. By integrating Agno with Langtrace, you can gain insights into your agent's performance and behavior.

## Prerequisites

1. **Install Dependencies**

   Ensure you have the necessary package installed:

   ```bash  theme={null}
   pip install langtrace-python-sdk
   ```

2. **Create a Langtrace Account**

   * Sign up for an account at [Langtrace](https://app.langtrace.ai/).
   * Obtain your API key from the Langtrace dashboard.

3. **Set Environment Variables**

   Configure your environment with the Langtrace API key:

   ```bash  theme={null}
   export LANGTRACE_API_KEY=<your-key>
   ```

## Sending Traces to Langtrace

This example demonstrates how to instrument your Agno agent with Langtrace.

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from langtrace_python_sdk import langtrace
from langtrace_python_sdk.utils.with_root_span import with_langtrace_root_span

# Initialize Langtrace
langtrace.init()

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

* **Environment Variables**: Ensure your environment variable is correctly set for the API key.
* **Initialization**: Call `langtrace.init()` to initialize Langtrace before using the agent.

By following these steps, you can effectively integrate Agno with Langtrace, enabling comprehensive observability and monitoring of your AI agents.
