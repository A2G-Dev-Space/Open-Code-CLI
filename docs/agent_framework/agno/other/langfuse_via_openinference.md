# Langfuse Via Openinference

> Original Document: [Langfuse Via Openinference](https://docs.agno.com/examples/concepts/integrations/observability/langfuse_via_openinference.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.662Z

---

# Langfuse Via Openinference

## Code

```python cookbook/integrations/observability/langfuse_via_openinference.py theme={null}
import base64
import os

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
from openinference.instrumentation.agno import AgnoInstrumentor
from opentelemetry import trace as trace_api
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor

LANGFUSE_AUTH = base64.b64encode(
    f"{os.getenv('LANGFUSE_PUBLIC_KEY')}:{os.getenv('LANGFUSE_SECRET_KEY')}".encode()
).decode()
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = (
    "https://us.cloud.langfuse.com/api/public/otel"  # 🇺🇸 US data region
)
# os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]="https://cloud.langfuse.com/api/public/otel" # 🇪🇺 EU data region
# os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]="http://localhost:3000/api/public/otel" # 🏠 Local deployment (>= v3.22.0)

os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {LANGFUSE_AUTH}"


tracer_provider = TracerProvider()
tracer_provider.add_span_processor(SimpleSpanProcessor(OTLPSpanExporter()))
trace_api.set_tracer_provider(tracer_provider=tracer_provider)

# Start instrumenting agno
AgnoInstrumentor().instrument()


agent = Agent(
    name="Stock Price Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[DuckDuckGoTools()],
    instructions="You are an internet search agent. Find and provide accurate information on any topic.",
    debug_mode=True,
)

agent.print_response("What are the latest developments in artificial intelligence?")

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    Either self-host or sign up for an account at [https://us.cloud.langfuse.com](https://us.cloud.langfuse.com)

    ```bash  theme={null}
    export LANGFUSE_PUBLIC_KEY=<your-key>
    export LANGFUSE_SECRET_KEY=<your-key>
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai ddgs langfuse opentelemetry-sdk opentelemetry-exporter-otlp openinference-instrumentation-agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/integrations/observability/langfuse_via_openinference.py
      ```

      ```bash Windows theme={null}
      python cookbook/integrations/observability/langfuse_via_openinference.py
      ```
    </CodeGroup>
  </Step>
</Steps>
