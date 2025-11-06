# AWS Bedrock

> Original Document: [AWS Bedrock](https://docs.agno.com/reference/models/bedrock.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.323Z

---

# AWS Bedrock

> Learn how to use AWS Bedrock models in Agno.

The AWS Bedrock model provides access to models hosted on AWS Bedrock.

## Parameters

| Parameter               | Type                       | Default        | Description                                                          |
| ----------------------- | -------------------------- | -------------- | -------------------------------------------------------------------- |
| `id`                    | `str`                      | Required       | The id of the AWS Bedrock model to use                               |
| `name`                  | `str`                      | `"AwsBedrock"` | The name of the model                                                |
| `provider`              | `str`                      | `"AWS"`        | The provider of the model                                            |
| `temperature`           | `Optional[float]`          | `None`         | Controls randomness in the model's output                            |
| `max_tokens`            | `Optional[int]`            | `None`         | Maximum number of tokens to generate                                 |
| `top_p`                 | `Optional[float]`          | `None`         | Controls diversity via nucleus sampling                              |
| `top_k`                 | `Optional[int]`            | `None`         | Controls diversity via top-k sampling                                |
| `stop_sequences`        | `Optional[List[str]]`      | `None`         | A list of strings that the model should stop generating text at      |
| `response_format`       | `Optional[str]`            | `None`         | The format of the response                                           |
| `request_params`        | `Optional[Dict[str, Any]]` | `None`         | Additional parameters to include in the request                      |
| `aws_region`            | `Optional[str]`            | `None`         | The AWS region to use (defaults to AWS\_REGION env var)              |
| `aws_access_key_id`     | `Optional[str]`            | `None`         | AWS access key ID (defaults to AWS\_ACCESS\_KEY\_ID env var)         |
| `aws_secret_access_key` | `Optional[str]`            | `None`         | AWS secret access key (defaults to AWS\_SECRET\_ACCESS\_KEY env var) |
| `aws_session_token`     | `Optional[str]`            | `None`         | AWS session token (defaults to AWS\_SESSION\_TOKEN env var)          |
| `aws_profile`           | `Optional[str]`            | `None`         | AWS profile to use (defaults to AWS\_PROFILE env var)                |
| `client_params`         | `Optional[Dict[str, Any]]` | `None`         | Additional parameters for client configuration                       |
