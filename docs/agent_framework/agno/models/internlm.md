# InternLM

> Original Document: [InternLM](https://docs.agno.com/reference/models/internlm.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.327Z

---

# InternLM

The InternLM model provides access to the InternLM model.

## Parameters

| Parameter  | Type            | Default                                                | Description                                                       |
| ---------- | --------------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `id`       | `str`           | `"internlm/internlm2_5-7b-chat"`                       | The id of the InternLM model to use                               |
| `name`     | `str`           | `"InternLM"`                                           | The name of the model                                             |
| `provider` | `str`           | `"InternLM"`                                           | The provider of the model                                         |
| `api_key`  | `Optional[str]` | `None`                                                 | The API key for InternLM (defaults to INTERNLM\_API\_KEY env var) |
| `base_url` | `str`           | `"https://internlm-chat.intern-ai.org.cn/puyu/api/v1"` | The base URL for the InternLM API                                 |

InternLM extends the OpenAI-compatible interface and supports most parameters from OpenAI.
