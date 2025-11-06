# Continue Agent Run

> Original Document: [Continue Agent Run](https://docs.agno.com/reference-api/schema/agents/continue-agent-run.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.094Z

---

# Continue Agent Run

> Continue a paused or incomplete agent run with updated tool results.

**Use Cases:**
- Resume execution after tool approval/rejection
- Provide manual tool execution results

**Tools Parameter:**
JSON string containing array of tool execution objects with results.

## OpenAPI

````yaml post /agents/{agent_id}/runs/{run_id}/continue
paths:
  path: /agents/{agent_id}/runs/{run_id}/continue
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
        run_id:
          schema:
            - type: string
              required: true
              title: Run Id
      query: {}
      header: {}
      cookie: {}
    body:
      application/x-www-form-urlencoded:
        schemaArray:
          - type: object
            properties:
              tools:
                allOf:
                  - type: string
                    title: Tools
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
              stream:
                allOf:
                  - type: boolean
                    title: Stream
                    default: true
            required: true
            title: Body_continue_agent_run
            refIdentifier: '#/components/schemas/Body_continue_agent_run'
            requiredProperties:
              - tools
        examples:
          example:
            value:
              tools: <string>
              session_id: <string>
              user_id: <string>
              stream: true
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Agent run continued successfully
      text/event-stream:
        schemaArray:
          - type: file
            contentMediaType: text/event-stream
        examples:
          example:
            value: |+
              event: RunContent
              data: {"created_at": 1757348314, "run_id": "123..."}

        description: Agent run continued successfully
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
        description: Invalid JSON in tools field or invalid tool structure
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