# List Evaluation Runs

> Original Document: [List Evaluation Runs](https://docs.agno.com/reference-api/schema/evals/list-evaluation-runs.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.133Z

---

# List Evaluation Runs

> Retrieve paginated evaluation runs with filtering and sorting options. Filter by agent, team, workflow, model, or evaluation type.

## OpenAPI

````yaml get /eval-runs
paths:
  path: /eval-runs
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
        agent_id:
          schema:
            - type: string
              required: false
              title: Agent Id
              description: Agent ID
            - type: 'null'
              required: false
              title: Agent Id
              description: Agent ID
        team_id:
          schema:
            - type: string
              required: false
              title: Team Id
              description: Team ID
            - type: 'null'
              required: false
              title: Team Id
              description: Team ID
        workflow_id:
          schema:
            - type: string
              required: false
              title: Workflow Id
              description: Workflow ID
            - type: 'null'
              required: false
              title: Workflow Id
              description: Workflow ID
        model_id:
          schema:
            - type: string
              required: false
              title: Model Id
              description: Model ID
            - type: 'null'
              required: false
              title: Model Id
              description: Model ID
        type:
          schema:
            - type: enum<string>
              enum:
                - agent
                - team
                - workflow
              required: false
              title: EvalFilterType
              description: Filter type
              refIdentifier: '#/components/schemas/EvalFilterType'
            - type: 'null'
              required: false
              title: Type
              description: Filter type
        limit:
          schema:
            - type: integer
              required: false
              title: Limit
              description: Number of eval runs to return
              default: 20
            - type: 'null'
              required: false
              title: Limit
              description: Number of eval runs to return
              default: 20
        page:
          schema:
            - type: integer
              required: false
              title: Page
              description: Page number
              default: 1
            - type: 'null'
              required: false
              title: Page
              description: Page number
              default: 1
        sort_by:
          schema:
            - type: string
              required: false
              title: Sort By
              description: Field to sort by
              default: created_at
            - type: 'null'
              required: false
              title: Sort By
              description: Field to sort by
              default: created_at
        sort_order:
          schema:
            - type: enum<string>
              enum:
                - asc
                - desc
              required: false
              title: SortOrder
              description: Sort order (asc or desc)
              refIdentifier: '#/components/schemas/SortOrder'
              default: desc
            - type: 'null'
              required: false
              title: Sort Order
              description: Sort order (asc or desc)
              default: desc
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: The ID of the database to use
            - type: 'null'
              required: false
              title: Db Id
              description: The ID of the database to use
        eval_types:
          schema:
            - type: string
              required: false
              title: Eval Types
              description: Comma-separated eval types (accuracy,performance,reliability)
              examples: &ref_0
                - accuracy,performance
              example: accuracy,performance
            - type: 'null'
              required: false
              title: Eval Types
              description: Comma-separated eval types (accuracy,performance,reliability)
              examples: *ref_0
              example: accuracy,performance
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - items:
                      $ref: '#/components/schemas/EvalSchema'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[EvalSchema]
            refIdentifier: '#/components/schemas/PaginatedResponse_EvalSchema_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              data:
                - id: a03fa2f4-900d-482d-afe0-470d4cd8d1f4
                  agent_id: basic-agent
                  model_id: gpt-4o
                  model_provider: OpenAI
                  name: 'Test '
                  eval_type: reliability
                  eval_data:
                    eval_status: PASSED
                    failed_tool_calls: []
                    passed_tool_calls:
                      - multiply
                  eval_input:
                    expected_tool_calls:
                      - multiply
                  created_at: '2025-08-27T15:41:59Z'
                  updated_at: '2025-08-27T15:41:59Z'
        description: Evaluation runs retrieved successfully
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
    EvalSchema:
      properties:
        id:
          type: string
          title: Id
        agent_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Agent Id
        model_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Model Id
        model_provider:
          anyOf:
            - type: string
            - type: 'null'
          title: Model Provider
        team_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Team Id
        workflow_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Workflow Id
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        evaluated_component_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Evaluated Component Name
        eval_type:
          $ref: '#/components/schemas/EvalType'
        eval_data:
          additionalProperties: true
          type: object
          title: Eval Data
        eval_input:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Eval Input
        created_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Created At
        updated_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Updated At
      type: object
      required:
        - id
        - eval_type
        - eval_data
      title: EvalSchema
    EvalType:
      type: string
      enum:
        - accuracy
        - performance
        - reliability
      title: EvalType
    PaginationInfo:
      properties:
        page:
          anyOf:
            - type: integer
            - type: 'null'
          title: Page
          default: 0
        limit:
          anyOf:
            - type: integer
            - type: 'null'
          title: Limit
          default: 20
        total_pages:
          anyOf:
            - type: integer
            - type: 'null'
          title: Total Pages
          default: 0
        total_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Total Count
          default: 0
        search_time_ms:
          anyOf:
            - type: number
            - type: 'null'
          title: Search Time Ms
          default: 0
      type: object
      title: PaginationInfo

````