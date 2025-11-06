# Brandfetch

> Original Document: [Brandfetch](https://docs.agno.com/concepts/tools/toolkits/others/brandfetch.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:13.955Z

---

# Brandfetch

> BrandfetchTools provides access to brand data and logo information through the Brandfetch API.

## Example

The following agent can search for brand information and retrieve brand data:

```python  theme={null}
from agno.agent import Agent
from agno.tools.brandfetch import BrandfetchTools

agent = Agent(
    instructions=[
        "You are a brand research assistant that helps find brand information",
        "Use Brandfetch to retrieve logos, colors, and other brand assets",
        "Provide comprehensive brand information when requested",
    ],
    tools=[BrandfetchTools()],
)

agent.print_response("Find brand information for Apple Inc.", stream=True)
```

## Toolkit Params

| Parameter                     | Type              | Default                          | Description                                                   |
| ----------------------------- | ----------------- | -------------------------------- | ------------------------------------------------------------- |
| `api_key`                     | `Optional[str]`   | `None`                           | Brandfetch API key. Uses BRANDFETCH\_API\_KEY if not set.     |
| `client_id`                   | `Optional[str]`   | `None`                           | Brandfetch Client ID for search. Uses BRANDFETCH\_CLIENT\_ID. |
| `base_url`                    | `str`             | `"https://api.brandfetch.io/v2"` | Brandfetch API base URL.                                      |
| `timeout`                     | `Optional[float]` | `20.0`                           | Request timeout in seconds.                                   |
| `enable_search_by_identifier` | `bool`            | `True`                           | Enable searching brands by domain/identifier.                 |
| `enable_search_by_brand`      | `bool`            | `False`                          | Enable searching brands by name.                              |
| `async_tools`                 | `bool`            | `False`                          | Enable async versions of tools.                               |

## Toolkit Functions

| Function                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `search_by_identifier`  | Search for brand data using domain or company identifier. |
| `search_by_brand`       | Search for brands by name (requires client\_id).          |
| `asearch_by_identifier` | Async version of search by identifier.                    |
| `asearch_by_brand`      | Async version of search by brand name.                    |

## Developer Resources

* View [Tools Source](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/brandfetch.py)
* [Brandfetch API Documentation](https://docs.brandfetch.com/)
