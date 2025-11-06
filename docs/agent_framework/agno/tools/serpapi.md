# Serpapi

> Original Document: [Serpapi](https://docs.agno.com/concepts/tools/toolkits/search/serpapi.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.087Z

---

# Serpapi

**SerpApiTools** enable an Agent to search Google and YouTube for a query.

## Prerequisites

The following example requires the `google-search-results` library and an API key from [SerpApi](https://serpapi.com/).

```shell  theme={null}
pip install -U google-search-results
```

```shell  theme={null}
export SERP_API_KEY=***
```

## Example

The following agent will search Google for the query: "Whats happening in the USA" and share results.

```python cookbook/tools/serpapi_tools.py theme={null}
from agno.agent import Agent
from agno.tools.serpapi import SerpApiTools

agent = Agent(tools=[SerpApiTools()])
agent.print_response("Whats happening in the USA?", markdown=True)
```

## Toolkit Params

| Parameter               | Type            | Default | Description                                                                     |
| ----------------------- | --------------- | ------- | ------------------------------------------------------------------------------- |
| `api_key`               | `Optional[str]` | `None`  | SerpApi API key. If not provided, will use SERP\_API\_KEY environment variable. |
| `enable_search_google`  | `bool`          | `True`  | Enable Google search functionality.                                             |
| `enable_search_youtube` | `bool`          | `False` | Enable YouTube search functionality.                                            |
| `all`                   | `bool`          | `False` | Enable all available functions in the toolkit.                                  |

## Toolkit Functions

| Function         | Description                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search_google`  | Search Google using the Serpapi API. Parameters include `query` (str) for the search query and `num_results` (int, default=10) for the number of results. Returns JSON formatted search results with organic results, recipes, shopping results, knowledge graph, and related questions. |
| `search_youtube` | Search YouTube using the Serpapi API. Parameters include `query` (str) for the search query. Returns JSON formatted search results with video results, movie results, and channel results.                                                                                               |

## Developer Resources

* View [Tools](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/serpapi.py)
* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/tools/serpapi_tools.py)
