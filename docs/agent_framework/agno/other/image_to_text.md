# Image to Text Analysis

> Original Document: [Image to Text Analysis](https://docs.agno.com/examples/concepts/agent/multimodal/image_to_text.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.461Z

---

# Image to Text Analysis

This example demonstrates how to create an agent that can analyze images and generate creative text content based on the visual content.

## Code

```python image_to_text.py theme={null}
from pathlib import Path

from agno.agent import Agent
from agno.media import Image
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    markdown=True,
)

image_path = Path(__file__).parent.joinpath("sample.jpg")
agent.print_response(
    "Write a 3 sentence fiction story about the image",
    images=[Image(filepath=image_path)],
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch image_to_text.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python image_to_text.py
      ```

      ```bash Windows theme={null}
      python image_to_text.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/multimodal" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
