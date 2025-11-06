# Cancel Workflow Run

> Original Document: [Cancel Workflow Run](https://docs.agno.com/reference-api/schema/workflows/cancel-workflow-run.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:17.196Z

---

# Cancel Workflow Run

> Cancel a currently executing workflow run, stopping all active steps and cleanup.
**Note:** Complex workflows with multiple parallel steps may take time to fully cancel.

## OpenAPI

````yaml post /workflows/{workflow_id}/runs/{run_id}/cancel
paths:
  path: /workflows/{workflow_id}/runs/{run_id}/cancel
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
        workflow_id:
          schema:
            - type: string
              required: true
              title: Workflow Id
        run_id:
          schema:
            - type: string
              required: true
              title: Run Id
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Successful Response
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
        description: Workflow or run not found
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
        description: Failed to cancel workflow run
  deprecated: false
  type: path
components:
  schemas: {}

````