# Get Evaluation Run

> Original Document: [Get Evaluation Run](https://docs.agno.com/reference-api/schema/evals/get-evaluation-run.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.123Z

---

# Get Evaluation Run

> Retrieve detailed results and metrics for a specific evaluation run.

## OpenAPI

````yaml get /eval-runs/{eval_run_id}
paths:
  path: /eval-runs/{eval_run_id}
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
        eval_run_id:
          schema:
            - type: string
              required: true
              title: Eval Run Id
      query:
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
                  - type: string
                    title: Id
              agent_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Agent Id
              model_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Model Id
              model_provider:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Model Provider
              team_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Team Id
              workflow_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Workflow Id
              name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
              evaluated_component_name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Evaluated Component Name
              eval_type:
                allOf:
                  - $ref: '#/components/schemas/EvalType'
              eval_data:
                allOf:
                  - additionalProperties: true
                    type: object
                    title: Eval Data
              eval_input:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Eval Input
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
            title: EvalSchema
            refIdentifier: '#/components/schemas/EvalSchema'
            requiredProperties:
              - id
              - eval_type
              - eval_data
        examples:
          example:
            value:
              id: a03fa2f4-900d-482d-afe0-470d4cd8d1f4
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
        description: Evaluation run details retrieved successfully
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
        description: Evaluation run not found
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
    EvalType:
      type: string
      enum:
        - accuracy
        - performance
        - reliability
      title: EvalType

````