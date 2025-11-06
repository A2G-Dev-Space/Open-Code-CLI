# Session Tracking

> Original Document: [Session Tracking](https://docs.agno.com/agent-os/features/session-tracking.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.536Z

---

# Session Tracking

> Monitor, analyze, and manage agent sessions through the AgentOS interface

## Overview

Sessions are durable conversation timelines that bind inputs, model outputs, tools, files, metrics, and summaries under a single `session_id`. AgentOS persists sessions for Agents, Teams, and Workflows so you can resume work, audit behavior, and analyze quality over time.

* A session collects ordered runs (each run contains messages, tool calls, and metrics).
* Summaries and metadata help you search, group, and reason about long histories.
* Token usage can be monitored per session via the metrics tab.
* Inspect details about the agent and models tied to each session.

<Frame>
  <video autoPlay muted loop playsInline style={{ borderRadius: "0.5rem", width: "100%", height: "auto" }}>
    <source src="https://mintcdn.com/agno-v2/xm93WWN8gg4nzCGE/videos/agentos-session-management.mp4?fit=max&auto=format&n=xm93WWN8gg4nzCGE&q=85&s=70dda8ee349f38e48272eff8cdd4719a" type="video/mp4" data-path="videos/agentos-session-management.mp4" />
  </video>
</Frame>

## Accessing Sessions

* Open the `Sessions` section in the sidebar.
* If multiple session databases are configured, pick one from the database selector in the header.
* Switch between `Agents` and `Teams` using the header tabs.
* Click `Reload page` (Refresh) to sync the list and statuses.

## Troubleshooting

* Sessions not loading: Ensure your OS is connected and active, select a session database, then click `Reload page`.
* No sessions yet: Start a conversation to generate sessions.
* Wrong list: Check the `Agents` vs `Teams` tab and sorting.
* Configuration errors: If you see endpoint or database errors, verify your OS endpoint and database settings.

## Useful Links

<CardGroup cols={3}>
  <Card title="Agent Sessions" icon="user" href="/concepts/agents/sessions">
    Learn about Agent sessions and multi-turn conversations
  </Card>

  <Card title="Team Sessions" icon="users" href="/concepts/teams/sessions">
    Understand Team sessions and collaborative workflows
  </Card>

  <Card title="Workflow Session State" icon="sitemap" href="/concepts/workflows/workflow_session_state">
    Master shared state between workflow components
  </Card>
</CardGroup>
