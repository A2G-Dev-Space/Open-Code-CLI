# Status

> Original Document: [Status](https://docs.agno.com/reference-api/schema/whatsapp/status.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.187Z

---

# Status

## OpenAPI

````yaml get /whatsapp/status
paths:
  path: /whatsapp/status
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