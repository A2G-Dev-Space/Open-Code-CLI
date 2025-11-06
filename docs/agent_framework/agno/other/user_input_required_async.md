# User Input Required Async

> Original Document: [User Input Required Async](https://docs.agno.com/examples/concepts/agent/human_in_the_loop/user_input_required_async.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.385Z

---

# User Input Required Async

This example demonstrates how to use the `requires_user_input` parameter with asynchronous operations. It shows how to collect specific user input fields in an async environment.

## Code

```python user_input_required_async.py theme={null}
"""🤝 Human-in-the-Loop: Allowing users to provide input externally"""

import asyncio
from typing import List

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool
from agno.tools.function import UserInputField
from agno.utils import pprint


# You can either specify the user_input_fields leave empty for all fields to be provided by the user
@tool(requires_user_input=True, user_input_fields=["to_address"])
def send_email(subject: str, body: str, to_address: str) -> str:
    """
    Send an email.

    Args:
        subject (str): The subject of the email.
        body (str): The body of the email.
        to_address (str): The address to send the email to.
    """
    return f"Sent email to {to_address} with subject {subject} and body {body}"


agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[send_email],
    markdown=True,
)

run_response = asyncio.run(
    agent.arun("Send an email with the subject 'Hello' and the body 'Hello, world!'")
)
if run_response.is_paused:  # Or agent.run_response.is_paused
    for tool in run_response.tools_requiring_user_input:  # type: ignore
        input_schema: List[UserInputField] = tool.user_input_schema  # type: ignore

        for field in input_schema:
            # Get user input for each field in the schema
            field_type = field.field_type
            field_description = field.description

            # Display field information to the user
            print(f"\nField: {field.name}")
            print(f"Description: {field_description}")
            print(f"Type: {field_type}")

            # Get user input
            if field.value is None:
                user_value = input(f"Please enter a value for {field.name}: ")
            else:
                print(f"Value: {field.value}")
                user_value = field.value

            # Update the field value
            field.value = user_value

    run_response = asyncio.run(agent.acontinue_run(run_response=run_response))
    pprint.pprint_run_response(run_response)

# Or for simple debug flow
# agent.print_response("Send an email with the subject 'Hello' and the body 'Hello, world!'")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno openai
    ```
  </Step>

  <Step title="Export your OpenAI API key">
    <CodeGroup>
      ```bash Mac/Linux theme={null}
        export OPENAI_API_KEY="your_openai_api_key_here"
      ```

      ```bash Windows theme={null}
        $Env:OPENAI_API_KEY="your_openai_api_key_here"
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Python file">
    Create a Python file and add the above code.

    ```bash  theme={null}
    touch user_input_required_async.py
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python user_input_required_async.py
      ```

      ```bash Windows   theme={null}
      python user_input_required_async.py
      ```
    </CodeGroup>
  </Step>

  <Step title="Find All Cookbooks">
    Explore all the available cookbooks in the Agno repository. Click the link below to view the code on GitHub:

    <Link href="https://github.com/agno-agi/agno/tree/main/cookbook/agents/human_in_the_loop" target="_blank">
      Agno Cookbooks on GitHub
    </Link>
  </Step>
</Steps>
