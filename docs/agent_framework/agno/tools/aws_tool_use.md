# Agent with Tools

> Original Document: [Agent with Tools](https://docs.agno.com/examples/models/aws/bedrock/tool_use.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.620Z

---

# Agent with Tools

## Code

```python cookbook/models/aws/bedrock/tool_use.py theme={null}
from agno.agent import Agent
from agno.models.aws import AwsBedrock
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=AwsBedrock(id="mistral.mistral-large-2402-v1:0"),
    tools=[DuckDuckGoTools()],
        markdown=True,
)
agent.print_response("Whats happening in France?", stream=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your AWS Credentials">
    ```bash  theme={null}
    export AWS_ACCESS_KEY_ID=***
    export AWS_SECRET_ACCESS_KEY=***
    export AWS_REGION=***
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U boto3 ddgs agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/aws/bedrock/tool_use.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/aws/bedrock/tool_use.py
      ```
    </CodeGroup>
  </Step>
</Steps>
