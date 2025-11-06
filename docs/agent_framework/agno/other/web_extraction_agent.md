# Web Extraction Agent

> Original Document: [Web Extraction Agent](https://docs.agno.com/examples/use-cases/agents/web_extraction_agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:16.984Z

---

# Web Extraction Agent

This agent demonstrates how to build an intelligent web scraper that can extract comprehensive, structured information from any webpage. Using OpenAI's GPT-4 model and the Firecrawl tool, it transforms raw web content into organized, actionable data.

### Key Capabilities

* **Page Metadata Extraction**: Captures title, description, and key features
* **Content Section Parsing**: Identifies and extracts main content with headings
* **Link Discovery**: Finds important related pages and resources
* **Contact Information**: Locates contact details when available
* **Contextual Metadata**: Gathers additional site information for context

### Use Cases

* **Research & Analysis**: Quickly gather information from multiple web sources
* **Competitive Intelligence**: Monitor competitor websites and features
* **Content Monitoring**: Track changes and updates on specific pages
* **Knowledge Base Building**: Extract structured data for documentation
* **Data Collection**: Gather information for market research or analysis

The agent outputs structured data in a clean, organized format that makes web content easily digestible and actionable. It's particularly useful when you need to process large amounts of web content quickly and consistently.

## Code

```python cookbook/examples/agents/web_extraction_agent.py theme={null}
from textwrap import dedent
from typing import Dict, List, Optional

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.firecrawl import FirecrawlTools
from pydantic import BaseModel, Field
from rich.pretty import pprint


class ContentSection(BaseModel):
    """Represents a section of content from the webpage."""

    heading: Optional[str] = Field(None, description="Section heading")
    content: str = Field(..., description="Section content text")


class PageInformation(BaseModel):
    """Structured representation of a webpage."""

    url: str = Field(..., description="URL of the page")
    title: str = Field(..., description="Title of the page")
    description: Optional[str] = Field(
        None, description="Meta description or summary of the page"
    )
    features: Optional[List[str]] = Field(None, description="Key feature list")
    content_sections: Optional[List[ContentSection]] = Field(
        None, description="Main content sections of the page"
    )
    links: Optional[Dict[str, str]] = Field(
        None, description="Important links found on the page with description"
    )
    contact_info: Optional[Dict[str, str]] = Field(
        None, description="Contact information if available"
    )
    metadata: Optional[Dict[str, str]] = Field(
        None, description="Important metadata from the page"
    )


agent = Agent(
    model=OpenAIChat(id="gpt-4.1"),
    tools=[FirecrawlTools(scrape=True, crawl=True)],
    instructions=dedent("""
        You are an expert web researcher and content extractor. Extract comprehensive, structured information
        from the provided webpage. Focus on:

        1. Accurately capturing the page title, description, and key features
        2. Identifying and extracting main content sections with their headings
        3. Finding important links to related pages or resources
        4. Locating contact information if available
        5. Extracting relevant metadata that provides context about the site

        Be thorough but concise. If the page has extensive content, prioritize the most important information.
    """).strip(),
    output_schema=PageInformation,
)

result = agent.run("Extract all information from https://www.agno.com")
pprint(result.content)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    export FIRECRAWL_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno firecrawl
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/examples/agents/web_extraction_agent.py
      ```

      ```bash Windows theme={null}
      python cookbook/examples/agents/web_extraction_agent.py
      ```
    </CodeGroup>
  </Step>
</Steps>
