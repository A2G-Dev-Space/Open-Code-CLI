# Execute Evaluation

> Original Document: [Execute Evaluation](https://docs.agno.com/reference-api/schema/evals/execute-evaluation.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.119Z

---

# Execute Evaluation

> Run evaluation tests on agents or teams. Supports accuracy, performance, and reliability evaluations. Requires either agent_id or team_id, but not both.

## OpenAPI

````yaml post /eval-runs
paths:
  path: /eval-runs
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
              description: Database ID to use for evaluation
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for evaluation
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              agent_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Agent Id
              team_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Team Id
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
              eval_type:
                allOf:
                  - $ref: '#/components/schemas/EvalType'
              input:
                allOf:
                  - type: string
                    title: Input
              additional_guidelines:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Additional Guidelines
              additional_context:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Additional Context
              num_iterations:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Num Iterations
                    default: 1
              name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
              expected_output:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Expected Output
              warmup_runs:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Warmup Runs
                    default: 0
              expected_tool_calls:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Expected Tool Calls
            required: true
            title: EvalRunInput
            refIdentifier: '#/components/schemas/EvalRunInput'
            requiredProperties:
              - eval_type
              - input
        examples:
          example:
            value:
              agent_id: <string>
              team_id: <string>
              model_id: <string>
              model_provider: <string>
              eval_type: accuracy
              input: <string>
              additional_guidelines: <string>
              additional_context: <string>
              num_iterations: 123
              name: <string>
              expected_output: <string>
              warmup_runs: 123
              expected_tool_calls:
                - <string>
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
              id: f2b2d72f-e9e2-4f0e-8810-0a7e1ff58614
              agent_id: basic-agent
              model_id: gpt-4o
              model_provider: OpenAI
              eval_type: reliability
              eval_data:
                eval_status: PASSED
                failed_tool_calls: []
                passed_tool_calls:
                  - multiply
              created_at: '2025-08-27T15:41:59Z'
              updated_at: '2025-08-27T15:41:59Z'
        description: Evaluation executed successfully
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
        description: Invalid request - provide either agent_id or team_id
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
        description: Agent or team not found
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