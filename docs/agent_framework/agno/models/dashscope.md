# DashScope

> Original Document: [DashScope](https://docs.agno.com/concepts/models/dashscope.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.729Z

---

# DashScope

> Learn how to use DashScope models in Agno.

Leverage DashScope's powerful command models and more.

[DashScope](https://dashscope.aliyun.com/) supports a wide range of models

We recommend experimenting to find the best-suited model for your use-case. Here are some general recommendations:

* `qwen-plus` model is good for most use-cases.

## Authentication

Set your `DASHSCOPE_API_KEY` environment variable. Get your key from [here](https://dashscope.aliyun.com/api-keys).

<CodeGroup>
  ```bash Mac theme={null}
  export DASHSCOPE_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx DASHSCOPE_API_KEY ***
  ```
</CodeGroup>

## Example

Use `DashScope` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.dashscope import DashScope

  agent = Agent(
      model=DashScope(id="qwen-plus"),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/dashscope/basic). </Note>

## Parameters

| Parameter          | Type             | Default                                                    | Description                                                         |
| ------------------ | ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `id`               | `str`            | `"qwen-plus"`                                              | The id of the Qwen model to use                                     |
| `name`             | `str`            | `"Qwen"`                                                   | The name of the model                                               |
| `provider`         | `str`            | `"Dashscope"`                                              | The provider of the model                                           |
| `api_key`          | `Optional[str]`  | `None`                                                     | The API key for DashScope (defaults to DASHSCOPE\_API\_KEY env var) |
| `base_url`         | `str`            | `"https://dashscope-intl.aliyuncs.com/compatible-mode/v1"` | The base URL for the DashScope API                                  |
| `enable_thinking`  | `bool`           | `False`                                                    | Enable thinking process for reasoning models                        |
| `include_thoughts` | `Optional[bool]` | `None`                                                     | Include thinking process in response (alternative parameter)        |
| `thinking_budget`  | `Optional[int]`  | `None`                                                     | Budget for thinking tokens in reasoning models                      |

`DashScope` extends the OpenAI-compatible interface and supports most parameters from the [OpenAI model](/concepts/models/openai).

## Thinking Models

DashScope supports reasoning models with thinking capabilities:

```python  theme={null}
from agno.agent import Agent
from agno.models.dashscope import DashScope

agent = Agent(
    model=DashScope(
        id="qwen-plus",
        enable_thinking=True,
        thinking_budget=5000
    ),
    markdown=True
)
```
