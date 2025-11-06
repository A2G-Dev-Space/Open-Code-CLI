# Agent Extra Metrics

> Original Document: [Agent Extra Metrics](https://docs.agno.com/examples/concepts/agent/other/agent_extra_metrics.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.470Z

---

# Agent Extra Metrics

This example demonstrates how to collect special token metrics including audio, cached, and reasoning tokens. It shows different types of advanced metrics available when working with various OpenAI models.

## Code

```python agent_extra_metrics.py theme={null}
"""Show special token metrics like audio, cached and reasoning tokens"""

import requests
from agno.agent import Agent
from agno.media import Audio
from agno.models.openai import OpenAIChat
from agno.utils.pprint import pprint_run_response

# Fetch the audio file and convert it to a base64 encoded string
url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content

agent = Agent(
    model=OpenAIChat(
        id="gpt-5-mini-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "sage", "format": "wav"},
    ),
    markdown=True,
)
run_response = agent.run(
    "What's in these recording?",
    audio=[Audio(content=wav_data, format="wav")],
)
pprint_run_response(run_response)
# Showing input audio, output audio and total audio tokens metrics
print(f"Input audio tokens: {run_response.metrics.audio_input_tokens}")
print(f"Output audio tokens: {run_response.metrics.audio_output_tokens}")
print(f"Audio tokens: {run_response.metrics.audio_total_tokens}")

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    markdown=True,
    telemetry=False,
)
run_response = agent.run(
    "Solve the trolley problem. Evaluate multiple ethical frameworks. Include an ASCII diagram of your solution.",
    stream=False,
)
pprint_run_response(run_response)
# Showing reasoning tokens metrics
print(f"Reasoning tokens: {run_response.metrics.reasoning_tokens}")

agent = Agent(model=OpenAIChat(id="gpt-5-mini"), markdown=True, telemetry=False)
agent.run("Share a 2 sentence horror story" * 150)
run_response = agent.run("Share a 2 sentence horror story" * 150)
# Showing cached tokens metrics
print(f"Cached tokens: {run_response.metrics.cache_read_tokens}")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai requests
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
    touch agent_extra_metrics.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python agent_extra_metrics.py
      ```

      ```bash Windows   theme={null}
      python agent_extra_metrics.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/other" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
