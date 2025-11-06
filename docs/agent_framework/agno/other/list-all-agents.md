# List All Agents

> Original Document: [List All Agents](https://docs.agno.com/reference-api/schema/agents/list-all-agents.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.104Z

---

# List All Agents

> Retrieve a comprehensive list of all agents configured in this OS instance.

**Returns:**
- Agent metadata (ID, name, description)
- Model configuration and capabilities
- Available tools and their configurations
- Session, knowledge, memory, and reasoning settings
- Only meaningful (non-default) configurations are included

## OpenAPI

````yaml get /agents
paths:
  path: /agents
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
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: array
            items:
              allOf:
                - $ref: '#/components/schemas/AgentResponse'
            title: Response Get Agents
        examples:
          example:
            value:
              - id: main-agent
                name: Main Agent
                db_id: c6bf0644-feb8-4930-a305-380dae5ad6aa
                model:
                  name: OpenAIChat
                  model: gpt-4o
                  provider: OpenAI
                sessions:
                  session_table: agno_sessions
                knowledge:
                  knowledge_table: main_knowledge
                system_message:
                  markdown: true
                  add_datetime_to_context: true
        description: List of agents retrieved successfully
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
        description: Not Found
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

````