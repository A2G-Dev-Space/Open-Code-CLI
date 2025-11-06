# List Memories

> Original Document: [List Memories](https://docs.agno.com/reference-api/schema/memory/list-memories.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:17.156Z

---

# List Memories

> Retrieve paginated list of user memories with filtering and search capabilities. Filter by user, agent, team, topics, or search within memory content.

## OpenAPI

````yaml get /memories
paths:
  path: /memories
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
        user_id:
          schema:
            - type: string
              required: false
              title: User Id
              description: Filter memories by user ID
            - type: 'null'
              required: false
              title: User Id
              description: Filter memories by user ID
        agent_id:
          schema:
            - type: string
              required: false
              title: Agent Id
              description: Filter memories by agent ID
            - type: 'null'
              required: false
              title: Agent Id
              description: Filter memories by agent ID
        team_id:
          schema:
            - type: string
              required: false
              title: Team Id
              description: Filter memories by team ID
            - type: 'null'
              required: false
              title: Team Id
              description: Filter memories by team ID
        search_content:
          schema:
            - type: string
              required: false
              title: Search Content
              description: Fuzzy search within memory content
            - type: 'null'
              required: false
              title: Search Content
              description: Fuzzy search within memory content
        limit:
          schema:
            - type: integer
              required: false
              title: Limit
              description: Number of memories to return per page
              default: 20
            - type: 'null'
              required: false
              title: Limit
              description: Number of memories to return per page
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
              description: Field to sort memories by
              default: updated_at
            - type: 'null'
              required: false
              title: Sort By
              description: Field to sort memories by
              default: updated_at
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
              description: Database ID to query memories from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query memories from
        topics:
          schema:
            - type: array
              items:
                allOf:
                  - type: string
              required: false
              title: Topics
              description: Comma-separated list of topics to filter by
              examples: &ref_0
                - preferences,technical,communication_style
              example: preferences,technical,communication_style
            - type: 'null'
              required: false
              title: Topics
              description: Comma-separated list of topics to filter by
              examples: *ref_0
              example: preferences,technical,communication_style
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
                      $ref: '#/components/schemas/UserMemorySchema'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[UserMemorySchema]
            refIdentifier: '#/components/schemas/PaginatedResponse_UserMemorySchema_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              data:
                - memory_id: f9361a69-2997-40c7-ae4e-a5861d434047
                  memory: User likes coffee.
                  topics:
                    - preferences
                  user_id: '123'
                  updated_at: '2025-09-01T07:53:17Z'
        description: Memories retrieved successfully
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
    UserMemorySchema:
      properties:
        memory_id:
          type: string
          title: Memory Id
        memory:
          type: string
          title: Memory
        topics:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Topics
        agent_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Agent Id
        team_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Team Id
        user_id:
          anyOf:
            - type: string
            - type: 'null'
          title: User Id
        updated_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Updated At
      type: object
      required:
        - memory_id
        - memory
        - topics
        - agent_id
        - team_id
        - user_id
        - updated_at
      title: UserMemorySchema

````