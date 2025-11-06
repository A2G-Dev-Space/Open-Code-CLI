# CSV Reader

> Original Document: [CSV Reader](https://docs.agno.com/examples/concepts/knowledge/readers/csv/csv-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.773Z

---

# CSV Reader

The **CSV Reader** processes local CSV files and converts them into documents that can be used with Agno's knowledge system.

## Code

```python examples/concepts/knowledge/readers/csv_reader.py theme={null}
from pathlib import Path

from agno.knowledge.reader.csv_reader import CSVReader

reader = CSVReader()

csv_path = Path("tmp/test.csv")

try:
    print("Starting read...")
    documents = reader.read(csv_path)

    if documents:
        for doc in documents:
            print(doc.name)
            # print(doc.content)
            print(f"Content length: {len(doc.content)}")
            print("-" * 80)
    else:
        print("No documents were returned")

except Exception as e:
    print(f"Error type: {type(e)}")
    print(f"Error occurred: {str(e)}")
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U pandas agno
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/csv_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/csv_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="csv-reader-reference.mdx" />
