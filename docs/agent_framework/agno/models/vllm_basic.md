# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/vllm/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.055Z

---

# Basic Agent

## Code

```python cookbook/models/vllm/basic.py theme={null}
from agno.agent import Agent
from agno.models.vllm import VLLM

agent = Agent(
    model=VLLM(id="Qwen/Qwen2.5-7B-Instruct", top_k=20, enable_thinking=False),
    markdown=True,
)

agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Setup vLLM Server">
    Start a vLLM server locally:

    ```bash  theme={null}
    pip install vllm
    python -m vllm.entrypoints.openai.api_server \
      --model Qwen/Qwen2.5-7B-Instruct \
      --port 8000
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/vllm/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/vllm/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
