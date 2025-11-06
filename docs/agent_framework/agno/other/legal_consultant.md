# Legal Consultant

> Original Document: [Legal Consultant](https://docs.agno.com/examples/use-cases/agents/legal_consultant.md)
> Category: other
> Downloaded: 2025-11-06T11:51:16.922Z

---

# Legal Consultant

This example demonstrates how to create a specialized AI agent that provides legal information and guidance based on a knowledge base of legal documents. The Legal Consultant agent is designed to help users understand legal concepts, consequences, and procedures by leveraging a vector database of legal content.

**Key Features:**

* **Legal Knowledge Base**: Integrates with a PostgreSQL vector database containing legal documents and resources
* **Document Processing**: Automatically ingests and indexes legal PDFs from authoritative sources (e.g., Department of Justice manuals)
* **Contextual Responses**: Provides relevant legal information with proper citations and sources
* **Professional Disclaimers**: Always clarifies that responses are for informational purposes only, not professional legal advice
* **Attorney Referrals**: Recommends consulting licensed attorneys for specific legal situations

**Use Cases:**

* Legal research and education
* Understanding criminal penalties and consequences
* Learning about legal procedures and requirements
* Getting preliminary legal information before consulting professionals

## Code

```python cookbook/examples/agents/legal_consultant.py theme={null}
import asyncio

from agno.agent import Agent
from agno.knowledge.knowledge import Knowledge
from agno.models.openai import OpenAIChat
from agno.vectordb.pgvector import PgVector

db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

knowledge = Knowledge(
    vector_db=PgVector(table_name="legal_docs", db_url=db_url),
)

asyncio.run(
    knowledge.add_content_async(
        url="https://www.justice.gov/d9/criminal-ccips/legacy/2015/01/14/ccmanual_0.pdf",
    )
)

legal_agent = Agent(
    name="LegalAdvisor",
    knowledge=knowledge,
    search_knowledge=True,
    model=OpenAIChat(id="gpt-5-mini"),
    markdown=True,
    instructions=[
        "Provide legal information and advice based on the knowledge base.",
        "Include relevant legal citations and sources when answering questions.",
        "Always clarify that you're providing general legal information, not professional legal advice.",
        "Recommend consulting with a licensed attorney for specific legal situations.",
    ],
)

legal_agent.print_response(
    "What are the legal consequences and criminal penalties for spoofing Email Address?",
    stream=True,
)

```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Set your API key">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install -U agno sqlalchemy openai psycopg
    ```
  </Step>

  <Step title="Run Agent">
    <CodeGroup>
      ```bash Mac theme={null}
      python cookbook/examples/agents/legal_consultant.py
      ```

      ```bash Windows theme={null}
      python cookbook/examples/agents/legal_consultant.py
      ```
    </CodeGroup>
  </Step>
</Steps>
