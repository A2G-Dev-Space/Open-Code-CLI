# Firecrawl Reader

> Original Document: [Firecrawl Reader](https://docs.agno.com/examples/concepts/knowledge/readers/firecrawl/firecrawl-reader.md)
> Category: other
> Downloaded: 2025-11-06T11:51:14.779Z

---

# Firecrawl Reader

The **Firecrawl Reader** uses the Firecrawl API to scrape and crawl web content, converting it into documents for your knowledge base.

## Code

```python examples/concepts/knowledge/readers/firecrawl_reader.py theme={null}
import os

from agno.knowledge.reader.firecrawl_reader import FirecrawlReader

api_key = os.getenv("FIRECRAWL_API_KEY")

reader = FirecrawlReader(
    api_key=api_key,
    mode="scrape",
    chunk=True,
    # for crawling
    # params={
    #     'limit': 5,
    #     'scrapeOptions': {'formats': ['markdown']}
    # }
    # for scraping
    params={"formats": ["markdown"]},
)

try:
    print("Starting scrape...")
    documents = reader.read("https://github.com/agno-agi/agno")

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
    pip install -U firecrawl-py agno
    ```
  </Step>

  <Step title="Set API Key">
    ```bash  theme={null}
    export FIRECRAWL_API_KEY="your-firecrawl-api-key"
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python examples/concepts/knowledge/readers/firecrawl_reader.py
      ```

      ```bash Windows theme={null}
      python examples/concepts/knowledge/readers/firecrawl_reader.py
      ```
    </CodeGroup>
  </Step>
</Steps>

## Params

<Snippet file="firecrawl-reader-reference.mdx" />
