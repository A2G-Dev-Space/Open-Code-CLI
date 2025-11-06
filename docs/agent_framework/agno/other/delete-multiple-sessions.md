# Delete Multiple Sessions

> Original Document: [Delete Multiple Sessions](https://docs.agno.com/reference-api/schema/sessions/delete-multiple-sessions.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.171Z

---

# Delete Multiple Sessions

> Delete multiple sessions by their IDs in a single operation. This action cannot be undone and will permanently remove all specified sessions and their runs.

## OpenAPI

````yaml delete /sessions
paths:
  path: /sessions
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
              description: Default session type filter
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to use for deletion
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for deletion
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              session_ids:
                allOf:
                  - items:
                      type: string
                    type: array
                    title: Session Ids
              session_types:
                allOf:
                  - items:
                      $ref: '#/components/schemas/SessionType'
                    type: array
                    title: Session Types
            required: true
            title: DeleteSessionRequest
            refIdentifier: '#/components/schemas/DeleteSessionRequest'
            requiredProperties:
              - session_ids
              - session_types
        examples:
          example:
            value:
              session_ids:
                - <string>
              session_types:
                - agent
  response:
    '204':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Sessions deleted successfully
        examples: {}
        description: Sessions deleted successfully
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
        description: Invalid request - session IDs and types length mismatch
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
        description: Failed to delete sessions
  deprecated: false
  type: path
components:
  schemas:
    SessionType:
      type: string
      enum:
        - agent
        - team
        - workflow
      title: SessionType

````