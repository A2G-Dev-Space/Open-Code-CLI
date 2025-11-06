# List Content

> Original Document: [List Content](https://docs.agno.com/reference-api/schema/knowledge/list-content.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.150Z

---

# List Content

> Retrieve paginated list of all content in the knowledge base with filtering and sorting options. Filter by status, content type, or metadata properties.

## OpenAPI

````yaml get /knowledge/content
paths:
  path: /knowledge/content
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
              description: Number of content entries to return
              default: 20
            - type: 'null'
              required: false
              title: Limit
              description: Number of content entries to return
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
                      $ref: '#/components/schemas/ContentResponseSchema'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[ContentResponseSchema]
            refIdentifier: '#/components/schemas/PaginatedResponse_ContentResponseSchema_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              data:
                - id: 3c2fc685-d451-4d47-b0c0-b9a544c672b7
                  name: example.pdf
                  description: ''
                  type: application/pdf
                  size: '251261'
                  metadata: {}
                  access_count: 1
                  status: completed
                  status_message: ''
                  created_at: '2025-09-08T15:22:53Z'
                  updated_at: '2025-09-08T15:22:54Z'
              meta:
                page: 1
                limit: 20
                total_pages: 1
                total_count: 2
        description: Content list retrieved successfully
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
    ContentResponseSchema:
      properties:
        id:
          type: string
          title: Id
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
        type:
          anyOf:
            - type: string
            - type: 'null'
          title: Type
        size:
          anyOf:
            - type: string
            - type: 'null'
          title: Size
        linked_to:
          anyOf:
            - type: string
            - type: 'null'
          title: Linked To
        metadata:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Metadata
        access_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Access Count
        status:
          anyOf:
            - $ref: '#/components/schemas/ContentStatus'
            - type: 'null'
        status_message:
          anyOf:
            - type: string
            - type: 'null'
          title: Status Message
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
      title: ContentResponseSchema
    ContentStatus:
      type: string
      enum:
        - processing
        - completed
        - failed
      title: ContentStatus
      description: Enumeration of possible content processing statuses.
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