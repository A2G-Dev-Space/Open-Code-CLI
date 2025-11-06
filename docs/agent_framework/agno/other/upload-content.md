# Upload Content

> Original Document: [Upload Content](https://docs.agno.com/reference-api/schema/knowledge/upload-content.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.134Z

---

# Upload Content

> Upload content to the knowledge base. Supports file uploads, text content, or URLs. Content is processed asynchronously in the background. Supports custom readers and chunking strategies.

## OpenAPI

````yaml post /knowledge/content
paths:
  path: /knowledge/content
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
              description: Database ID to use for content storage
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for content storage
      header: {}
      cookie: {}
    body:
      multipart/form-data:
        schemaArray:
          - type: object
            properties:
              name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
                    description: >-
                      Content name (auto-generated from file/URL if not
                      provided)
              description:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Description
                    description: Content description for context
              url:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Url
                    description: >-
                      URL to fetch content from (JSON array or single URL
                      string)
              metadata:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Metadata
                    description: JSON metadata object for additional content properties
              file:
                allOf:
                  - anyOf:
                      - type: string
                        format: binary
                      - type: 'null'
                    title: File
                    description: File to upload for processing
              text_content:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Text Content
                    description: Raw text content to process
              reader_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Reader Id
                    description: ID of the reader to use for content processing
              chunker:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Chunker
                    description: Chunking strategy to apply during processing
            title: Body_upload_content
            refIdentifier: '#/components/schemas/Body_upload_content'
        examples:
          example:
            value:
              name: <string>
              description: <string>
              url: <string>
              metadata: <string>
              text_content: <string>
              reader_id: <string>
              chunker: <string>
  response:
    '202':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    title: Id
              name:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Name
              description:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Description
              type:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Type
              size:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Size
              linked_to:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Linked To
              metadata:
                allOf:
                  - anyOf:
                      - additionalProperties: true
                        type: object
                      - type: 'null'
                    title: Metadata
              access_count:
                allOf:
                  - anyOf:
                      - type: integer
                      - type: 'null'
                    title: Access Count
              status:
                allOf:
                  - anyOf:
                      - $ref: '#/components/schemas/ContentStatus'
                      - type: 'null'
              status_message:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Status Message
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
            title: ContentResponseSchema
            refIdentifier: '#/components/schemas/ContentResponseSchema'
            requiredProperties:
              - id
        examples:
          example:
            value:
              id: content-123
              name: example-document.pdf
              description: Sample document for processing
              metadata:
                category: documentation
                priority: high
              status: processing
        description: Content upload accepted for processing
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
        description: Invalid request - malformed metadata or missing content
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
        description: Validation error in form data
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
    ContentStatus:
      type: string
      enum:
        - processing
        - completed
        - failed
      title: ContentStatus
      description: Enumeration of possible content processing statuses.

````