# Execute Workflow

> Original Document: [Execute Workflow](https://docs.agno.com/reference-api/schema/workflows/execute-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:17.203Z

---

# Execute Workflow

> Execute a workflow with the provided input data. Workflows can run in streaming or batch mode.

**Execution Modes:**
- **Streaming (`stream=true`)**: Real-time step-by-step execution updates via SSE
- **Non-Streaming (`stream=false`)**: Complete workflow execution with final result

**Workflow Execution Process:**
1. Input validation against workflow schema
2. Sequential or parallel step execution based on workflow design
3. Data flow between steps with transformation
4. Error handling and automatic retries where configured
5. Final result compilation and response

**Session Management:**
Workflows support session continuity for stateful execution across multiple runs.

## OpenAPI

````yaml post /workflows/{workflow_id}/runs
paths:
  path: /workflows/{workflow_id}/runs
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
      query: {}
      header: {}
      cookie: {}
    body:
      application/x-www-form-urlencoded:
        schemaArray:
          - type: object
            properties:
              message:
                allOf:
                  - type: string
                    title: Message
              stream:
                allOf:
                  - type: boolean
                    title: Stream
                    default: true
              session_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Session Id
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
            required: true
            title: Body_create_workflow_run
            refIdentifier: '#/components/schemas/Body_create_workflow_run'
            requiredProperties:
              - message
        examples:
          example:
            value:
              message: <string>
              stream: true
              session_id: <string>
              user_id: <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Workflow executed successfully
      text/event-stream:
        schemaArray:
          - type: file
            contentMediaType: text/event-stream
        examples:
          example:
            value: |+
              event: RunStarted
              data: {"content": "Hello!", "run_id": "123..."}

        description: Workflow executed successfully
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
        description: Invalid input data or workflow configuration
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
        description: Workflow not found
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
        description: Workflow execution error
  deprecated: false
  type: path
components:
  schemas: {}

````