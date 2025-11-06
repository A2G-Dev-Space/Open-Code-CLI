# IBM WatsonX

> Original Document: [IBM WatsonX](https://docs.agno.com/concepts/models/ibm-watsonx.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.751Z

---

# IBM WatsonX

> Learn how to use IBM WatsonX models in Agno.

IBM WatsonX provides access to powerful foundation models through IBM's cloud platform.

See all the IBM WatsonX supported models [here](https://www.ibm.com/products/watsonx-ai/foundation-models).

* We recommend using `meta-llama/llama-3-3-70b-instruct` for general use
* We recommend `ibm/granite-20b-code-instruct` for code-related tasks
* We recommend using `meta-llama/llama-3-2-11b-vision-instruct` for image understanding

#### Multimodal Support

With WatsonX we support `Image` as input

## Authentication

Set your `IBM_WATSONX_API_KEY` and `IBM_WATSONX_PROJECT_ID` environment variables. Get your credentials from [IBM Cloud](https://cloud.ibm.com/).
You can also set the `IBM_WATSONX_URL` environment variable to the URL of the WatsonX API you want to use. It defaults to `https://eu-de.ml.cloud.ibm.com`.

<CodeGroup>
  ```bash Mac theme={null}
  export IBM_WATSONX_API_KEY=***
  export IBM_WATSONX_PROJECT_ID=***
  ```

  ```bash Windows theme={null}
  setx IBM_WATSONX_API_KEY ***
  setx IBM_WATSONX_PROJECT_ID ***
  ```
</CodeGroup>

## Example

Use `WatsonX` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.ibm import WatsonX

  agent = Agent(
      model=WatsonX(id="meta-llama/llama-3-3-70b-instruct"),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")

  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/ibm/basic). </Note>

## Params

| Parameter       | Type                       | Default                     | Description                                                            |
| --------------- | -------------------------- | --------------------------- | ---------------------------------------------------------------------- |
| `id`            | `str`                      | `"ibm/granite-13b-chat-v2"` | The id of the IBM watsonx model to use                                 |
| `name`          | `str`                      | `"IBMWatsonx"`              | The name of the model                                                  |
| `provider`      | `str`                      | `"IBMWatsonx"`              | The provider of the model                                              |
| `api_key`       | `Optional[str]`            | `None`                      | The API key for IBM watsonx (defaults to WATSONX\_API\_KEY env var)    |
| `url`           | `Optional[str]`            | `None`                      | The URL for the IBM watsonx service                                    |
| `project_id`    | `Optional[str]`            | `None`                      | The project ID for IBM watsonx                                         |
| `space_id`      | `Optional[str]`            | `None`                      | The space ID for IBM watsonx                                           |
| `deployment_id` | `Optional[str]`            | `None`                      | The deployment ID for custom deployments                               |
| `params`        | `Optional[Dict[str, Any]]` | `None`                      | Additional generation parameters (temperature, max\_new\_tokens, etc.) |

`WatsonX` is a subclass of the [Model](/reference/models/model) class and has access to the same params.
