# CometAPI

> Original Document: [CometAPI](https://docs.agno.com/concepts/models/cometapi.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.729Z

---

# CometAPI

> Learn how to use CometAPI models in Agno.

CometAPI is a platform for providing endpoints for Large Language models.

See all CometAPI supported models and pricing [here](https://api.cometapi.com/pricing).

## Authentication

Set your `COMETAPI_KEY` environment variable. Get your API key from [here](https://api.cometapi.com/console/token).

<CodeGroup>
  ```bash Mac theme={null}
  export COMETAPI_KEY=***
  ```

  ```bash Windows theme={null}
  setx COMETAPI_KEY ***
  ```
</CodeGroup>

## Example

Use `CometAPI` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.cometapi import CometAPI

  agent = Agent(model=CometAPI(), markdown=True)

  # Print the response in the terminal
  agent.print_response("Explain quantum computing in simple terms")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/cometapi/basic). </Note>

## Parameters

| Parameter  | Type            | Default                         | Description                                                  |
| ---------- | --------------- | ------------------------------- | ------------------------------------------------------------ |
| `id`       | `str`           | `"gpt-5-mini"`                  | The id of the model to use                                   |
| `name`     | `str`           | `"CometAPI"`                    | The name of the model                                        |
| `api_key`  | `Optional[str]` | `None`                          | The API key for CometAPI (defaults to COMETAPI\_KEY env var) |
| `base_url` | `str`           | `"https://api.cometapi.com/v1"` | The base URL for the CometAPI                                |

`CometAPI` extends the OpenAI-compatible interface and supports most parameters from the [OpenAI model](/concepts/models/openai).

## Available Models

CometAPI provides access to 300+ AI models. You can fetch the available models programmatically:

```python  theme={null}
from agno.models.cometapi import CometAPI

model = CometAPI()
available_models = model.get_available_models()
print(available_models)
```
