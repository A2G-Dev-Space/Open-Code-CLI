# Get User Memory Statistics

> Original Document: [Get User Memory Statistics](https://docs.agno.com/reference-api/schema/memory/get-user-memory-statistics.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:17.157Z

---

# Get User Memory Statistics

> Retrieve paginated statistics about memory usage by user. Provides insights into user engagement and memory distribution across users.

## OpenAPI

````yaml get /user_memory_stats
paths:
  path: /user_memory_stats
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
        limit:
          schema:
            - type: integer
              required: false
              title: Limit
              description: Number of user statistics to return per page
              default: 20
            - type: 'null'
              required: false
              title: Limit
              description: Number of user statistics to return per page
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
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to query statistics from
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to query statistics from
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
                      $ref: '#/components/schemas/UserStatsSchema'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[UserStatsSchema]
            refIdentifier: '#/components/schemas/PaginatedResponse_UserStatsSchema_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              data:
                - user_id: '123'
                  total_memories: 3
                  last_memory_updated_at: '2025-09-01T07:53:17Z'
        description: User memory statistics retrieved successfully
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
        description: Failed to retrieve user statistics
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
    UserStatsSchema:
      properties:
        user_id:
          type: string
          title: User Id
        total_memories:
          type: integer
          title: Total Memories
        last_memory_updated_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Last Memory Updated At
      type: object
      required:
        - user_id
        - total_memories
      title: UserStatsSchema
      description: Schema for user memory statistics

````