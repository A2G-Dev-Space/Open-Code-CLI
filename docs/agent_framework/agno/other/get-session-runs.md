# Get Session Runs

> Original Document: [Get Session Runs](https://docs.agno.com/reference-api/schema/sessions/get-session-runs.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.171Z

---

# Get Session Runs

> Retrieve all runs (executions) for a specific session. Runs represent individual interactions or executions within a session. Response schema varies based on session type.

## OpenAPI

````yaml get /sessions/{session_id}/runs
paths:
  path: /sessions/{session_id}/runs
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
              description: Session ID to get runs from
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
              description: User ID to query runs from
            - type: 'null'
              required: false
              title: User Id
              description: User ID to query runs from
        created_after:
          schema:
            - type: integer
              required: false
              title: Created After
              description: >-
                Filter runs created after this Unix timestamp (epoch time in
                seconds)
            - type: 'null'
              required: false
              title: Created After
              description: >-
                Filter runs created after this Unix timestamp (epoch time in
                seconds)
        created_before:
          schema:
            - type: integer
              required: false
              title: Created Before
              description: >-
                Filter runs created before this Unix timestamp (epoch time in
                seconds)
            - type: 'null'
              required: false
              title: Created Before
              description: >-
                Filter runs created before this Unix timestamp (epoch time in
                seconds)
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to query runs from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query runs from
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
                - anyOf:
                    - $ref: '#/components/schemas/RunSchema'
                    - $ref: '#/components/schemas/TeamRunSchema'
                    - $ref: '#/components/schemas/WorkflowRunSchema'
            title: Response Get Session Runs
        examples:
          completed_run:
            summary: Example completed run
            value:
              run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
              parent_run_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
              agent_id: basic-agent
              user_id: ''
              run_input: Which tools do you have access to?
              content: >-
                I don't have access to external tools or the internet. However,
                I can assist you with a wide range of topics by providing
                information, answering questions, and offering suggestions based
                on the knowledge I've been trained on. If there's anything
                specific you need help with, feel free to ask!
              run_response_format: text
              reasoning_content: ''
              metrics:
                input_tokens: 82
                output_tokens: 56
                total_tokens: 138
                time_to_first_token: 0.047505500027909875
                duration: 4.840060166025069
              messages:
                - content: >-
                    <additional_information>

                    - Use markdown to format your answers.

                    - The current time is 2025-09-08 17:52:10.101003.

                    </additional_information>


                    You have the capability to retain memories from previous
                    interactions with the user, but have not had any
                    interactions with the user yet.
                  from_history: false
                  stop_after_tool_call: false
                  role: system
                  created_at: 1757346730
                - content: Which tools do you have access to?
                  from_history: false
                  stop_after_tool_call: false
                  role: user
                  created_at: 1757346730
                - content: >-
                    I don't have access to external tools or the internet.
                    However, I can assist you with a wide range of topics by
                    providing information, answering questions, and offering
                    suggestions based on the knowledge I've been trained on. If
                    there's anything specific you need help with, feel free to
                    ask!
                  from_history: false
                  stop_after_tool_call: false
                  role: assistant
                  metrics:
                    input_tokens: 82
                    output_tokens: 56
                    total_tokens: 138
                  created_at: 1757346730
              events:
                - created_at: 1757346730
                  event: RunStarted
                  agent_id: basic-agent
                  agent_name: Basic Agent
                  run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
                  session_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
                  model: gpt-4o
                  model_provider: OpenAI
                - created_at: 1757346733
                  event: MemoryUpdateStarted
                  agent_id: basic-agent
                  agent_name: Basic Agent
                  run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
                  session_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
                - created_at: 1757346734
                  event: MemoryUpdateCompleted
                  agent_id: basic-agent
                  agent_name: Basic Agent
                  run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
                  session_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
                - created_at: 1757346734
                  event: RunCompleted
                  agent_id: basic-agent
                  agent_name: Basic Agent
                  run_id: fcdf50f0-7c32-4593-b2ef-68a558774340
                  session_id: 80056af0-c7a5-4d69-b6a2-c3eba9f040e0
                  content: >-
                    I don't have access to external tools or the internet.
                    However, I can assist you with a wide range of topics by
                    providing information, answering questions, and offering
                    suggestions based on the knowledge I've been trained on. If
                    there's anything specific you need help with, feel free to
                    ask!
                  content_type: str
                  metrics:
                    input_tokens: 82
                    output_tokens: 56
                    total_tokens: 138
                    time_to_first_token: 0.047505500027909875
                    duration: 4.840060166025069
              created_at: '2025-09-08T15:52:10Z'
        description: Session runs retrieved successfully
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
        description: Session not found or has no runs
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
  schemas:
    RunSchema:
      properties:
        run_id:
          type: string
          title: Run Id
        parent_run_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Parent Run Id
        agent_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Agent Id
        user_id:
          anyOf:
            - type: string
            - type: 'null'
          title: User Id
        run_input:
          anyOf:
            - type: string
            - type: 'null'
          title: Run Input
        content:
          anyOf:
            - type: string
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Content
        run_response_format:
          anyOf:
            - type: string
            - type: 'null'
          title: Run Response Format
        reasoning_content:
          anyOf:
            - type: string
            - type: 'null'
          title: Reasoning Content
        reasoning_steps:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Steps
        metrics:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Metrics
        messages:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Messages
        tools:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Tools
        events:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Events
        created_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Created At
        references:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: References
        reasoning_messages:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Messages
        images:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Images
        videos:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Videos
        audio:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Audio
        files:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Files
        response_audio:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Response Audio
        input_media:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Input Media
      type: object
      required:
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
      title: RunSchema
    TeamRunSchema:
      properties:
        run_id:
          type: string
          title: Run Id
        parent_run_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Parent Run Id
        team_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Team Id
        content:
          anyOf:
            - type: string
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Content
        reasoning_content:
          anyOf:
            - type: string
            - type: 'null'
          title: Reasoning Content
        reasoning_steps:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Steps
        run_input:
          anyOf:
            - type: string
            - type: 'null'
          title: Run Input
        run_response_format:
          anyOf:
            - type: string
            - type: 'null'
          title: Run Response Format
        metrics:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Metrics
        tools:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Tools
        messages:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Messages
        events:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Events
        created_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Created At
        references:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: References
        reasoning_messages:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Messages
        input_media:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Input Media
        images:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Images
        videos:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Videos
        audio:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Audio
        files:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Files
        response_audio:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Response Audio
      type: object
      required:
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
      title: TeamRunSchema
    WorkflowRunSchema:
      properties:
        run_id:
          type: string
          title: Run Id
        run_input:
          anyOf:
            - type: string
            - type: 'null'
          title: Run Input
        events:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Events
        workflow_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Workflow Id
        user_id:
          anyOf:
            - type: string
            - type: 'null'
          title: User Id
        content:
          anyOf:
            - type: string
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Content
        content_type:
          anyOf:
            - type: string
            - type: 'null'
          title: Content Type
        status:
          anyOf:
            - type: string
            - type: 'null'
          title: Status
        step_results:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Step Results
        step_executor_runs:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Step Executor Runs
        metrics:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Metrics
        created_at:
          anyOf:
            - type: integer
            - type: 'null'
          title: Created At
        reasoning_content:
          anyOf:
            - type: string
            - type: 'null'
          title: Reasoning Content
        reasoning_steps:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Steps
        references:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: References
        reasoning_messages:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Reasoning Messages
        images:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Images
        videos:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Videos
        audio:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Audio
        files:
          anyOf:
            - items:
                additionalProperties: true
                type: object
              type: array
            - type: 'null'
          title: Files
        response_audio:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Response Audio
      type: object
      required:
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
      title: WorkflowRunSchema

````