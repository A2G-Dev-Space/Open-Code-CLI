# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/ibm/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.871Z

---

# Basic Agent

## Code

```python cookbook/models/ibm/watsonx/basic.py theme={null}
from agno.agent import Agent, RunOutput
from agno.models.ibm import WatsonX

agent = Agent(model=WatsonX(id="ibm/granite-20b-code-instruct"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response in the terminal
agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export IBM_WATSONX_API_KEY=xxx
    export IBM_WATSONX_PROJECT_ID=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U ibm-watsonx-ai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/ibm/watsonx/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook\models\ibm\watsonx\basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>

This example creates an agent using the IBM WatsonX model and prints a response directly to the terminal. The `markdown=True` parameter tells the agent to format the output as markdown, which can be useful for displaying rich text content.
