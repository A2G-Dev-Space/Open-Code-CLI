# Get OS Configuration

> Original Document: [Get OS Configuration](https://docs.agno.com/reference-api/schema/core/get-os-configuration.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.119Z

---

# Get OS Configuration

> Retrieve the complete configuration of the AgentOS instance, including:

- Available models and databases
- Registered agents, teams, and workflows
- Chat, session, memory, knowledge, and evaluation configurations
- Available interfaces and their routes

## OpenAPI

````yaml get /config
paths:
  path: /config
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
          - type: object
            properties:
              os_id:
                allOf:
                  - type: string
                    title: Os Id
              name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
              description:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Description
              available_models:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Available Models
              databases:
                allOf:
                  - items:
                      type: string
                    type: array
                    title: Databases
              chat:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/ChatConfig'
                      - type: 'null'
              session:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/SessionConfig'
                      - type: 'null'
              metrics:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/MetricsConfig'
                      - type: 'null'
              memory:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/MemoryConfig'
                      - type: 'null'
              knowledge:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/KnowledgeConfig'
                      - type: 'null'
              evals:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/EvalsConfig'
                      - type: 'null'
              agents:
                allOf:
                  - items:
                      $ref: '#/components/schemas/AgentSummaryResponse'
                    type: array
                    title: Agents
              teams:
                allOf:
                  - items:
                      $ref: '#/components/schemas/TeamSummaryResponse'
                    type: array
                    title: Teams
              workflows:
                allOf:
                  - items:
                      $ref: '#/components/schemas/WorkflowSummaryResponse'
                    type: array
                    title: Workflows
              interfaces:
                allOf:
                  - items:
                      $ref: '#/components/schemas/InterfaceResponse'
                    type: array
                    title: Interfaces
            title: ConfigResponse
            description: Response schema for the general config endpoint
            refIdentifier: '#/components/schemas/ConfigResponse'
            requiredProperties:
              - os_id
              - databases
              - agents
              - teams
              - workflows
              - interfaces
        examples:
          example:
            value:
              id: demo
              description: Example AgentOS configuration
              available_models: []
              databases:
                - 9c884dc4-9066-448c-9074-ef49ec7eb73c
              session:
                dbs:
                  - db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
                    domain_config:
                      display_name: Sessions
              metrics:
                dbs:
                  - db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
                    domain_config:
                      display_name: Metrics
              memory:
                dbs:
                  - db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
                    domain_config:
                      display_name: Memory
              knowledge:
                dbs:
                  - db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
                    domain_config:
                      display_name: Knowledge
              evals:
                dbs:
                  - db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
                    domain_config:
                      display_name: Evals
              agents:
                - id: main-agent
                  name: Main Agent
                  db_id: 9c884dc4-9066-448c-9074-ef49ec7eb73c
              teams: []
              workflows: []
              interfaces: []
        description: OS configuration retrieved successfully
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
    AgentSummaryResponse:
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
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
        db_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Db Id
      type: object
      title: AgentSummaryResponse
    ChatConfig:
      properties:
        quick_prompts:
          additionalProperties:
            items:
              type: string
            type: array
          type: object
          title: Quick Prompts
      type: object
      required:
        - quick_prompts
      title: ChatConfig
      description: Configuration for the Chat page of the AgentOS
    DatabaseConfig_EvalsDomainConfig_:
      properties:
        db_id:
          type: string
          title: Db Id
        domain_config:
          anyOf:
            - $ref: '#/components/schemas/EvalsDomainConfig'
            - type: 'null'
      type: object
      required:
        - db_id
      title: DatabaseConfig[EvalsDomainConfig]
    DatabaseConfig_KnowledgeDomainConfig_:
      properties:
        db_id:
          type: string
          title: Db Id
        domain_config:
          anyOf:
            - $ref: '#/components/schemas/KnowledgeDomainConfig'
            - type: 'null'
      type: object
      required:
        - db_id
      title: DatabaseConfig[KnowledgeDomainConfig]
    DatabaseConfig_MemoryDomainConfig_:
      properties:
        db_id:
          type: string
          title: Db Id
        domain_config:
          anyOf:
            - $ref: '#/components/schemas/MemoryDomainConfig'
            - type: 'null'
      type: object
      required:
        - db_id
      title: DatabaseConfig[MemoryDomainConfig]
    DatabaseConfig_MetricsDomainConfig_:
      properties:
        db_id:
          type: string
          title: Db Id
        domain_config:
          anyOf:
            - $ref: '#/components/schemas/MetricsDomainConfig'
            - type: 'null'
      type: object
      required:
        - db_id
      title: DatabaseConfig[MetricsDomainConfig]
    DatabaseConfig_SessionDomainConfig_:
      properties:
        db_id:
          type: string
          title: Db Id
        domain_config:
          anyOf:
            - $ref: '#/components/schemas/SessionDomainConfig'
            - type: 'null'
      type: object
      required:
        - db_id
      title: DatabaseConfig[SessionDomainConfig]
    EvalsConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        available_models:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Available Models
        dbs:
          anyOf:
            - items:
                $ref: '#/components/schemas/DatabaseConfig_EvalsDomainConfig_'
              type: array
            - type: 'null'
          title: Dbs
      type: object
      title: EvalsConfig
      description: Configuration for the Evals domain of the AgentOS
    EvalsDomainConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        available_models:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Available Models
      type: object
      title: EvalsDomainConfig
      description: Configuration for the Evals domain of the AgentOS
    InterfaceResponse:
      properties:
        type:
          type: string
          title: Type
        version:
          type: string
          title: Version
        route:
          type: string
          title: Route
      type: object
      required:
        - type
        - version
        - route
      title: InterfaceResponse
    KnowledgeConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        dbs:
          anyOf:
            - items:
                $ref: '#/components/schemas/DatabaseConfig_KnowledgeDomainConfig_'
              type: array
            - type: 'null'
          title: Dbs
      type: object
      title: KnowledgeConfig
      description: Configuration for the Knowledge domain of the AgentOS
    KnowledgeDomainConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
      type: object
      title: KnowledgeDomainConfig
      description: Configuration for the Knowledge domain of the AgentOS
    MemoryConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        dbs:
          anyOf:
            - items:
                $ref: '#/components/schemas/DatabaseConfig_MemoryDomainConfig_'
              type: array
            - type: 'null'
          title: Dbs
      type: object
      title: MemoryConfig
      description: Configuration for the Memory domain of the AgentOS
    MemoryDomainConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
      type: object
      title: MemoryDomainConfig
      description: Configuration for the Memory domain of the AgentOS
    MetricsConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        dbs:
          anyOf:
            - items:
                $ref: '#/components/schemas/DatabaseConfig_MetricsDomainConfig_'
              type: array
            - type: 'null'
          title: Dbs
      type: object
      title: MetricsConfig
      description: Configuration for the Metrics domain of the AgentOS
    MetricsDomainConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
      type: object
      title: MetricsDomainConfig
      description: Configuration for the Metrics domain of the AgentOS
    SessionConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
        dbs:
          anyOf:
            - items:
                $ref: '#/components/schemas/DatabaseConfig_SessionDomainConfig_'
              type: array
            - type: 'null'
          title: Dbs
      type: object
      title: SessionConfig
      description: Configuration for the Session domain of the AgentOS
    SessionDomainConfig:
      properties:
        display_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Display Name
      type: object
      title: SessionDomainConfig
      description: Configuration for the Session domain of the AgentOS
    TeamSummaryResponse:
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
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
        db_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Db Id
      type: object
      title: TeamSummaryResponse
    WorkflowSummaryResponse:
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
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
        db_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Db Id
      type: object
      title: WorkflowSummaryResponse

````