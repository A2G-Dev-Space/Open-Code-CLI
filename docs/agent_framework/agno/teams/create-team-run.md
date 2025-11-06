# Create Team Run

> Original Document: [Create Team Run](https://docs.agno.com/reference-api/schema/teams/create-team-run.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:17.192Z

---

# Create Team Run

> Execute a team collaboration with multiple agents working together on a task.

**Features:**
- Text message input with optional session management
- Multi-media support: images (PNG, JPEG, WebP), audio (WAV, MP3), video (MP4, WebM, etc.)
- Document processing: PDF, CSV, DOCX, TXT, JSON
- Real-time streaming responses with Server-Sent Events (SSE)
- User and session context preservation

**Streaming Response:**
When `stream=true`, returns SSE events with `event` and `data` fields.

## OpenAPI

````yaml post /teams/{team_id}/runs
paths:
  path: /teams/{team_id}/runs
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
        team_id:
          schema:
            - type: string
              required: true
              title: Team Id
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
                    default: true
              monitor:
                allOf:
                  - type: boolean
                    title: Monitor
                    default: true
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
            title: Body_create_team_run
            refIdentifier: '#/components/schemas/Body_create_team_run'
            requiredProperties:
              - message
        examples:
          example:
            value:
              message: <string>
              stream: true
              monitor: true
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
        description: Team run executed successfully
      text/event-stream:
        schemaArray:
          - type: file
            contentMediaType: text/event-stream
        examples:
          example:
            value: |+
              event: RunStarted
              data: {"content": "Hello!", "run_id": "123..."}

        description: Team run executed successfully
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
        description: Team not found
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