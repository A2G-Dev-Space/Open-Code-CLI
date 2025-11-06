# SiliconFlow

> Original Document: [SiliconFlow](https://docs.agno.com/concepts/models/siliconflow.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.807Z

---

# SiliconFlow

> Learn how to use Siliconflow models in Agno.

Siliconflow is a platform for providing endpoints for Large Language models.

Explore Siliconflow’s models [here](https://siliconflow.ai/models).

## Authentication

Set your `SILICONFLOW_API_KEY` environment variable. Get your key [from Siliconflow here](https://siliconflow.ai).

<CodeGroup>
  ```bash Mac theme={null}
  export SILICONFLOW_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx SILICONFLOW_API_KEY ***
  ```
</CodeGroup>

## Example

Use `Siliconflow` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.siliconflow import Siliconflow

  agent = Agent(model=Siliconflow(), markdown=True)

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/siliconflow/basic). </Note>

## Params

| Parameter  | Type            | Default                                   | Description                                                             |
| ---------- | --------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `id`       | `str`           | `"meta-llama/Meta-Llama-3.1-8B-Instruct"` | The id of the SiliconFlow model to use                                  |
| `name`     | `str`           | `"SiliconFlow"`                           | The name of the model                                                   |
| `provider` | `str`           | `"SiliconFlow"`                           | The provider of the model                                               |
| `api_key`  | `Optional[str]` | `None`                                    | The API key for SiliconFlow (defaults to SILICONFLOW\_API\_KEY env var) |
| `base_url` | `str`           | `"https://api.siliconflow.cn/v1"`         | The base URL for the SiliconFlow API                                    |

`Siliconflow` also supports the params of [OpenAI](/reference/models/openai).
