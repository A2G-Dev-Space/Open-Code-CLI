# Slack Events

> Original Document: [Slack Events](https://docs.agno.com/reference-api/schema/slack/slack-events.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.194Z

---

# Slack Events

> Process incoming Slack events

## OpenAPI

````yaml post /slack/events
paths:
  path: /slack/events
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
          - type: object
            properties:
              status:
                allOf:
                  - type: string
                    title: Status
                    description: Processing status
                    default: ok
            title: SlackEventResponse
            description: Response model for Slack event processing
            refIdentifier: '#/components/schemas/SlackEventResponse'
        examples:
          example:
            value:
              status: ok
        description: Event processed successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Missing Slack headers
        examples: {}
        description: Missing Slack headers
    '403':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Invalid Slack signature
        examples: {}
        description: Invalid Slack signature
  deprecated: false
  type: path
components:
  schemas: {}

````