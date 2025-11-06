# High Fidelity Image Input

> Original Document: [High Fidelity Image Input](https://docs.agno.com/examples/concepts/agent/multimodal/image_input_high_fidelity.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.447Z

---

# High Fidelity Image Input

This example demonstrates how to use high fidelity image analysis with an AI agent by setting the detail parameter.

## Code

```python image_input_high_fidelity.py theme={null}
from agno.agent import Agent
from agno.media import Image
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    markdown=True,
)

agent.print_response(
    "What's in these images",
    images=[
        Image(
            url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            detail="high",
        )
    ],
)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
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
    touch image_input_high_fidelity.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python image_input_high_fidelity.py
      ```

      ```bash Windows   theme={null}
      python image_input_high_fidelity.py
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
