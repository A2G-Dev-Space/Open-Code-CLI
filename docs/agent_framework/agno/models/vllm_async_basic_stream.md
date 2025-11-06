# Async Agent with Streaming

> Original Document: [Async Agent with Streaming](https://docs.agno.com/examples/models/vllm/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.756Z

---

# Async Agent with Streaming

## Code

```python cookbook/models/vllm/async_basic_stream.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.vllm import VLLM

agent = Agent(model=VLLM(id="Qwen/Qwen2.5-7B-Instruct"), markdown=True)
asyncio.run(agent.aprint_response("Share a 2 sentence horror story", stream=True))
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install Libraries">
    ```bash  theme={null}
    pip install -U agno openai vllm
    ```
  </Step>

  <Step title="Start vLLM server">
    ```bash  theme={null}
    vllm serve Qwen/Qwen2.5-7B-Instruct \
        --enable-auto-tool-choice \
        --tool-call-parser hermes \
        --dtype float16 \
        --max-model-len 8192 \
        --gpu-memory-utilization 0.9
    ```
  </Step>

  <Step title="Run Agent">
    ```bash  theme={null}
    python cookbook/models/vllm/async_basic_stream.py
    ```
  </Step>
</Steps>
