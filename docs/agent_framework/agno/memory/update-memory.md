# Update Memory

> Original Document: [Update Memory](https://docs.agno.com/reference-api/schema/memory/update-memory.md)
> Category: memory
> Downloaded: 2025-11-06T11:51:17.158Z

---

# Update Memory

> Update an existing user memory's content and topics. Replaces the entire memory content and topic list with the provided values.

## OpenAPI

````yaml patch /memories/{memory_id}
paths:
  path: /memories/{memory_id}
  method: patch
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
        memory_id:
          schema:
            - type: string
              required: true
              title: Memory Id
              description: Memory ID to update
      query:
        db_id:
          schema:
            - type: string
              required: false
              title: Db Id
              description: Database ID to use for update
            - type: 'null'
              required: false
              title: Db Id
              description: Database ID to use for update
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              memory:
                allOf:
                  - type: string
                    title: Memory
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              topics:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Topics
            required: true
            title: UserMemoryCreateSchema
            description: Define the payload expected for creating a new user memory
            refIdentifier: '#/components/schemas/UserMemoryCreateSchema'
            requiredProperties:
              - memory
        examples:
          example:
            value:
              memory: <string>
              user_id: <string>
              topics:
                - <string>
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              memory_id:
                allOf:
                  - type: string
                    title: Memory Id
              memory:
                allOf:
                  - type: string
                    title: Memory
              topics:
                allOf:
                  - anyOf:
                      - items:
                          type: string
                        type: array
                      - type: 'null'
                    title: Topics
              agent_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Agent Id
              team_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: Team Id
              user_id:
                allOf:
                  - anyOf:
                      - type: string
                      - type: 'null'
                    title: User Id
              updated_at:
                allOf:
                  - anyOf:
                      - type: string
                        format: date-time
                      - type: 'null'
                    title: Updated At
            title: UserMemorySchema
            refIdentifier: '#/components/schemas/UserMemorySchema'
            requiredProperties:
              - memory_id
              - memory
              - topics
              - agent_id
              - team_id
              - user_id
              - updated_at
        examples:
          example:
            value:
              memory_id: f9361a69-2997-40c7-ae4e-a5861d434047
              memory: User likes coffee.
              topics:
                - preferences
              user_id: '123'
              updated_at: '2025-09-01T07:53:17Z'
        description: Memory updated successfully
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
        description: Invalid request data
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
        description: Memory not found
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
        description: Validation error in payload
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
        description: Failed to update memory
  deprecated: false
  type: path
components:
  schemas: {}

````