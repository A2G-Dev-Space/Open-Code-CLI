# Sambanova

> Original Document: [Sambanova](https://docs.agno.com/concepts/models/sambanova.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.793Z

---

# Sambanova

> Learn how to use Sambanova with Agno.

Sambanova is a platform for providing endpoints for Large Language models. Note that Sambanova currently does not support function calling.

## Authentication

Set your `SAMBANOVA_API_KEY` environment variable. Get your key from [here](https://cloud.sambanova.ai/apis).

<CodeGroup>
  ```bash Mac theme={null}
  export SAMBANOVA_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx SAMBANOVA_API_KEY ***
  ```
</CodeGroup>

## Example

Use `Sambanova` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.sambanova import Sambanova

  agent = Agent(model=Sambanova(), markdown=True)

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")

  ```
</CodeGroup>

## Params

| Parameter  | Type            | Default                         | Description                                                         |
| ---------- | --------------- | ------------------------------- | ------------------------------------------------------------------- |
| `id`       | `str`           | `"Meta-Llama-3.1-8B-Instruct"`  | The id of the SambaNova model to use                                |
| `name`     | `str`           | `"SambaNova"`                   | The name of the model                                               |
| `provider` | `str`           | `"SambaNova"`                   | The provider of the model                                           |
| `api_key`  | `Optional[str]` | `None`                          | The API key for SambaNova (defaults to SAMBANOVA\_API\_KEY env var) |
| `base_url` | `str`           | `"https://api.sambanova.ai/v1"` | The base URL for the SambaNova API                                  |

`Sambanova` also supports the params of [OpenAI](/reference/models/openai).
