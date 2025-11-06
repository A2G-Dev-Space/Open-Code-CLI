# Giphy

> Original Document: [Giphy](https://docs.agno.com/concepts/tools/toolkits/others/giphy.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:13.988Z

---

# Giphy

**GiphyTools** enables an Agent to search for GIFs on GIPHY.

## Prerequisites

```shell  theme={null}
export GIPHY_API_KEY=***
```

## Example

The following agent will search GIPHY for a GIF appropriate for a birthday message.

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.giphy import GiphyTools


gif_agent = Agent(
    name="Gif Generator Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[GiphyTools()],
    description="You are an AI agent that can generate gifs using Giphy.",
)

gif_agent.print_response("I want a gif to send to a friend for their birthday.")
```

## Toolkit Params

| Parameter            | Type   | Default | Description                                       |
| -------------------- | ------ | ------- | ------------------------------------------------- |
| `api_key`            | `str`  | `None`  | If you want to manually supply the GIPHY API key. |
| `limit`              | `int`  | `1`     | The number of GIFs to return in a search.         |
| `enable_search_gifs` | `bool` | `True`  | Enable the search\_gifs functionality.            |
| `all`                | `bool` | `False` | Enable all functionality.                         |

## Toolkit Functions

| Function      | Description                                         |
| ------------- | --------------------------------------------------- |
| `search_gifs` | Searches GIPHY for a GIF based on the query string. |

## Developer Resources

* View [Tools](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/giphy.py)
* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/tools/giphy_tools.py)
