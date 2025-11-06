# Async Basic Stream.Py

> Original Document: [Async Basic Stream.Py](https://docs.agno.com/examples/models/huggingface/async_basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.839Z

---

# Async Basic Stream.Py

## Code

```python cookbook/models/huggingface/async_basic_stream.py theme={null}
import asyncio

from agno.agent import Agent
from agno.models.huggingface import HuggingFace

agent = Agent(
    model=HuggingFace(
        id="mistralai/Mistral-7B-Instruct-v0.2", max_tokens=4096, temperature=0
    ),
)
asyncio.run(
    agent.aprint_response(
        "What is meaning of life and then recommend 5 best books to read about it",
        stream=True,
    )
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export HF_TOKEN=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U huggingface_hub agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/huggingface/async_basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/huggingface/async_basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
