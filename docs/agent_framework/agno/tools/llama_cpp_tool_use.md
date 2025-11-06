# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/llama_cpp/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.976Z

---

# Agent with Tools

## Code

```python cookbook/models/llama_cpp/tool_use.py theme={null}
"""Run `pip install ddgs` to install dependencies."""

from agno.agent import Agent
from agno.models.llama_cpp import LlamaCpp
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=LlamaCpp(id="ggml-org/gpt-oss-20b-GGUF"),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Whats happening in France?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install LlamaCpp">
    Follow the [LlamaCpp installation guide](https://github.com/ggerganov/llama.cpp) and start the server:

    ```bash  theme={null}
    llama-server -hf ggml-org/gpt-oss-20b-GGUF --ctx-size 0 --jinja -ub 2048 -b 2048
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/llama_cpp/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/llama_cpp/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
