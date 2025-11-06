# Get Status

> Original Document: [Get Status](https://docs.agno.com/reference-api/schema/agui/get-status.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.107Z

---

# Get Status

## OpenAPI

````yaml get /status
paths:
  path: /status
  method: get
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Successful Response
  deprecated: false
  type: path
components:
  schemas: {}

````