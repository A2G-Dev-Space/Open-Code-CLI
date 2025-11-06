# Basic Agent

> Original Document: [Basic Agent](https://docs.agno.com/examples/models/azure/openai/basic.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.389Z

---

# Basic Agent

## Code

```python cookbook/models/azure/openai/basic.py theme={null}
from agno.agent import Agent, RunOutput  # noqa
from agno.models.azure import AzureOpenAI

agent = Agent(model=AzureOpenAI(id="gpt-5-mini"), markdown=True)

# Get the response in a variable
# run: RunOutput = agent.run("Share a 2 sentence horror story")
# print(run.content)

# Print the response on the terminal
agent.print_response("Share a 2 sentence horror story")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export AZURE_OPENAI_API_KEY=xxx
    export AZURE_OPENAI_ENDPOINT=xxx
    export AZURE_DEPLOYMENT=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/azure/openai/basic.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/azure/openai/basic.py
      ```
    </CodeGroup>
  </Step>
</Steps>
