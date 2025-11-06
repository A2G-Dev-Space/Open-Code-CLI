# Verify Webhook

> Original Document: [Verify Webhook](https://docs.agno.com/reference-api/schema/whatsapp/verify-webhook.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.193Z

---

# Verify Webhook

> Handle WhatsApp webhook verification

## OpenAPI

````yaml get /whatsapp/webhook
paths:
  path: /whatsapp/webhook
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