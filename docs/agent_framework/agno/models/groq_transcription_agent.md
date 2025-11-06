# Transcription Agent

> Original Document: [Transcription Agent](https://docs.agno.com/examples/models/groq/transcription_agent.md)
> Category: models
> Downloaded: 2025-11-06T11:51:15.837Z

---

# Transcription Agent

## Code

```python cookbook/models/groq/transcription_agent.py theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.models.groq import GroqTools

url = "https://agno-public.s3.amazonaws.com/demo_data/sample_conversation.wav"

agent = Agent(
    name="Groq Transcription Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[GroqTools(exclude_tools=["generate_speech"])],
)

agent.print_response(f"Please transcribe the audio file located at '{url}' to English")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export GROQ_API_KEY=xxx
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U groq openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/groq/transcription_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/groq/transcription_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
