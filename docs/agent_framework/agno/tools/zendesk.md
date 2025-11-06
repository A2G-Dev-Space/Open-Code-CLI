# Zendesk

> Original Document: [Zendesk](https://docs.agno.com/concepts/tools/toolkits/others/zendesk.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.065Z

---

# Zendesk

**ZendeskTools** enable an Agent to access Zendesk API to search for articles.

## Prerequisites

The following example requires the `requests` library and auth credentials.

```shell  theme={null}
pip install -U requests
```

```shell  theme={null}
export ZENDESK_USERNAME=***
export ZENDESK_PW=***
export ZENDESK_COMPANY_NAME=***
```

## Example

The following agent will run seach Zendesk for "How do I login?" and print the response.

```python cookbook/tools/zendesk_tools.py theme={null}
from agno.agent import Agent
from agno.tools.zendesk import ZendeskTools

agent = Agent(tools=[ZendeskTools()])
agent.print_response("How do I login?", markdown=True)
```

## Toolkit Params

| Parameter               | Type   | Default | Description                                                             |
| ----------------------- | ------ | ------- | ----------------------------------------------------------------------- |
| `username`              | `str`  | -       | The username used for authentication or identification purposes.        |
| `password`              | `str`  | -       | The password associated with the username for authentication purposes.  |
| `company_name`          | `str`  | -       | The name of the company related to the user or the data being accessed. |
| `enable_search_zendesk` | `bool` | `True`  | Enable the search Zendesk functionality.                                |
| `all`                   | `bool` | `False` | Enable all functionality.                                               |

## Toolkit Functions

| Function         | Description                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `search_zendesk` | This function searches for articles in Zendesk Help Center that match the given search string. |

## Developer Resources

* View [Tools](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/zendesk.py)
* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/tools/zendesk_tools.py)
