# Agent Infra Docker

> Original Document: [Agent Infra Docker](https://docs.agno.com/templates/agent-infra-docker/introduction.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.382Z

---

# Agent Infra Docker

The Agent Infra Docker template provides a simple Docker Compose file for running AgentOS. It contains:

* An AgentOS instance, serving Agents, Teams, Workflows and utilities using FastAPI.
* A PostgreSQL database for storing sessions, memories and knowledge.

<Snippet file="setup.mdx" />

<Snippet file="create-agent-infra-docker-codebase.mdx" />

After creating your codebase, the next step is to get it up and running locally using docker
