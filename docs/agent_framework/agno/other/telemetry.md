# Agno Telemetry

> Original Document: [Agno Telemetry](https://docs.agno.com/concepts/telemetry.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.873Z

---

# Agno Telemetry

> Understanding what Agno logs

Agno automatically logs anonymised data about agents, teams and workflows, as well as AgentOS configurations.
This helps us improve the Agno platform and provide better support.

<Note>
  No sensitive data is sent to the Agno servers. Telemetry is only used to improve the Agno platform.
</Note>

Agno logs the following:

* Agent runs
* Team runs
* Workflow runs
* AgentOS Launches

Below is an example of the payload sent to the Agno servers for an agent run:

```json  theme={null}
{
    "session_id": "123",
    "run_id": "123",
    "sdk_version": "1.0.0",
    "type": "agent",
    "data": {
        "agent_id": "123",
        "db_type": "PostgresDb",
        "model_provider": "openai",
        "model_name": "OpenAIResponses",
        "model_id": "gpt-5-mini",
        "parser_model": {
            "model_provider": "openai",
            "model_name": "OpenAIResponses",
            "model_id": "gpt-5-mini",
        },
        "output_model": {
            "model_provider": "openai",
            "model_name": "OpenAIResponses",
            "model_id": "gpt-5-mini",
        },
        "has_tools": true,
        "has_memory": false,
        "has_reasoning": true,
        "has_knowledge": true,
        "has_input_schema": false,
        "has_output_schema": false,
        "has_team": true,
    },
}
```

## Disabling Telemetry

You can disable this by setting `AGNO_TELEMETRY=false` in your environment or by setting `telemetry=False` on the agent, team, workflow or AgentOS.

```bash  theme={null}
export AGNO_TELEMETRY=false
```

or:

```python  theme={null}
agent = Agent(model=OpenAIChat(id="gpt-5-mini"), telemetry=False)
```

See the [Agent class reference](/reference/agents/agent) for more details.
