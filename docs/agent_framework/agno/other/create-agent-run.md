# Create Agent Run

> Original Document: [Create Agent Run](https://docs.agno.com/reference-api/schema/agents/create-agent-run.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.100Z

---

# Create Agent Run

> Execute an agent with a message and optional media files. Supports both streaming and non-streaming responses.

**Features:**
- Text message input with optional session management
- Multi-media support: images (PNG, JPEG, WebP), audio (WAV, MP3), video (MP4, WebM, etc.)
- Document processing: PDF, CSV, DOCX, TXT, JSON
- Real-time streaming responses with Server-Sent Events (SSE)
- User and session context preservation

**Streaming Response:**
When `stream=true`, returns SSE events with `event` and `data` fields.

## OpenAPI

````yaml post /agents/{agent_id}/runs
paths:
  path: /agents/{agent_id}/runs
  method: post
  request:
    security:
      - title: HTTPBearer
        parameters:
          query: {}
          header:
            Authorization:
              type: http
              scheme: bearer
          cookie: {}
    parameters:
      path:
        agent_id:
          schema:
            - type: string
              required: true
              title: Agent Id
      query: {}
      header: {}
      cookie: {}
    body:
      multipart/form-data:
        schemaArray:
          - type: object
            properties:
              message:
                allOf:
                  - type: string
                    title: Message
              stream:
                allOf:
                  - type: boolean
                    title: Stream
                    default: false
              session_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Session Id
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              files:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                          format: binary
                        type: array
                      - type: 'null'
                    title: Files
            required: true
            title: Body_create_agent_run
            refIdentifier: '#/components/schemas/Body_create_agent_run'
            requiredProperties:
              - message
        examples:
          example:
            value:
              message: <string>
              stream: false
              session_id: <string>
              user_id: <string>
              files:
                - null
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Agent run executed successfully
      text/event-stream:
        schemaArray:
          - type: file
            contentMediaType: text/event-stream
        examples:
          event_stream:
            summary: Example event stream response
            value: |+
              event: RunStarted
              data: {"content": "Hello!", "run_id": "123..."}

        description: Agent run executed successfully
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - type: string
                    title: Detail
              error_code:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Error Code
            title: BadRequestResponse
            refIdentifier: '#/components/schemas/BadRequestResponse'
            requiredProperties:
              - detail
            example:
              detail: Bad request
              error_code: BAD_REQUEST
        examples:
          example:
            value:
              detail: Bad request
              error_code: BAD_REQUEST
        description: Invalid request or unsupported file type
    '401':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - type: string
                    title: Detail
              error_code:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Error Code
            title: UnauthenticatedResponse
            refIdentifier: '#/components/schemas/UnauthenticatedResponse'
            requiredProperties:
              - detail
            example:
              detail: Unauthenticated access
              error_code: UNAUTHENTICATED
        examples:
          example:
            value:
              detail: Unauthenticated access
              error_code: UNAUTHENTICATED
        description: Unauthorized
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - type: string
                    title: Detail
              error_code:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Error Code
            title: NotFoundResponse
            refIdentifier: '#/components/schemas/NotFoundResponse'
            requiredProperties:
              - detail
            example:
              detail: Not found
              error_code: NOT_FOUND
        examples:
          example:
            value:
              detail: Not found
              error_code: NOT_FOUND
        description: Agent not found
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - type: string
                    title: Detail
              error_code:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Error Code
            title: ValidationErrorResponse
            refIdentifier: '#/components/schemas/ValidationErrorResponse'
            requiredProperties:
              - detail
            example:
              detail: Validation error
              error_code: VALIDATION_ERROR
        examples:
          example:
            value:
              detail: Validation error
              error_code: VALIDATION_ERROR
        description: Validation Error
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - type: string
                    title: Detail
              error_code:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Error Code
            title: InternalServerErrorResponse
            refIdentifier: '#/components/schemas/InternalServerErrorResponse'
            requiredProperties:
              - detail
            example:
              detail: Internal server error
              error_code: INTERNAL_SERVER_ERROR
        examples:
          example:
            value:
              detail: Internal server error
              error_code: INTERNAL_SERVER_ERROR
        description: Internal Server Error
  deprecated: false
  type: path
components:
  schemas: {}

````