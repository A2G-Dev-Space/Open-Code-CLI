# Audio Multi Turn

> Original Document: [Audio Multi Turn](https://docs.agno.com/examples/concepts/agent/multimodal/audio_multi_turn.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.422Z

---

# Audio Multi Turn

This example demonstrates how to create an agent that can handle multi-turn audio conversations, maintaining context between audio interactions while generating both text and audio responses.

## Code

```python audio_multi_turn.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.utils.audio import write_audio_to_file
from rich.pretty import pprint

agent = Agent(
    model=OpenAIChat(
        id="gpt-5-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "sage", "format": "wav"},
    ),
    add_history_to_context=True,
    db=SqliteDb(
        session_table="audio_multi_turn_sessions", db_file="tmp/audio_multi_turn.db"
    ),
)

run_response = agent.run("Is a golden retriever a good family dog?")
pprint(run_response.content)
if run_response.response_audio is not None:
    write_audio_to_file(
        audio=run_response.response_audio.content, filename="tmp/answer_1.wav"
    )

run_response = agent.run("What breed are we talking about?")
pprint(run_response.content)
if run_response.response_audio is not None:
    write_audio_to_file(
        audio=run_response.response_audio.content, filename="tmp/answer_2.wav"
    )
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
    touch audio_multi_turn.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python audio_multi_turn.py
      ```

      ```bash Windows theme={null}
      python audio_multi_turn.py
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
