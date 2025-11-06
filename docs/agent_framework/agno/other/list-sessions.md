# List Sessions

> Original Document: [List Sessions](https://docs.agno.com/reference-api/schema/sessions/list-sessions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.174Z

---

# List Sessions

> Retrieve paginated list of sessions with filtering and sorting options. Supports filtering by session type (agent, team, workflow), component, user, and name. Sessions represent conversation histories and execution contexts.

## OpenAPI

````yaml get /sessions
paths:
  path: /sessions
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
        type:
          schema:
            - type: enum<string>
              enum:
                - agent
                - team
                - workflow
              required: false
              title: SessionType
              description: Type of sessions to retrieve (agent, team, or workflow)
        component_id:
          schema:
            - type: string
              required: false
              title: Component Id
              description: Filter sessions by component ID (agent/team/workflow ID)
            - type: 'null'
              required: false
              title: Component Id
              description: Filter sessions by component ID (agent/team/workflow ID)
        user_id:
          schema:
            - type: string
              required: false
              title: User Id
              description: Filter sessions by user ID
            - type: 'null'
              required: false
              title: User Id
              description: Filter sessions by user ID
        session_name:
          schema:
            - type: string
              required: false
              title: Session Name
              description: Filter sessions by name (partial match)
            - type: 'null'
              required: false
              title: Session Name
              description: Filter sessions by name (partial match)
        limit:
          schema:
            - type: integer
              required: false
              title: Limit
              description: Number of sessions to return per page
              default: 20
            - type: 'null'
              required: false
              title: Limit
              description: Number of sessions to return per page
              default: 20
        page:
          schema:
            - type: integer
              required: false
              title: Page
              description: Page number for pagination
              default: 1
            - type: 'null'
              required: false
              title: Page
              description: Page number for pagination
              default: 1
        sort_by:
          schema:
            - type: string
              required: false
              title: Sort By
              description: Field to sort sessions by
              default: created_at
            - type: 'null'
              required: false
              title: Sort By
              description: Field to sort sessions by
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
              description: Database ID to query sessions from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query sessions from
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
                      $ref: '#/components/schemas/SessionSchema'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[SessionSchema]
            refIdentifier: '#/components/schemas/PaginatedResponse_SessionSchema_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              session_example:
                summary: Example session response
                value:
                  data:
                    - session_id: 6f6cfbfd-9643-479a-ae47-b8f32eb4d710
                      session_name: What tools do you have?
                      session_state: {}
                      created_at: '2025-09-05T16:02:09Z'
                      updated_at: '2025-09-05T16:02:09Z'
        description: Sessions retrieved successfully
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
        description: Invalid session type or filter parameters
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
        description: Validation error in query parameters
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
    SessionSchema:
      properties:
        session_id:
          type: string
          title: Session Id
        session_name:
          type: string
          title: Session Name
        session_state:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Session State
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
        - session_id
        - session_name
        - session_state
        - created_at
        - updated_at
      title: SessionSchema

````