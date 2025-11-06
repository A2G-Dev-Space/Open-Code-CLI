# Tool Use

> Original Document: [Tool Use](https://docs.agno.com/examples/models/huggingface/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.856Z

---

# Tool Use

## Code

```python cookbook/models/huggingface/tool_use.py theme={null}
"""Please install dependencies using:
pip install openai ddgs newspaper4k lxml_html_clean agno
"""

from agno.agent import Agent
from agno.models.huggingface import HuggingFace
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=HuggingFace(id="Qwen/Qwen2.5-Coder-32B-Instruct"),
    tools=[DuckDuckGoTools()],
    description="You are a senior NYT researcher writing an article on a topic.",
    instructions=[
        "For a given topic, search for the top 5 links.",
        "Then read each URL and extract the article text, if a URL isn't available, ignore it.",
        "Analyse and prepare an NYT worthy article based on the information.",
    ],
    markdown=True,
    add_datetime_to_context=True,
)
agent.print_response("Simulation theory")

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
      python cookbook/models/huggingface/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/huggingface/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
