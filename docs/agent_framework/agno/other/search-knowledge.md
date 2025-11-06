# Search Knowledge

> Original Document: [Search Knowledge](https://docs.agno.com/reference-api/schema/knowledge/search-knowledge.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.133Z

---

# Search Knowledge

> Search the knowledge base for relevant documents using query, filters and search type.

## OpenAPI

````yaml post /knowledge/search
paths:
  path: /knowledge/search
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
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              query:
                allOf:
                  - type: string
                    title: Query
                    description: The search query
              db_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Db Id
                    description: The content database id
              vector_db_ids:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Vector Db Ids
                    description: List of vector database ids to search in
              search_type:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Search Type
                    description: The type of search to perform
              max_results:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Max Results
                    description: The maximum number of results to return
              filters:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Filters
                    description: The filters to apply to the search
              meta:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/Meta'
                      - type: 'null'
                    description: >-
                      Pagination metadata. Limit and page number to return a
                      subset of results.
            required: true
            title: VectorSearchRequestSchema
            description: Schema for vector search request.
            refIdentifier: '#/components/schemas/VectorSearchRequestSchema'
            requiredProperties:
              - query
        examples:
          example:
            value:
              query: <string>
              db_id: <string>
              vector_db_ids:
                - <string>
              search_type: <string>
              max_results: 123
              filters: {}
              meta:
                limit: 50
                page: 2
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - items:
                      $ref: '#/components/schemas/VectorSearchResult'
                    type: array
                    title: Data
              meta:
                allOf:
                  - $ref: '#/components/schemas/PaginationInfo'
            title: PaginatedResponse[VectorSearchResult]
            refIdentifier: '#/components/schemas/PaginatedResponse_VectorSearchResult_'
            requiredProperties:
              - data
              - meta
        examples:
          example:
            value:
              data:
                - id: doc_123
                  content: >-
                    Jordan Mitchell - Software Engineer with skills in
                    JavaScript, React, Python
                  name: cv_1
                  meta_data:
                    page: 1
                    chunk: 1
                  usage:
                    total_tokens: 14
                  reranking_score: 0.95
                  content_id: content_456
              meta:
                page: 1
                limit: 20
                total_pages: 2
                total_count: 35
        description: Search results retrieved successfully
    '400':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Invalid search parameters
        examples: {}
        description: Invalid search parameters
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
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: No documents found
        examples: {}
        description: No documents found
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
    Meta:
      properties:
        limit:
          anyOf:
            - type: integer
              maximum: 100
              minimum: 1
            - type: 'null'
          title: Limit
          description: Number of results per page
          default: 20
        page:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Page
          description: Page number
          default: 1
      type: object
      title: Meta
      description: Inline metadata schema for pagination.
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
    VectorSearchResult:
      properties:
        id:
          type: string
          title: Id
        content:
          type: string
          title: Content
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        meta_data:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Meta Data
        usage:
          anyOf:
            - additionalProperties: true
              type: object
            - type: 'null'
          title: Usage
        reranking_score:
          anyOf:
            - type: number
            - type: 'null'
          title: Reranking Score
        content_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Content Id
        content_origin:
          anyOf:
            - type: string
            - type: 'null'
          title: Content Origin
        size:
          anyOf:
            - type: integer
            - type: 'null'
          title: Size
      type: object
      required:
        - id
        - content
      title: VectorSearchResult
      description: Schema for search result documents.

````