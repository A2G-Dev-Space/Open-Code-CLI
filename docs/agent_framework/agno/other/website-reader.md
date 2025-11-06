# Website Reader

> Original Document: [Website Reader](https://docs.agno.com/examples/concepts/knowledge/readers/website/website-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.826Z

---

# Website Reader

The **Website Reader** crawls and processes entire websites, following links to create comprehensive knowledge bases from web content.

## Code

```python examples/concepts/knowledge/readers/web_reader.py theme={null}
from agno.knowledge.reader.website_reader import WebsiteReader

reader = WebsiteReader(max_depth=3, max_links=10)

try:
    print("Starting read...")
    documents = reader.read("https://docs.agno.com/introduction")
    if documents:
        for doc in documents:
            print(doc.name)
            print(doc.content)
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
    pip install -U requests beautifulsoup4 agno openai
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/web_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/web_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="website-reader-reference.mdx" />
