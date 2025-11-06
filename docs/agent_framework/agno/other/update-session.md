# null

> Original Document: [null](https://docs.agno.com/reference-api/schema/sessions/update-session.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.178Z

---

# null

## OpenAPI

````yaml patch /sessions/{session_id}
paths:
  path: /sessions/{session_id}
  method: patch
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
        session_id:
          schema:
            - type: string
              required: true
              title: Session Id
              description: Session ID to update
      query:
        type:
          schema:
            - type: enum<string>
              enum:
                - agent
                - team
                - workflow
              required: false
              title: SessionType
              description: Session type (agent, team, or workflow)
        user_id:
          schema:
            - type: string
              required: false
              title: User Id
              description: User ID
            - type: 'null'
              required: false
              title: User Id
              description: User ID
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to use for update operation
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for update operation
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              session_name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Session Name
              session_state:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session State
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
              summary:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Summary
            required: true
            title: UpdateSessionRequest
            description: Session update data
            refIdentifier: '#/components/schemas/UpdateSessionRequest'
        examples:
          example:
            value:
              session_name: <string>
              session_state: {}
              metadata: {}
              summary: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              agent_session_id:
                allOf:
                  - type: string
                    title: Agent Session Id
              session_id:
                allOf:
                  - type: string
                    title: Session Id
              session_name:
                allOf:
                  - type: string
                    title: Session Name
              session_summary:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session Summary
              session_state:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session State
              agent_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Agent Id
              total_tokens:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Total Tokens
              agent_data:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Agent Data
              metrics:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metrics
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
              chat_history:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Chat History
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Created At
              updated_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Updated At
            title: AgentSessionDetailSchema
            refIdentifier: '#/components/schemas/AgentSessionDetailSchema'
            requiredProperties:
              - user_id
              - agent_session_id
              - session_id
              - session_name
              - session_summary
              - session_state
              - agent_id
              - total_tokens
              - agent_data
              - metrics
              - metadata
              - chat_history
              - created_at
              - updated_at
          - type: object
            properties:
              session_id:
                allOf:
                  - type: string
                    title: Session Id
              session_name:
                allOf:
                  - type: string
                    title: Session Name
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              team_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Team Id
              session_summary:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session Summary
              session_state:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session State
              metrics:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metrics
              team_data:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Team Data
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
              chat_history:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Chat History
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Created At
              updated_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Updated At
              total_tokens:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Total Tokens
            title: TeamSessionDetailSchema
            refIdentifier: '#/components/schemas/TeamSessionDetailSchema'
            requiredProperties:
              - session_id
              - session_name
              - user_id
              - team_id
              - session_summary
              - session_state
              - metrics
              - team_data
              - metadata
              - chat_history
              - created_at
              - updated_at
              - total_tokens
          - type: object
            properties:
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              workflow_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Workflow Id
              workflow_name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Workflow Name
              session_id:
                allOf:
                  - type: string
                    title: Session Id
              session_name:
                allOf:
                  - type: string
                    title: Session Name
              session_data:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session Data
              session_state:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Session State
              workflow_data:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Workflow Data
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
              created_at:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Created At
              updated_at:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Updated At
            title: WorkflowSessionDetailSchema
            refIdentifier: '#/components/schemas/WorkflowSessionDetailSchema'
            requiredProperties:
              - user_id
              - workflow_id
              - workflow_name
              - session_id
              - session_name
              - session_data
              - session_state
              - workflow_data
              - metadata
              - created_at
              - updated_at
        examples:
          update_summary:
            summary: Update session summary
            value:
              summary:
                summary: The user discussed project planning with the agent.
                updated_at: '2025-10-21T14:30:00Z'
          update_metadata:
            summary: Update session metadata
            value:
              metadata:
                tags:
                  - planning
                  - project
                priority: high
          update_session_name:
            summary: Update session name
            value:
              session_name: Updated Session Name
          update_session_state:
            summary: Update session state
            value:
              session_state:
                step: completed
                context: Project planning finished
                progress: 100
        description: Session updated successfully
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
        description: Bad Request
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
        description: Session not found
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
        description: Invalid request
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
        description: Failed to update session
  deprecated: false
  type: path
components:
  schemas: {}

````