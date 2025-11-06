# Stream Message

> Original Document: [Stream Message](https://docs.agno.com/reference-api/schema/a2a/stream-message.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.089Z

---

# Stream Message

> Stream a message to an Agno Agent, Team, or Workflow.The Agent, Team or Workflow is identified via the 'agentId' field in params.message or X-Agent-ID header. Optional: Pass user ID via X-User-ID header (recommended) or 'userId' in params.message.metadata. Returns real-time updates as newline-delimited JSON (NDJSON).

## OpenAPI

````yaml post /a2a/message/stream
paths:
  path: /a2a/message/stream
  method: post
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Streaming response with task updates
      application/x-ndjson:
        schemaArray:
          - type: file
            contentMediaType: application/x-ndjson
        examples:
          example:
            value: >
              {"jsonrpc":"2.0","id":"request-123","result":{"taskId":"task-456","status":"working"}}

              {"jsonrpc":"2.0","id":"request-123","result":{"messageId":"msg-1","role":"agent","parts":[{"kind":"text","text":"Response"}]}}
        description: Streaming response with task updates
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Invalid request or unsupported method
        examples: {}
        description: Invalid request or unsupported method
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Agent, Team, or Workflow not found
        examples: {}
        description: Agent, Team, or Workflow not found
  deprecated: false
  type: path
components:
  schemas: {}

````