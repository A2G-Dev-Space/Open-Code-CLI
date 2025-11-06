# Get Team Details

> Original Document: [Get Team Details](https://docs.agno.com/reference-api/schema/teams/get-team-details.md)
> Category: teams
> Downloaded: 2025-11-06T11:51:17.189Z

---

# Get Team Details

> Retrieve detailed configuration and member information for a specific team.

## OpenAPI

````yaml get /teams/{team_id}
paths:
  path: /teams/{team_id}
  method: get
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
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - &ref_0
                    anyOf:
                      - type: string
                      - type: 'null'
                    title: Id
              name:
                allOf:
                  - &ref_1
                    anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
              db_id:
                allOf:
                  - &ref_2
                    anyOf:
                      - type: string
                      - type: 'null'
                    title: Db Id
              description:
                allOf:
                  - &ref_3
                    anyOf:
                      - type: string
                      - type: 'null'
                    title: Description
              model:
                allOf:
                  - &ref_4
                    anyOf:
                      - $ref: '#/components/schemas/ModelResponse'
                      - type: 'null'
              tools:
                allOf:
                  - &ref_5
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Tools
              sessions:
                allOf:
                  - &ref_6
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Sessions
              knowledge:
                allOf:
                  - &ref_7
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Knowledge
              memory:
                allOf:
                  - &ref_8
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Memory
              reasoning:
                allOf:
                  - &ref_9
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Reasoning
              default_tools:
                allOf:
                  - &ref_10
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Default Tools
              system_message:
                allOf:
                  - &ref_11
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: System Message
              response_settings:
                allOf:
                  - &ref_12
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Response Settings
              streaming:
                allOf:
                  - &ref_13
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Streaming
              members:
                allOf:
                  - &ref_14
                    anyOf:
                      - items:
                          anyOf:
                            - $ref: '#/components/schemas/AgentResponse'
                            - $ref: '#/components/schemas/TeamResponse'
                        type: array
                      - type: 'null'
                    title: Members
              metadata:
                allOf:
                  - &ref_15
                    anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
            title: TeamResponse
            refIdentifier: '#/components/schemas/TeamResponse'
        examples:
          example:
            value:
              team_id: basic-team
              name: Basic Team
              mode: coordinate
              model:
                name: OpenAIChat
                model: gpt-4o
                provider: OpenAI
              tools:
                - name: transfer_task_to_member
                  description: >-
                    Use this function to transfer a task to the selected team
                    member.

                    You must provide a clear and concise description of the task
                    the member should achieve AND the expected output.
                  parameters:
                    type: object
                    properties:
                      member_id:
                        type: string
                        description: >-
                          (str) The ID of the member to transfer the task to.
                          Use only the ID of the member, not the ID of the team
                          followed by the ID of the member.
                      task_description:
                        type: string
                        description: >-
                          (str) A clear and concise description of the task the
                          member should achieve.
                      expected_output:
                        type: string
                        description: (str) The expected output from the member (optional).
                    additionalProperties: false
                    required:
                      - member_id
                      - task_description
              members:
                - agent_id: basic-agent
                  name: Basic Agent
                  model:
                    name: OpenAIChat
                    model: gpt-4o
                    provider: OpenAI gpt-4o
                  memory:
                    app_name: Memory
                    model:
                      name: OpenAIChat
                      model: gpt-4o
                      provider: OpenAI
                  session_table: agno_sessions
                  memory_table: agno_memories
              enable_agentic_context: false
              memory:
                app_name: Memory
                model:
                  name: OpenAIChat
                  model: gpt-4o
                  provider: OpenAI
              async_mode: false
              session_table: agno_sessions
              memory_table: agno_memories
        description: Team details retrieved successfully
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
  schemas:
    AgentResponse:
      properties:
        id:
          anyOf:
            - type: string
            - type: 'null'
          title: Id
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        db_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Db Id
        model:
          anyOf:
            - $ref: '#/components/schemas/ModelResponse'
            - type: 'null'
        tools:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Tools
        sessions:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Sessions
        knowledge:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Knowledge
        memory:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Memory
        reasoning:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Reasoning
        default_tools:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Default Tools
        system_message:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: System Message
        extra_messages:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Extra Messages
        response_settings:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Response Settings
        streaming:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Streaming
        metadata:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Metadata
      type: object
      title: AgentResponse
    ModelResponse:
      properties:
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        model:
          anyOf:
            - type: string
            - type: 'null'
          title: Model
        provider:
          anyOf:
            - type: string
            - type: 'null'
          title: Provider
      type: object
      title: ModelResponse
    TeamResponse:
      properties:
        id: *ref_0
        name: *ref_1
        db_id: *ref_2
        description: *ref_3
        model: *ref_4
        tools: *ref_5
        sessions: *ref_6
        knowledge: *ref_7
        memory: *ref_8
        reasoning: *ref_9
        default_tools: *ref_10
        system_message: *ref_11
        response_settings: *ref_12
        streaming: *ref_13
        members: *ref_14
        metadata: *ref_15
      type: object
      title: TeamResponse

````