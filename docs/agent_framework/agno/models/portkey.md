# Portkey

> Original Document: [Portkey](https://docs.agno.com/concepts/models/portkey.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.797Z

---

# Portkey

> Learn how to use models through the Portkey AI Gateway in Agno.

Portkey is an AI Gateway that provides a unified interface to access multiple AI providers with advanced features like routing, load balancing, retries, and observability. Use Portkey to build production-ready AI applications with better reliability and cost optimization.

With Portkey, you can:

* Route requests across multiple AI providers
* Implement fallback mechanisms for better reliability
* Monitor and analyze your AI usage
* Cache responses for cost optimization
* Apply rate limiting and usage controls

## Authentication

You need both a Portkey API key and a virtual key for model routing. Get them [from Portkey here](https://app.portkey.ai/).

<CodeGroup>
  ```bash Mac theme={null}
  export PORTKEY_API_KEY=***
  export PORTKEY_VIRTUAL_KEY=***
  ```

  ```bash Windows theme={null}
  setx PORTKEY_API_KEY ***
  setx PORTKEY_VIRTUAL_KEY ***
  ```
</CodeGroup>

## Example

Use `Portkey` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.portkey import Portkey

  agent = Agent(
      model=Portkey(id="gpt-5-mini"),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("What is Portkey and why would I use it as an AI gateway?")
  ```
</CodeGroup>

## Advanced Configuration

You can configure Portkey with custom routing and retry policies:

```python  theme={null}
from agno.agent import Agent
from agno.models.portkey import Portkey

config = {
    "strategy": {
        "mode": "fallback"
    },
    "targets": [
        {"virtual_key": "openai-key"},
        {"virtual_key": "anthropic-key"}
    ]
}

agent = Agent(
    model=Portkey(
        id="gpt-5-mini",
        config=config,
    ),
)
```

<Note> View more examples [here](/examples/models/portkey/basic). </Note>

## Params

| Parameter     | Type            | Default                       | Description                                                     |
| ------------- | --------------- | ----------------------------- | --------------------------------------------------------------- |
| `id`          | `str`           | `"gpt-4o-mini"`               | The id of the model to use through Portkey                      |
| `name`        | `str`           | `"Portkey"`                   | The name of the model                                           |
| `provider`    | `str`           | `"Portkey"`                   | The provider of the model                                       |
| `api_key`     | `Optional[str]` | `None`                        | The API key for Portkey (defaults to PORTKEY\_API\_KEY env var) |
| `base_url`    | `str`           | `"https://api.portkey.ai/v1"` | The base URL for the Portkey API                                |
| `virtual_key` | `Optional[str]` | `None`                        | The virtual key for the underlying provider                     |
| `trace_id`    | `Optional[str]` | `None`                        | Custom trace ID for request tracking                            |
| `config_id`   | `Optional[str]` | `None`                        | Configuration ID for Portkey routing                            |

`Portkey` also supports the params of [OpenAI](/reference/models/openai).
