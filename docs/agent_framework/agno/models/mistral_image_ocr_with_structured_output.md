# Image Ocr With Structured Output

> Original Document: [Image Ocr With Structured Output](https://docs.agno.com/examples/models/mistral/image_ocr_with_structured_output.md)
> Category: models
> Downloaded: 2025-11-06T11:51:16.104Z

---

# Image Ocr With Structured Output

## Code

```python cookbook/models/mistral/image_ocr_with_structured_output.py theme={null}
from typing import List

from agno.agent import Agent
from agno.media import Image
from agno.models.mistral.mistral import MistralChat
from pydantic import BaseModel


class GroceryItem(BaseModel):
    item_name: str
    price: float


class GroceryListElements(BaseModel):
    bill_number: str
    items: List[GroceryItem]
    total_price: float


agent = Agent(
    model=MistralChat(id="pixtral-12b-2409"),
    instructions=[
        "Extract the text elements described by the user from the picture",
    ],
    output_schema=GroceryListElements,
    markdown=True,
)

agent.print_response(
    "From this restaurant bill, extract the bill number, item names and associated prices, and total price and return it as a string in a Json object",
    images=[Image(url="https://i.imghippo.com/files/kgXi81726851246.jpg")],
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export MISTRAL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U mistralai agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/models/mistral/image_ocr_with_structured_output.py
      ```

      ```bash Windows theme={null}
      python cookbook/models/mistral/image_ocr_with_structured_output.py
      ```
    </CodeGroup>
  </Step>
</Steps>
