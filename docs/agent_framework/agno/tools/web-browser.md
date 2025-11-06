# Web Browser Tools

> Original Document: [Web Browser Tools](https://docs.agno.com/concepts/tools/toolkits/others/web-browser.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.054Z

---

# Web Browser Tools

> WebBrowser Tools enable an Agent to open a URL in a web browser.

## Example

```python cookbook/tools/webbrowser_tools.py theme={null}
from agno.agent import Agent
from agno.models.google import Gemini
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.webbrowser import WebBrowserTools

agent = Agent(
    model=Gemini("gemini-2.0-flash"),
    tools=[WebBrowserTools(), DuckDuckGoTools()],
    instructions=[
        "Find related websites and pages using DuckDuckGo"
        "Use web browser to open the site"
    ],
        markdown=True,
)
agent.print_response("Find an article explaining MCP and open it in the web browser.")
```

## Toolkit Params

| Parameter          | Type   | Default | Description                                   |
| ------------------ | ------ | ------- | --------------------------------------------- |
| `enable_open_page` | `bool` | `True`  | Enables functionality to open URLs in browser |
| `all`              | `bool` | `False` | Enables all functionality when set to True    |

## Toolkit Functions

| Function    | Description                  |
| ----------- | ---------------------------- |
| `open_page` | Opens a URL in a web browser |
