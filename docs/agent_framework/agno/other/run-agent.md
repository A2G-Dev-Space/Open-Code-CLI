# Run Agent

> Original Document: [Run Agent](https://docs.agno.com/reference-api/schema/agui/run-agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.111Z

---

# Run Agent

## OpenAPI

````yaml post /agui
paths:
  path: /agui
  method: post
  request:
    security: []
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
              threadId:
                allOf:
                  - type: string
                    title: Threadid
              runId:
                allOf:
                  - type: string
                    title: Runid
              state:
                allOf:
                  - title: State
              messages:
                allOf:
                  - items:
                      oneOf:
                        - $ref: '#/components/schemas/DeveloperMessage'
                        - $ref: '#/components/schemas/SystemMessage'
                        - $ref: '#/components/schemas/AssistantMessage'
                        - $ref: '#/components/schemas/UserMessage'
                        - $ref: '#/components/schemas/ToolMessage'
                      discriminator:
                        propertyName: role
                        mapping:
                          assistant: '#/components/schemas/AssistantMessage'
                          developer: '#/components/schemas/DeveloperMessage'
                          system: '#/components/schemas/SystemMessage'
                          tool: '#/components/schemas/ToolMessage'
                          user: '#/components/schemas/UserMessage'
                    type: array
                    title: Messages
              tools:
                allOf:
                  - items:
                      $ref: '#/components/schemas/Tool'
                    type: array
                    title: Tools
              context:
                allOf:
                  - items:
                      $ref: '#/components/schemas/Context'
                    type: array
                    title: Context
              forwardedProps:
                allOf:
                  - title: Forwardedprops
            required: true
            title: RunAgentInput
            description: Input for running an agent.
            refIdentifier: '#/components/schemas/RunAgentInput'
            requiredProperties:
              - threadId
              - runId
              - state
              - messages
              - tools
              - context
              - forwardedProps
            additionalProperties: false
        examples:
          example:
            value:
              threadId: <string>
              runId: <string>
              state: <any>
              messages:
                - id: <string>
                  role: developer
                  content: <string>
                  name: <string>
              tools:
                - name: <string>
                  description: <string>
                  parameters: <any>
              context:
                - description: <string>
                  value: <string>
              forwardedProps: <any>
  response:
    '200':
      application/json:
        schemaArray:
          - type: any
        examples:
          example:
            value: <any>
        description: Successful Response
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              detail:
                allOf:
                  - items:
                      $ref: '#/components/schemas/ValidationError'
                    type: array
                    title: Detail
            title: HTTPValidationError
            refIdentifier: '#/components/schemas/HTTPValidationError'
        examples:
          example:
            value:
              detail:
                - loc:
                    - <string>
                  msg: <string>
                  type: <string>
        description: Validation Error
  deprecated: false
  type: path
components:
  schemas:
    AssistantMessage:
      properties:
        id:
          type: string
          title: Id
        role:
          type: string
          const: assistant
          title: Role
          default: assistant
        content:
          anyOf:
            - type: string
            - type: 'null'
          title: Content
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        toolCalls:
          anyOf:
            - items:
                $ref: '#/components/schemas/ToolCall'
              type: array
            - type: 'null'
          title: Toolcalls
      additionalProperties: false
      type: object
      required:
        - id
      title: AssistantMessage
      description: An assistant message.
    Context:
      properties:
        description:
          type: string
          title: Description
        value:
          type: string
          title: Value
      additionalProperties: false
      type: object
      required:
        - description
        - value
      title: Context
      description: Additional context for the agent.
    DeveloperMessage:
      properties:
        id:
          type: string
          title: Id
        role:
          type: string
          const: developer
          title: Role
          default: developer
        content:
          type: string
          title: Content
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
      additionalProperties: false
      type: object
      required:
        - id
        - content
      title: DeveloperMessage
      description: A developer message.
    FunctionCall:
      properties:
        name:
          type: string
          title: Name
        arguments:
          type: string
          title: Arguments
      additionalProperties: false
      type: object
      required:
        - name
        - arguments
      title: FunctionCall
      description: Name and arguments of a function call.
    SystemMessage:
      properties:
        id:
          type: string
          title: Id
        role:
          type: string
          const: system
          title: Role
          default: system
        content:
          type: string
          title: Content
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
      additionalProperties: false
      type: object
      required:
        - id
        - content
      title: SystemMessage
      description: A system message.
    Tool:
      properties:
        name:
          type: string
          title: Name
        description:
          type: string
          title: Description
        parameters:
          title: Parameters
      additionalProperties: false
      type: object
      required:
        - name
        - description
        - parameters
      title: Tool
      description: A tool definition.
    ToolCall:
      properties:
        id:
          type: string
          title: Id
        type:
          type: string
          const: function
          title: Type
          default: function
        function:
          $ref: '#/components/schemas/FunctionCall'
      additionalProperties: false
      type: object
      required:
        - id
        - function
      title: ToolCall
      description: A tool call, modelled after OpenAI tool calls.
    ToolMessage:
      properties:
        id:
          type: string
          title: Id
        role:
          type: string
          const: tool
          title: Role
          default: tool
        content:
          type: string
          title: Content
        toolCallId:
          type: string
          title: Toolcallid
      additionalProperties: false
      type: object
      required:
        - id
        - content
        - toolCallId
      title: ToolMessage
      description: A tool result message.
    UserMessage:
      properties:
        id:
          type: string
          title: Id
        role:
          type: string
          const: user
          title: Role
          default: user
        content:
          type: string
          title: Content
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
      additionalProperties: false
      type: object
      required:
        - id
        - content
      title: UserMessage
      description: A user message.
    ValidationError:
      properties:
        loc:
          items:
            anyOf:
              - type: string
              - type: integer
          type: array
          title: Location
        msg:
          type: string
          title: Message
        type:
          type: string
          title: Error Type
      type: object
      required:
        - loc
        - msg
        - type
      title: ValidationError

````