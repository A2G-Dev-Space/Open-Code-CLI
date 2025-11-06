# AgentOSConfig

> Original Document: [AgentOSConfig](https://docs.agno.com/reference/agent-os/configuration.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:17.206Z

---

# AgentOSConfig

<Snippet file="agent-os-configuration-reference.mdx" />

## Using a YAML Configuration File

You can also provide your AgentOS configuration via a YAML file.

You can define all the previously mentioned configuration options in the file:

```yaml  theme={null}
# List of models available in the AgentOS
available_models:
  - <MODEL_STRING>
  ...

# Configuration for the Chat page
chat:
  quick_prompts:
    <AGENT_ID>:
      - <PROMPT_1>
      - <PROMPT_2>
      - <PROMPT_3>
      ...
    ...


# Configuration for the Evals page
evals:
  available_models:
    - <MODEL_STRING>
    ...
  display_name: <DISPLAY_NAME>
  dbs:
    - <DB_ID>
      domain_config:
        available_models:
          - <MODEL_STRING>
          ...
        display_name: <DISPLAY_NAME>
    ...


# Configuration for the Knowledge page
knowledge:
  display_name: <DISPLAY_NAME>
  dbs:
    - <DB_ID>
      domain_config:
        display_name: <DISPLAY_NAME>
    ...

# Configuration for the Memory page
memory:
  display_name: <DISPLAY_NAME>
  dbs:
    - <DB_ID>
      domain_config:
        display_name: <DISPLAY_NAME>
    ...

# Configuration for the Session page
session:
  display_name: <DISPLAY_NAME>
  dbs:
    - <DB_ID>
      domain_config:
        display_name: <DISPLAY_NAME>
    ...

# Configuration for the Metrics page
metrics:
  display_name: <DISPLAY_NAME>
  dbs:
    - <DB_ID>
      domain_config:
        display_name: <DISPLAY_NAME>
    ...
```
