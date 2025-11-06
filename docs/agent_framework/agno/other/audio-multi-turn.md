# Multi-turn Audio Agent

> Original Document: [Multi-turn Audio Agent](https://docs.agno.com/examples/concepts/multimodal/audio-multi-turn.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.863Z

---

# Multi-turn Audio Agent

## Code

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.utils.audio import write_audio_to_file

agent = Agent(
    model=OpenAIChat(
        id="gpt-5-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
    ),
    debug_mode=True,
    add_history_to_context=True,
)

response_1 = agent.run("Is a golden retriever a good family dog?")
if response_1.response_audio is not None:
    write_audio_to_file(
        audio=response_1.response_audio.content, filename="tmp/answer_1.wav"
    )

response_2 = agent.run("Why do you say they are loyal?")
if response_2.response_audio is not None:
    write_audio_to_file(
        audio=response_2.response_audio.content, filename="tmp/answer_2.wav"
    )
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
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
      python cookbook/agent_concepts/multimodal/audio_multi_turn.py
      ```

      ```bash Windows theme={null}
      python cookbook/agent_concepts/multimodal/audio_multi_turn.py
      ```
    </CodeGroup>
  </Step>
</Steps>
