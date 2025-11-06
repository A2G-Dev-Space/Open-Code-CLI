# Manage Knowledge

> Original Document: [Manage Knowledge](https://docs.agno.com/agent-os/customize/os/manage_knowledge.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.507Z

---

# Manage Knowledge

> Attach Knowledge to your AgentOS instance

You can manage Agno Knowledge instances through the AgentOS control plane.
This allows you to add, edit and remove content from your Knowledge bases
independently of any specific Agent or Team.

You can specify multiple Knowledge bases and reuse the same Knowledge instance
across different Agents or Teams as needed.

## Prerequisites

Before setting up Knowledge management in AgentOS, ensure you have:

* PostgreSQL database running and accessible - used for this example
* Required dependencies installed: `pip install agno`
* OpenAI API key configured (for embeddings)
* Basic understanding of [Knowledge concepts](/concepts/knowledge/getting-started)

## Example

This example demonstrates how to attach multiple Knowledge bases to AgentOS
and populate them with content from different sources.

```python agentos_knowledge.py theme={null}
from textwrap import dedent

from agno.db.postgres import PostgresDb
from agno.knowledge.embedder.openai import OpenAIEmbedder
from agno.knowledge.knowledge import Knowledge
from agno.os import AgentOS
from agno.vectordb.pgvector import PgVector, SearchType

# ************* Setup Knowledge Databases *************
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"
documents_db = PostgresDb(
    db_url,
    id="agno_knowledge_db",
    knowledge_table="agno_knowledge_contents",
)
faq_db = PostgresDb(
    db_url,
    id="agno_faq_db",
    knowledge_table="agno_faq_contents",
)
# *******************************

documents_knowledge = Knowledge(
    vector_db=PgVector(
        db_url=db_url,
        table_name="agno_knowledge_vectors",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(id="text-embedding-3-small"),
    ),
    contents_db=documents_db,
)

faq_knowledge = Knowledge(
    vector_db=PgVector(
        db_url=db_url,
        table_name="agno_faq_vectors",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(id="text-embedding-3-small"),
    ),
    contents_db=faq_db,
)

agent_os = AgentOS(
    description="Example app with AgentOS Knowledge",
    # Add the knowledge bases to AgentOS
    knowledge=[documents_knowledge, faq_knowledge],
)


app = agent_os.get_app()

if __name__ == "__main__":
    documents_knowledge.add_content(
        name="Agno Docs", url="https://docs.agno.com/llms-full.txt", skip_if_exists=True
    )
    faq_knowledge.add_content(
        name="Agno FAQ",
        text_content=dedent("""
            What is Agno?
            Agno is a framework for building agents.
            Use it to build multi-agent systems with memory, knowledge,
            human in the loop and MCP support.
        """),
        skip_if_exists=True,
    )
    # Run your AgentOS
    # You can test your AgentOS at: http://localhost:7777/

    agent_os.serve(app="agentos_knowledge:app")
```

### Screenshots

The screenshots below show how you can access and manage your different Knowledge bases through the AgentOS interface:

<img src="https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=0ec9015b0454161b4505c8b144130ef1" alt="llm-app-aidev-run" data-og-width="1717" width="1717" data-og-height="396" height="396" data-path="images/agno_knowledge_db.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=280&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=eb00fe44299cec9451cd6cdebc44e9f2 280w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=560&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=e796c3147bf36d23c2c93280821b5bb0 560w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=840&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=7f9c0d49415976200f06a318928e2f92 840w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=1100&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=6cda6da6c4467279f58650cdd46af23c 1100w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=1650&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=b7c1869a66bc161041f3c342ecdb4ed8 1650w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_knowledge_db.png?w=2500&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=3542d2be09ad321719c1e86ec916debf 2500w" />

<img src="https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=e26a27eb3a5d369931e8f5abe45c2b58" alt="llm-app-aidev-run" data-og-width="1717" width="1717" data-og-height="396" height="396" data-path="images/agno_faq_db.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=280&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=0ed5c972cbc1480a8c3ed68f1c9a9c7a 280w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=560&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=d937593a927f68669063c6c2242963cb 560w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=840&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=69803d582a2a7aff6eb5123178dfc177 840w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=1100&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=cba7bff20213a1af3f2b09ad983de581 1100w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=1650&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=ab48eaf2440479a1af0507dcf5fed53c 1650w, https://mintcdn.com/agno-v2/d1Mr9QfTpi3u63B7/images/agno_faq_db.png?w=2500&fit=max&auto=format&n=d1Mr9QfTpi3u63B7&q=85&s=1f0ed266857a1fd2c74008f312c32ee2 2500w" />

## Managing Knowledge via AgentOS control plane

Once your Knowledge bases are attached to AgentOS, you can:

* **View Content**: Browse and search through your Knowledge base contents
* **Add Content**: Upload new documents, add URLs, or input text directly
* **Edit Content**: Modify metadata on existing Knowledge entries
* **Delete Content**: Remove outdated or incorrect information

## Best Practices

* **Separate Knowledge by Domain**: Create separate Knowledge bases for different topics (e.g., technical docs, FAQs, policies)
* **Consistent Naming**: Use descriptive names for your Knowledge bases that reflect their content
* **Regular Updates**: Keep your Knowledge bases current by regularly adding new content and removing outdated information
* **Monitor Performance**: Use different table names for vector storage to avoid conflicts
* **Content Organization**: Use the `name` parameter when adding content to make it easily identifiable

## Troubleshooting

<AccordionGroup>
  <Accordion title="Knowledge base not appearing in AgentOS interface">
    Ensure your knowledge base is properly added to the `knowledge` parameter when creating your AgentOS instance.
    Also make sure to attach a `contents_db` to your Knowledge instance.
  </Accordion>

  <Accordion title="Database connection errors">
    Verify your PostgreSQL connection string and ensure the database is running and accessible.
  </Accordion>

  <Accordion title="Content not being found in searches">
    Check that your content has been properly embedded by verifying entries in your vector database table.
  </Accordion>
</AccordionGroup>
