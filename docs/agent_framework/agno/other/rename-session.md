# Rename Session

> Original Document: [Rename Session](https://docs.agno.com/reference-api/schema/sessions/rename-session.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.177Z

---

# Rename Session

> Update the name of an existing session. Useful for organizing and categorizing sessions with meaningful names for better identification and management.

## OpenAPI

````yaml post /sessions/{session_id}/rename
paths:
  path: /sessions/{session_id}/rename
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
        session_id:
          schema:
            - type: string
              required: true
              title: Session Id
              description: Session ID to rename
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
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to use for rename operation
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for rename operation
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              session_name:
                allOf:
                  - type: string
                    title: Session Name
                    description: New name for the session
            required: true
            title: Body_rename_session
            refIdentifier: '#/components/schemas/Body_rename_session'
            requiredProperties:
              - session_name
        examples:
          example:
            value:
              session_name: <string>
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
          agent_session_example:
            summary: Example agent session response
            value:
              user_id: '123'
              agent_session_id: 6f6cfbfd-9643-479a-ae47-b8f32eb4d710
              session_id: 6f6cfbfd-9643-479a-ae47-b8f32eb4d710
              session_name: What tools do you have?
              session_summary:
                summary: >-
                  The user and assistant engaged in a conversation about the
                  tools the agent has available.
                updated_at: '2025-09-05T18:02:12.269392'
              session_state: {}
              agent_id: basic-agent
              total_tokens: 160
              agent_data:
                name: Basic Agent
                agent_id: basic-agent
                model:
                  provider: OpenAI
                  name: OpenAIChat
                  id: gpt-4o
              metrics:
                input_tokens: 134
                output_tokens: 26
                total_tokens: 160
                audio_input_tokens: 0
                audio_output_tokens: 0
                audio_total_tokens: 0
                cache_read_tokens: 0
                cache_write_tokens: 0
                reasoning_tokens: 0
              chat_history:
                - content: >-
                    <additional_information>

                    - Use markdown to format your answers.

                    - The current time is 2025-09-05 18:02:09.171627.

                    </additional_information>


                    You have access to memories from previous interactions with
                    the user that you can use:


                    <memories_from_previous_interactions>

                    - User really likes Digimon and Japan.

                    - User really likes Japan.

                    - User likes coffee.

                    </memories_from_previous_interactions>


                    Note: this information is from previous interactions and may
                    be updated in this conversation. You should always prefer
                    information from this conversation over the past memories.
                  from_history: false
                  stop_after_tool_call: false
                  role: system
                  created_at: 1757088129
                - content: What tools do you have?
                  from_history: false
                  stop_after_tool_call: false
                  role: user
                  created_at: 1757088129
                - content: >-
                    I don't have access to external tools or the internet.
                    However, I can assist you with a wide range of topics by
                    providing information, answering questions, and offering
                    suggestions based on the knowledge I've been trained on. If
                    there's anything specific you need help with, feel free to
                    ask!
                  from_history: false
                  stop_after_tool_call: false
                  role: assistant
                  metrics:
                    input_tokens: 134
                    output_tokens: 26
                    total_tokens: 160
                  created_at: 1757088129
              created_at: '2025-09-05T16:02:09Z'
              updated_at: '2025-09-05T16:02:09Z'
        description: Session renamed successfully
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
        description: Invalid session name
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
        description: Invalid session type or validation error
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