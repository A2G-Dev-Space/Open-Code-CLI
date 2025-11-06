# Webhook

> Original Document: [Webhook](https://docs.agno.com/reference-api/schema/whatsapp/webhook.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.189Z

---

# Webhook

> Handle incoming WhatsApp messages

## OpenAPI

````yaml post /whatsapp/webhook
paths:
  path: /whatsapp/webhook
  method: post
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