# OpenAI-compatible models

> Original Document: [OpenAI-compatible models](https://docs.agno.com/concepts/models/openai-like.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.766Z

---

# OpenAI-compatible models

> Learn how to use any OpenAI-like compatible endpoint with Agno

Many providers support the OpenAI API format. Use the `OpenAILike` model to access them by replacing the `base_url`.

## Example

<CodeGroup>
  ```python agent.py theme={null}
  from os import getenv
  from agno.agent import Agent
  from agno.models.openai.like import OpenAILike

  agent = Agent(
      model=OpenAILike(
          id="mistralai/Mixtral-8x7B-Instruct-v0.1",
          api_key=getenv("TOGETHER_API_KEY"),
          base_url="https://api.together.xyz/v1",
      )
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")
  ```
</CodeGroup>

## Parameters

| Parameter  | Type            | Default         | Description                                                        |
| ---------- | --------------- | --------------- | ------------------------------------------------------------------ |
| `id`       | `str`           | `"gpt-4o-mini"` | The id of the model to use                                         |
| `name`     | `str`           | `"OpenAILike"`  | The name of the model                                              |
| `provider` | `str`           | `"OpenAILike"`  | The provider of the model                                          |
| `api_key`  | `Optional[str]` | `None`          | The API key for the service (defaults to OPENAI\_API\_KEY env var) |
| `base_url` | `Optional[str]` | `None`          | The base URL for the API service                                   |

`OpenAILike` extends the OpenAI-compatible interface and supports all parameters from [OpenAIChat](/concepts/models/openai). Simply change the `base_url` and `api_key` to point to your preferred OpenAI-compatible service.
