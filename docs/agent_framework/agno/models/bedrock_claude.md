# AWS Bedrock Claude

> Original Document: [AWS Bedrock Claude](https://docs.agno.com/reference/models/bedrock_claude.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.331Z

---

# AWS Bedrock Claude

The AWS Bedrock Claude model provides access to Anthropic's Claude models hosted on AWS Bedrock.

## Parameters

| Parameter               | Type                       | Default                                       | Description                                                          |
| ----------------------- | -------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| `id`                    | `str`                      | `"anthropic.claude-3-5-sonnet-20241022-v2:0"` | The id of the AWS Bedrock Claude model to use                        |
| `name`                  | `str`                      | `"BedrockClaude"`                             | The name of the model                                                |
| `provider`              | `str`                      | `"AWS"`                                       | The provider of the model                                            |
| `max_tokens`            | `Optional[int]`            | `4096`                                        | Maximum number of tokens to generate in the chat completion          |
| `thinking`              | `Optional[Dict[str, Any]]` | `None`                                        | Configuration for the thinking (reasoning) process                   |
| `temperature`           | `Optional[float]`          | `None`                                        | Controls randomness in the model's output                            |
| `stop_sequences`        | `Optional[List[str]]`      | `None`                                        | A list of strings that the model should stop generating text at      |
| `top_p`                 | `Optional[float]`          | `None`                                        | Controls diversity via nucleus sampling                              |
| `top_k`                 | `Optional[int]`            | `None`                                        | Controls diversity via top-k sampling                                |
| `cache_system_prompt`   | `Optional[bool]`           | `False`                                       | Whether to cache the system prompt for improved performance          |
| `extended_cache_time`   | `Optional[bool]`           | `False`                                       | Whether to use extended cache time (1 hour instead of default)       |
| `request_params`        | `Optional[Dict[str, Any]]` | `None`                                        | Additional parameters to include in the request                      |
| `aws_region`            | `Optional[str]`            | `None`                                        | The AWS region to use (defaults to AWS\_REGION env var)              |
| `aws_access_key_id`     | `Optional[str]`            | `None`                                        | AWS access key ID (defaults to AWS\_ACCESS\_KEY\_ID env var)         |
| `aws_secret_access_key` | `Optional[str]`            | `None`                                        | AWS secret access key (defaults to AWS\_SECRET\_ACCESS\_KEY env var) |
| `aws_session_token`     | `Optional[str]`            | `None`                                        | AWS session token (defaults to AWS\_SESSION\_TOKEN env var)          |
| `aws_profile`           | `Optional[str]`            | `None`                                        | AWS profile to use (defaults to AWS\_PROFILE env var)                |
| `client_params`         | `Optional[Dict[str, Any]]` | `None`                                        | Additional parameters for client configuration                       |
