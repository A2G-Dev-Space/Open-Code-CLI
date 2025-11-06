# Linkup

> Original Document: [Linkup](https://docs.agno.com/concepts/tools/toolkits/search/linkup.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.080Z

---

# Linkup

> LinkupTools provides advanced web search capabilities with deep search options and structured results.

## Example

The following agent can perform advanced web searches using Linkup:

```python  theme={null}
from agno.agent import Agent
from agno.tools.linkup import LinkupTools

agent = Agent(
    instructions=[
        "You are a web search assistant that provides comprehensive search results",
        "Use Linkup to find detailed and relevant information from the web",
        "Provide structured search results with source attribution",
        "Help users find accurate and up-to-date information",
    ],
    tools=[LinkupTools()],
)

agent.print_response("Search for the latest developments in quantum computing", stream=True)
```

## Toolkit Params

| Parameter                       | Type            | Default           | Description                                        |
| ------------------------------- | --------------- | ----------------- | -------------------------------------------------- |
| `api_key`                       | `Optional[str]` | `None`            | Linkup API key. Uses LINKUP\_API\_KEY if not set.  |
| `depth`                         | `Literal`       | `"standard"`      | Search depth: "standard" or "deep".                |
| `output_type`                   | `Literal`       | `"searchResults"` | Output format: "searchResults" or "sourcedAnswer". |
| `enable_web_search_with_linkup` | `bool`          | `True`            | Enable web search functionality.                   |

## Toolkit Functions

| Function                 | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `web_search_with_linkup` | Perform advanced web searches with configurable depth and format. |

## Developer Resources

* View [Tools Source](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/linkup.py)
* [Linkup SDK Documentation](https://docs.linkup.com/)
* [Linkup API Reference](https://api.linkup.com/docs)
