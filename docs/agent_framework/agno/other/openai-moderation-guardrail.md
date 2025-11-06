# OpenAIModerationGuardrail

> Original Document: [OpenAIModerationGuardrail](https://docs.agno.com/reference/hooks/openai-moderation-guardrail.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.234Z

---

# OpenAIModerationGuardrail

## Parameters

| Parameter              | Type        | Default                    | Description                                                                               |
| ---------------------- | ----------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `moderation_model`     | `str`       | `"omni-moderation-latest"` | The model to use for moderation.                                                          |
| `raise_for_categories` | `List[str]` | `None`                     | The categories to raise for.                                                              |
| `api_key`              | `str`       | `None`                     | The API key to use for moderation. Defaults to the OPENAI\_API\_KEY environment variable. |

## Moderation categories

You can check the current list of moderation categories in [OpenAI's docs](https://platform.openai.com/docs/guides/moderation#content-classifications).
