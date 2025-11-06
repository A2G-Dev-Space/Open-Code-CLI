# Refresh Metrics

> Original Document: [Refresh Metrics](https://docs.agno.com/reference-api/schema/metrics/refresh-metrics.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.160Z

---

# Refresh Metrics

> Manually trigger recalculation of system metrics from raw data. This operation analyzes system activity logs and regenerates aggregated metrics. Useful for ensuring metrics are up-to-date or after system maintenance.

## OpenAPI

````yaml post /metrics/refresh
paths:
  path: /metrics/refresh
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
      path: {}
      query:
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to use for metrics calculation
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for metrics calculation
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
                - $ref: '#/components/schemas/DayAggregatedMetrics'
            title: Response Refresh Metrics
        examples:
          example:
            value:
              - id: e77c9531-818b-47a5-99cd-59fed61e5403
                agent_runs_count: 2
                agent_sessions_count: 2
                team_runs_count: 0
                team_sessions_count: 0
                workflow_runs_count: 0
                workflow_sessions_count: 0
                users_count: 1
                token_metrics:
                  input_tokens: 256
                  output_tokens: 441
                  total_tokens: 697
                  audio_total_tokens: 0
                  audio_input_tokens: 0
                  audio_output_tokens: 0
                  cache_read_tokens: 0
                  cache_write_tokens: 0
                  reasoning_tokens: 0
                model_metrics:
                  - model_id: gpt-4o
                    model_provider: OpenAI
                    count: 2
                date: '2025-08-12T00:00:00'
                created_at: 1755016907
                updated_at: 1755016907
        description: Metrics refreshed successfully
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
        description: Failed to refresh metrics
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