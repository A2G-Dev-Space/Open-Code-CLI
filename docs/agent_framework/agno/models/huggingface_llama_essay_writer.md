# Llama Essay Writer

> Original Document: [Llama Essay Writer](https://docs.agno.com/examples/models/huggingface/llama_essay_writer.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.849Z

---

# Llama Essay Writer

## Code

```python cookbook/models/huggingface/llama_essay_writer.py theme={null}
from agno.agent import Agent
from agno.models.huggingface import HuggingFace

agent = Agent(
    model=HuggingFace(
        id="meta-llama/Meta-Llama-3-8B-Instruct",
        max_tokens=4096,
    ),
    description="You are an essay writer. Write a 300 words essay on topic that will be provided by user",
)
agent.print_response("topic: AI")

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
      python cookbook/models/huggingface/llama_essay_writer.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/huggingface/llama_essay_writer.py
      ```
    </CodeGroup>
  </Step>
</Steps>
