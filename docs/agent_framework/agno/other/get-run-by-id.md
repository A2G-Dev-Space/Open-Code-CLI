# Get Run by ID

> Original Document: [Get Run by ID](https://docs.agno.com/reference-api/schema/sessions/get-run-by-id.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.174Z

---

# Get Run by ID

> Retrieve a specific run by its ID from a session. Response schema varies based on the run type (agent run, team run, or workflow run).

## OpenAPI

````yaml get /sessions/{session_id}/runs/{run_id}
paths:
  path: /sessions/{session_id}/runs/{run_id}
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
        session_id:
          schema:
            - type: string
              required: true
              title: Session Id
              description: Session ID to get run from
        run_id:
          schema:
            - type: string
              required: true
              title: Run Id
              description: Run ID to retrieve
      query:
        type:
          schema:
            - type: enum<string>
              enum:
                - agent
                - team
                - workflow
              required: false
              title: SessionType
              description: Session type (agent, team, or workflow)
        user_id:
          schema:
            - type: string
              required: false
              title: User Id
              description: User ID to query run from
            - type: 'null'
              required: false
              title: User Id
              description: User ID to query run from
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to query run from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query run from
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              run_id:
                allOf:
                  - type: string
                    title: Run Id
              parent_run_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Parent Run Id
              agent_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Agent Id
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              run_input:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Input
              content:
                allOf:
                  - anyOf:
                      - type: string
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Content
              run_response_format:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Response Format
              reasoning_content:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Reasoning Content
              reasoning_steps:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Steps
              metrics:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metrics
              messages:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Messages
              tools:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Tools
              events:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Events
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Created At
              references:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: References
              reasoning_messages:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Messages
              images:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Images
              videos:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Videos
              audio:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Audio
              files:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Files
              response_audio:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Response Audio
              input_media:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Input Media
            title: RunSchema
            refIdentifier: '#/components/schemas/RunSchema'
            requiredProperties:
              - run_id
              - parent_run_id
              - agent_id
              - user_id
              - run_input
              - content
              - run_response_format
              - reasoning_content
              - reasoning_steps
              - metrics
              - messages
              - tools
              - events
              - created_at
              - references
              - reasoning_messages
              - images
              - videos
              - audio
              - files
              - response_audio
              - input_media
          - type: object
            properties:
              run_id:
                allOf:
                  - type: string
                    title: Run Id
              parent_run_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Parent Run Id
              team_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Team Id
              content:
                allOf:
                  - anyOf:
                      - type: string
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Content
              reasoning_content:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Reasoning Content
              reasoning_steps:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Steps
              run_input:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Input
              run_response_format:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Response Format
              metrics:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metrics
              tools:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Tools
              messages:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Messages
              events:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Events
              created_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Created At
              references:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: References
              reasoning_messages:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Messages
              input_media:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Input Media
              images:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Images
              videos:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Videos
              audio:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Audio
              files:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Files
              response_audio:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Response Audio
            title: TeamRunSchema
            refIdentifier: '#/components/schemas/TeamRunSchema'
            requiredProperties:
              - run_id
              - parent_run_id
              - team_id
              - content
              - reasoning_content
              - reasoning_steps
              - run_input
              - run_response_format
              - metrics
              - tools
              - messages
              - events
              - created_at
              - references
              - reasoning_messages
              - input_media
              - images
              - videos
              - audio
              - files
              - response_audio
          - type: object
            properties:
              run_id:
                allOf:
                  - type: string
                    title: Run Id
              run_input:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Run Input
              events:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Events
              workflow_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Workflow Id
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              content:
                allOf:
                  - anyOf:
                      - type: string
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Content
              content_type:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Content Type
              status:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Status
              step_results:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Step Results
              step_executor_runs:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Step Executor Runs
              metrics:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metrics
              created_at:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Created At
              reasoning_content:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Reasoning Content
              reasoning_steps:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Steps
              references:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: References
              reasoning_messages:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Reasoning Messages
              images:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Images
              videos:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Videos
              audio:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Audio
              files:
                allOf:
                  - anyOf:
                      - items:
                          additionalProperties: true
                          type: object
                        type: array
                      - type: 'null'
                    title: Files
              response_audio:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Response Audio
            title: WorkflowRunSchema
            refIdentifier: '#/components/schemas/WorkflowRunSchema'
            requiredProperties:
              - run_id
              - run_input
              - events
              - workflow_id
              - user_id
              - content
              - content_type
              - status
              - step_results
              - step_executor_runs
              - metrics
              - created_at
              - reasoning_content
              - reasoning_steps
              - references
              - reasoning_messages
              - images
              - videos
              - audio
              - files
              - response_audio
        examples:
          agent_run:
            summary: Example agent run
            value:
              run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
              parent_run_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
              agent_id: basic-agent
              user_id: user_123
              run_input: Which tools do you have access to?
              content: I don't have access to external tools.
              created_at: 1728499200
        description: Run retrieved successfully
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
        description: Session or run not found
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
        description: Invalid session type
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
  schemas: {}

````