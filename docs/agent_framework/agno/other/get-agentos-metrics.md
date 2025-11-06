# Get AgentOS Metrics

> Original Document: [Get AgentOS Metrics](https://docs.agno.com/reference-api/schema/metrics/get-agentos-metrics.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.154Z

---

# Get AgentOS Metrics

> Retrieve AgentOS metrics and analytics data for a specified date range. If no date range is specified, returns all available metrics.

## OpenAPI

````yaml get /metrics
paths:
  path: /metrics
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
      query:
        starting_date:
          schema:
            - type: string
              required: false
              title: Starting Date
              description: Starting date for metrics range (YYYY-MM-DD format)
              format: date
            - type: 'null'
              required: false
              title: Starting Date
              description: Starting date for metrics range (YYYY-MM-DD format)
        ending_date:
          schema:
            - type: string
              required: false
              title: Ending Date
              description: Ending date for metrics range (YYYY-MM-DD format)
              format: date
            - type: 'null'
              required: false
              title: Ending Date
              description: Ending date for metrics range (YYYY-MM-DD format)
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to query metrics from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query metrics from
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              metrics:
                allOf:
                  - items:
                      $ref: '#/components/schemas/DayAggregatedMetrics'
                    type: array
                    title: Metrics
              updated_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Updated At
            title: MetricsResponse
            refIdentifier: '#/components/schemas/MetricsResponse'
            requiredProperties:
              - metrics
              - updated_at
        examples:
          example:
            value:
              metrics:
                - id: 7bf39658-a00a-484c-8a28-67fd8a9ddb2a
                  agent_runs_count: 5
                  agent_sessions_count: 5
                  team_runs_count: 0
                  team_sessions_count: 0
                  workflow_runs_count: 0
                  workflow_sessions_count: 0
                  users_count: 1
                  token_metrics:
                    input_tokens: 448
                    output_tokens: 148
                    total_tokens: 596
                    audio_tokens: 0
                    input_audio_tokens: 0
                    output_audio_tokens: 0
                    cached_tokens: 0
                    cache_write_tokens: 0
                    reasoning_tokens: 0
                  model_metrics:
                    - model_id: gpt-4o
                      model_provider: OpenAI
                      count: 5
                  date: '2025-07-31T00:00:00'
                  created_at: 1753993132
                  updated_at: 1753993741
        description: Metrics retrieved successfully
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
        description: Invalid date range parameters
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
        description: Failed to retrieve metrics
  deprecated: false
  type: path
components:
  schemas:
    DayAggregatedMetrics:
      properties:
        id:
          type: string
          title: Id
        agent_runs_count:
          type: integer
          title: Agent Runs Count
        agent_sessions_count:
          type: integer
          title: Agent Sessions Count
        team_runs_count:
          type: integer
          title: Team Runs Count
        team_sessions_count:
          type: integer
          title: Team Sessions Count
        workflow_runs_count:
          type: integer
          title: Workflow Runs Count
        workflow_sessions_count:
          type: integer
          title: Workflow Sessions Count
        users_count:
          type: integer
          title: Users Count
        token_metrics:
          additionalProperties: true
          type: object
          title: Token Metrics
        model_metrics:
          items:
            additionalProperties: true
            type: object
          type: array
          title: Model Metrics
        date:
          type: string
          format: date-time
          title: Date
        created_at:
          type: integer
          title: Created At
        updated_at:
          type: integer
          title: Updated At
      type: object
      required:
        - id
        - agent_runs_count
        - agent_sessions_count
        - team_runs_count
        - team_sessions_count
        - workflow_runs_count
        - workflow_sessions_count
        - users_count
        - token_metrics
        - model_metrics
        - date
        - created_at
        - updated_at
      title: DayAggregatedMetrics
      description: Aggregated metrics for a given day

````