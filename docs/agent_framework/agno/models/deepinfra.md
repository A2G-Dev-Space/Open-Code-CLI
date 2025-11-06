# DeepInfra

> Original Document: [DeepInfra](https://docs.agno.com/concepts/models/deepinfra.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.729Z

---

# DeepInfra

> Learn how to use DeepInfra models in Agno.

Leverage DeepInfra's powerful command models and more.

[DeepInfra](https://deepinfra.com) supports a wide range of models. See their library of models [here](https://deepinfra.com/models).

We recommend experimenting to find the best-suited model for your use-case. Here are some general recommendations:

* `deepseek-ai/DeepSeek-R1-Distill-Llama-70B` model is good for reasoning.
* `meta-llama/Llama-2-70b-chat-hf` model is good for basic use-cases.
* `meta-llama/Llama-3.3-70B-Instruct` model is good for multi-step tasks.

DeepInfra has rate limits. See the [docs](https://deepinfra.com/docs/advanced/rate-limits) for more information.

## Authentication

Set your `DEEPINFRA_API_KEY` environment variable. Get your key from [here](https://deepinfra.com/dash/api_keys).

<CodeGroup>
  ```bash Mac theme={null}
  export DEEPINFRA_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx DEEPINFRA_API_KEY ***
  ```
</CodeGroup>

## Example

Use `DeepInfra` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.deepinfra import DeepInfra

  agent = Agent(
      model=DeepInfra(id="meta-llama/Llama-2-70b-chat-hf"),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/deepinfra/basic). </Note>

## Params

| Parameter  | Type            | Default                                 | Description                                                         |
| ---------- | --------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `id`       | `str`           | `"meta-llama/Llama-2-70b-chat-hf"`      | The id of the DeepInfra model to use                                |
| `name`     | `str`           | `"DeepInfra"`                           | The name of the model                                               |
| `provider` | `str`           | `"DeepInfra"`                           | The provider of the model                                           |
| `api_key`  | `Optional[str]` | `None`                                  | The API key for DeepInfra (defaults to DEEPINFRA\_API\_KEY env var) |
| `base_url` | `str`           | `"https://api.deepinfra.com/v1/openai"` | The base URL for the DeepInfra API                                  |

`DeepInfra` also supports the parameters of [OpenAI](/reference/models/openai).
