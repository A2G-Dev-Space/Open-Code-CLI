# Azure AI Foundry

> Original Document: [Azure AI Foundry](https://docs.agno.com/reference/models/azure.md)
> Category: models
> Downloaded: 2025-11-06T11:51:17.308Z

---

# Azure AI Foundry

The Azure AI Foundry model provides access to Azure-hosted AI Foundry models.

## Parameters

| Parameter           | Type                              | Default            | Description                                                                        |
| ------------------- | --------------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `id`                | `str`                             | `"gpt-4o"`         | The id of the model to use                                                         |
| `name`              | `str`                             | `"AzureAIFoundry"` | The name of the model                                                              |
| `provider`          | `str`                             | `"Azure"`          | The provider of the model                                                          |
| `temperature`       | `Optional[float]`                 | `None`             | Controls randomness in the model's output (0.0 to 2.0)                             |
| `max_tokens`        | `Optional[int]`                   | `None`             | Maximum number of tokens to generate in the response                               |
| `frequency_penalty` | `Optional[float]`                 | `None`             | Penalizes new tokens based on their frequency in the text so far (-2.0 to 2.0)     |
| `presence_penalty`  | `Optional[float]`                 | `None`             | Penalizes new tokens based on whether they appear in the text so far (-2.0 to 2.0) |
| `top_p`             | `Optional[float]`                 | `None`             | Controls diversity via nucleus sampling (0.0 to 1.0)                               |
| `stop`              | `Optional[Union[str, List[str]]]` | `None`             | Up to 4 sequences where the API will stop generating further tokens                |
| `seed`              | `Optional[int]`                   | `None`             | Random seed for deterministic sampling                                             |
| `model_extras`      | `Optional[Dict[str, Any]]`        | `None`             | Additional model-specific parameters                                               |
| `request_params`    | `Optional[Dict[str, Any]]`        | `None`             | Additional parameters to include in the request                                    |
| `api_key`           | `Optional[str]`                   | `None`             | The API key for Azure AI Foundry (defaults to AZURE\_API\_KEY env var)             |
| `api_version`       | `Optional[str]`                   | `None`             | The API version to use (defaults to AZURE\_API\_VERSION env var)                   |
| `azure_endpoint`    | `Optional[str]`                   | `None`             | The Azure endpoint URL (defaults to AZURE\_ENDPOINT env var)                       |
| `timeout`           | `Optional[float]`                 | `None`             | Request timeout in seconds                                                         |
| `max_retries`       | `Optional[int]`                   | `None`             | Maximum number of retries for failed requests                                      |
| `http_client`       | `Optional[httpx.Client]`          | `None`             | HTTP client instance for making requests                                           |
| `client_params`     | `Optional[Dict[str, Any]]`        | `None`             | Additional parameters for client configuration                                     |
