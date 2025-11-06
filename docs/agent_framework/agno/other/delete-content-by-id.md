# Delete Content by ID

> Original Document: [Delete Content by ID](https://docs.agno.com/reference-api/schema/knowledge/delete-content-by-id.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.122Z

---

# Delete Content by ID

> Permanently remove a specific content item from the knowledge base. This action cannot be undone.

## OpenAPI

````yaml delete /knowledge/content/{content_id}
paths:
  path: /knowledge/content/{content_id}
  method: delete
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
        content_id:
          schema:
            - type: string
              required: true
              title: Content Id
      query:
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
              id: <string>
              name: <string>
              description: <string>
              type: <string>
              size: <string>
              linked_to: <string>
              metadata: {}
              access_count: 123
              status: processing
              status_message: <string>
              created_at: '2023-11-07T05:31:56Z'
              updated_at: '2023-11-07T05:31:56Z'
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
        description: Content not found
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
        description: Failed to delete content
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