# Google Calendar Tools

> Original Document: [Google Calendar Tools](https://docs.agno.com/examples/concepts/tools/others/google_calendar.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:15.144Z

---

# Google Calendar Tools

## Code

```python cookbook/tools/google_calendar_tools.py theme={null}
from agno.agent import Agent
from agno.tools.googlecalendar import GoogleCalendarTools

agent = Agent(
    tools=[GoogleCalendarTools()],
        markdown=True,
)

agent.print_response("What events do I have today?")
agent.print_response("Schedule a meeting with John tomorrow at 2pm")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Set up Google Calendar credentials">
    ```bash  theme={null}
    export GOOGLE_CALENDAR_CREDENTIALS=path/to/credentials.json
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U google-auth-oauthlib google-auth-httplib2 google-api-python-client openai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/tools/google_calendar_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/tools/google_calendar_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>
