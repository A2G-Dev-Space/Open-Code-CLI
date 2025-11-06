# WhatsApp Image Generation Agent (Tool-based)

> Original Document: [WhatsApp Image Generation Agent (Tool-based)](https://docs.agno.com/examples/agent-os/interfaces/whatsapp/image_generation_tools.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:14.274Z

---

# WhatsApp Image Generation Agent (Tool-based)

> WhatsApp agent that generates images using OpenAI's image generation tools

## Code

```python cookbook/os/interfaces/whatsapp/image_generation_tools.py theme={null}
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.os.app import AgentOS
from agno.os.interfaces.whatsapp import Whatsapp
from agno.tools.openai import OpenAITools

agent_db = SqliteDb(db_file="tmp/persistent_memory.db")
image_agent = Agent(
    id="image_generation_tools",
    db=agent_db,
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[OpenAITools(image_model="gpt-image-1")],
    markdown=True,
    debug_mode=True,
    add_history_to_context=True,
)

agent_os = AgentOS(
    agents=[image_agent],
    interfaces=[Whatsapp(agent=image_agent)],
)
app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve(app="image_generation_tools:app", reload=True)
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set Environment Variables">
    ```bash  theme={null}
    export WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
    export WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
    export WHATSAPP_WEBHOOK_URL=your_webhook_url
    export WHATSAPP_VERIFY_TOKEN=your_verify_token
    export OPENAI_API_KEY=your_openai_api_key
    export APP_ENV=development
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno
    ```
  </Step>

  <Step title="Run Example">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/os/interfaces/whatsapp/image_generation_tools.py
      ```

      ```bash Windows theme={null}
      python cookbook/os/interfaces/whatsapp/image_generation_tools.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Key Features

* **Tool-based Generation**: OpenAI's GPT Image-1 model via external tools
* **High-Quality Images**: Professional-grade image generation
* **Conversational Interface**: Natural language interaction for image requests
* **History Context**: Remembers previous images and conversations
* **GPT-4o Orchestration**: Intelligent conversation and tool management
