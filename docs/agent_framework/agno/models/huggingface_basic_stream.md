# Streaming Agent

> Original Document: [Streaming Agent](https://docs.agno.com/examples/models/huggingface/basic_stream.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.849Z

---

# Streaming Agent

## Code

```python cookbook/models/huggingface/basic_stream.py theme={null}
from agno.agent import Agent
from agno.models.huggingface import HuggingFace

agent = Agent(
    model=HuggingFace(
        id="mistralai/Mistral-7B-Instruct-v0.2", max_tokens=4096, temperature=0
    ),
)
agent.print_response(
    "What is meaning of life and then recommend 5 best books to read about it",
    stream=True,
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
      python cookbook/models/huggingface/basic_stream.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/huggingface/basic_stream.py
      ```
    </CodeGroup>
  </Step>
</Steps>
