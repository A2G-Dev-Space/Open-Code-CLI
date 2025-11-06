# Knowledge Management

> Original Document: [Knowledge Management](https://docs.agno.com/agent-os/features/knowledge-management.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.528Z

---

# Knowledge Management

> Upload, organize, and manage knowledge for your agents in AgentOS

## Overview

Upload files, add web pages, or paste text to build a searchable knowledge base for your agents. AgentOS indexes content and shows processing status so you can track what’s ready to use.

<Note>
  <strong>Prerequisites</strong>: Your AgentOS must be connected and active. If
  you see “Disconnected” or “Inactive,” review your{" "}
  <a href="/agent-os/connecting-your-os">connection settings</a>.
</Note>

## Accessing Knowledge

* Open the `Knowledge` section in the sidebar.
* If multiple knowledge databases are configured, select one from the database selector in the header.
* Use the `Refresh` button to sync status and content.

## What You Can Add

* Files: `.pdf`, `.csv`, `.json`, `.txt`, `.doc`, `.docx`
* Web: Website URLs (pages) or direct file links
* Text: Type or paste content directly

<Tip>
  Available processing options (Readers and Chunkers) are provided by your OS
  and may vary by file/URL type.
</Tip>

## Adding Content

1. Start an upload

* Click `ADD NEW CONTENT`, then choose `FILE`, `WEB`, or `TEXT`.

2. FILE

* Drag & drop or select files. You can also add a file URL.
* Add details per item: Name, Description, Metadata, Reader, and optional Chunker.
* Names must be unique across items.
* Save to upload one or many at once.

3. WEB

* Enter one or more URLs and add them to the list.
* Add details per item as above (Name, Description, Metadata, Reader/Chunker).
* Save to upload all listed URLs.

4. TEXT

* Paste or type content.
* Set Name, optional Description/Metadata, and Reader/Chunker.
* Add Content to upload.

## Useful Links

<CardGroup cols={2}>
  <Card title="Agent Knowledge" icon="user" href="/concepts/agents/knowledge">
    Learn how to add knowledge to agents and use RAG
  </Card>

  <Card title="Team Knowledge" icon="users" href="/concepts/teams/knowledge">
    Understand knowledge sharing in team environments
  </Card>
</CardGroup>
