# Thinking Agent

> Original Document: [Thinking Agent](https://docs.agno.com/examples/models/dashscope/thinking_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.596Z

---

# Thinking Agent

## Code

```python cookbook/models/dashscope/thinking_agent.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.dashscope import DashScope

agent = Agent(
    model=DashScope(id="qvq-max", enable_thinking=True),
)

image_url = "https://img.alicdn.com/imgextra/i1/O1CN01gDEY8M1W114Hi3XcN_!!6000000002727-0-tps-1024-406.jpg"

agent.print_response(
    "How do I solve this problem? Please think through each step carefully.",
    images=[Image(url=image_url)],
    stream=True,
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export DASHSCOPE_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno 
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/dashscope/thinking_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/dashscope/thinking_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
