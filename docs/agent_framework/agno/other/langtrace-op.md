# Langtrace

> Original Document: [Langtrace](https://docs.agno.com/examples/concepts/integrations/observability/langtrace-op.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.676Z

---

# Langtrace

## Overview

This example demonstrates how to instrument your Agno agent with Langtrace for tracing and monitoring.

## Code

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

## Usage

<Steps>
  <Step title="Install Dependencies">
    ```bash  theme={null}
    pip install agno openai langtrace-python-sdk
    ```
  </Step>

  <Step title="Set Environment Variables">
    ```bash  theme={null}
    export LANGTRACE_API_KEY=<your-key>
    ```
  </Step>

  <Step title="Run the Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/observability/langtrace_op.py
      ```

      ```bash Windows theme={null}
      python cookbook/observability/langtrace_op.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Notes

* **Initialization**: Call `langtrace.init()` to initialize Langtrace before using the agent.
