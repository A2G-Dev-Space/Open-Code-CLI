# Nebius

> Original Document: [Nebius](https://docs.agno.com/concepts/models/nebius.md)
> Category: models
> Downloaded: 2025-11-06T11:51:13.767Z

---

# Nebius

> Learn how to use Nebius models in Agno.

Nebius AI Studio is a platform from Nebius that simplifies the process of building applications using AI models. It provides a suite of tools and services for developers to easily test, integrate and fine-tune various AI models, including those for text and image generation.
You can checkout the list of available models [here](https://studio.nebius.com/).

We recommend experimenting to find the best-suited-model for your use-case.

## Authentication

Set your `NEBIUS_API_KEY` environment variable. Get your key [from Nebius AI Studio here](https://studio.nebius.com/?modals=create-api-key).

<CodeGroup>
  ```bash Mac theme={null}
  export NEBIUS_API_KEY=***
  ```

  ```bash Windows theme={null}
  setx NEBIUS_API_KEY ***
  ```
</CodeGroup>

## Example

Use `Nebius` with your `Agent`:

<CodeGroup>
  ```python agent.py theme={null}
  from agno.agent import Agent
  from agno.models.nebius import Nebius

  agent = Agent(
       model=Nebius(
          id="meta-llama/Llama-3.3-70B-Instruct",
          api_key=os.getenv("NEBIUS_API_KEY")
      ),
      markdown=True
  )

  # Print the response in the terminal
  agent.print_response("Share a 2 sentence horror story.")
  ```
</CodeGroup>

<Note> View more examples [here](/examples/models/nebius/basic). </Note>

## Params

| Parameter  | Type            | Default                                    | Description                                                   |
| ---------- | --------------- | ------------------------------------------ | ------------------------------------------------------------- |
| `id`       | `str`           | `"meta-llama/Meta-Llama-3.1-70B-Instruct"` | The id of the Nebius model to use                             |
| `name`     | `str`           | `"Nebius"`                                 | The name of the model                                         |
| `provider` | `str`           | `"Nebius"`                                 | The provider of the model                                     |
| `api_key`  | `Optional[str]` | `None`                                     | The API key for Nebius (defaults to NEBIUS\_API\_KEY env var) |
| `base_url` | `str`           | `"https://api.studio.nebius.ai/v1"`        | The base URL for the Nebius API                               |
