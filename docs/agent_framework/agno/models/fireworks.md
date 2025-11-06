# Fireworks

> Original Document: [Fireworks](https://docs.agno.com/concepts/models/fireworks.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.730Z

---

# Fireworks

> Learn how to use Fireworks models in Agno.

Fireworks is a platform for providing endpoints for Large Language models.

## Authentication

Set your `FIREWORKS_API_KEY` environment variable. Get your key from [here](https://fireworks.ai/account/api-keys).

<CodeGroup>
  ```bash Mac theme={null}
  export FIREWORKS_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx FIREWORKS_API_KEY ***
  ```
</CodeGroup>

## Prompt caching

Prompt caching will happen automatically using our `Fireworks` model. You can read more about how Fireworks handle caching in [their docs](https://docs.fireworks.ai/guides/prompt-caching#using-prompt-caching).

## Example

Use `Fireworks` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.fireworks import Fireworks

  agent = Agent(
      model=Fireworks(id="accounts/fireworks/models/firefunction-v2"),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/fireworks/basic). </Note>

## Parameters

| Parameter  | Type            | Default                                                | Description                                                         |
| ---------- | --------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| `id`       | `str`           | `"accounts/fireworks/models/llama-v3p1-405b-instruct"` | The id of the Fireworks model to use                                |
| `name`     | `str`           | `"Fireworks"`                                          | The name of the model                                               |
| `provider` | `str`           | `"Fireworks"`                                          | The provider of the model                                           |
| `api_key`  | `Optional[str]` | `None`                                                 | The API key for Fireworks (defaults to FIREWORKS\_API\_KEY env var) |
| `base_url` | `str`           | `"https://api.fireworks.ai/inference/v1"`              | The base URL for the Fireworks API                                  |

`Fireworks` extends the OpenAI-compatible interface and supports most parameters from the [OpenAI model](/concepts/models/openai).
