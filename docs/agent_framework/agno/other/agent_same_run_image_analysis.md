# Agent Same Run Image Analysis

> Original Document: [Agent Same Run Image Analysis](https://docs.agno.com/examples/concepts/agent/multimodal/agent_same_run_image_analysis.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.424Z

---

# Agent Same Run Image Analysis

This example demonstrates how to create an agent that generates an image using DALL-E and then analyzes the generated image in the same run, providing insights about the image's contents.

## Code

```python agent_same_run_image_analysis.py theme={null}
from agno.agent import Agent
from agno.tools.dalle import DalleTools

# Create an Agent with the DALL-E tool
agent = Agent(tools=[DalleTools()], name="DALL-E Image Generator")

response = agent.run(
    "Generate an image of a dog and tell what color the dog is.",
    markdown=True,
    debug_mode=True,
)

if response.images:
    print("Agent Response", response.content)
    print(response.images[0].url)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
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
    touch agent_same_run_image_analysis.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python agent_same_run_image_analysis.py
      ```

      ```bash Windows theme={null}
      python agent_same_run_image_analysis.py
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
