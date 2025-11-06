# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/vllm/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:16.788Z

---

# Agent with Tools

## Code

```python cookbook/models/vllm/tool_use.py theme={null}
"""Build a Web Search Agent using xAI."""

from agno.agent import Agent
from agno.models.vllm import VLLM
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=VLLM(
        id="NousResearch/Nous-Hermes-2-Mistral-7B-DPO", top_k=20, enable_thinking=False
    ),
    tools=[DuckDuckGoTools()],
    markdown=True,
)
agent.print_response("Whats happening in France?")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Libraries">
    ```bash  theme={null}
    pip install -U agno openai vllm ddgs
    ```
  </Step>

  <Step title="Start vLLM server">
    ```bash  theme={null}
    vllm serve NousResearch/Nous-Hermes-2-Mistral-7B-DPO \
        --enable-auto-tool-choice \
        --tool-call-parser hermes \
        --dtype float16 \
        --max-model-len 8192 \
        --gpu-memory-utilization 0.9
    ```
  </Step>

  <Step title="Run Agent">
    ```bash  theme={null}
    python cookbook/models/vllm/tool_use.py
    ```
  </Step>
</Steps>
