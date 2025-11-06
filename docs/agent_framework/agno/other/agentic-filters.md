# null

> Original Document: [null](https://docs.agno.com/concepts/knowledge/filters/agentic-filters.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.692Z

---

# null

# Agentic Knowledge Filters

Agentic filtering lets the Agent automatically extract filter criteria from your query text, making the experience more natural and interactive.

## Step 1: Attach Metadata

There are two ways to attach metadata to your documents:

1. **Attach Metadata When Initializing the Knowledge Base**

   ```python  theme={null}
   knowledge_base = Knowledge(
       vector_db=vector_db,
   )

   knowledge_base.add_contents(
       [
           {
               "path": "path/to/cv1.pdf",
               "metadata": {
                   "user_id": "jordan_mitchell",
                   "document_type": "cv",
                   "year": 2025,
               },
           },
           # ... more documents ...
       ]
   )

   ```

2. **Attach Metadata When Loading Documents One by One**

   ```python  theme={null}
   # Initialize Knowledge
   knowledge_base = Knowledge(
       vector_db=vector_db,
       max_results=5,
   )

   # Load first document with user_1 metadata
   knowledge_base.add_content(
       path=path/to/cv1.pdf,
       metadata={"user_id": "jordan_mitchell", "document_type": "cv", "year": 2025},
   )

   # Load second document with user_2 metadata
   knowledge_base.add_content(
       path=path/to/cv2.pdf,
       metadata={"user_id": "taylor_brooks", "document_type": "cv", "year": 2025},
   )
   ```

***

## How It Works

When you enable agentic filtering (`enable_agentic_knowledge_filters=True`), the Agent analyzes your query and applies filters based on the metadata it detects.

**Example:**

```python  theme={null}
agent = Agent(
    knowledge=knowledge_base,
    search_knowledge=True,
    enable_agentic_knowledge_filters=True,
)
agent.print_response(
    "Tell me about Jordan Mitchell's experience and skills with jordan_mitchell as user id and document type cv",
    markdown=True,
)
```

In this example, the Agent will automatically use:

* `user_id = "jordan_mitchell"`
* `document_type = "cv"`

***

## 🌟 See Agentic Filters in Action!

Experience how agentic filters automatically extract relevant metadata from your query.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2bf046e2fb9607b1db6e8a1b5ee0ead0" alt="Agentic Filters in Action" data-og-width="1740" width="1740" data-og-height="715" height="715" data-path="images/agentic_filters.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=0245d20f27f0679692757ba76db108bc 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=24d9bd1af34e8846247939e2d74b27ac 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=04efcadbf12c4616ef040032fb9b33ff 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=1a905546407daa3fc8a19a2972bc4153 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=b86573d2610c92c819677f366619146e 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/agentic_filters.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=46ae6ac18ae5b147a8c7eee02c45cfff 2500w" />

*The Agent intelligently narrows down results based on your query.*

***

## When to Use Agentic Filtering

* When you want a more conversational, user-friendly experience.
* When users may not know the exact filter syntax.

## Try It Out!

* Enable `enable_agentic_knowledge_filters=True` on your Agent.
* Ask questions naturally, including filter info in your query.
* See how the Agent narrows down results automatically!

***

## Developer Resources

* [Agentic filtering](https://github.com/agno-agi/agno/blob/main/cookbook/knowledge/filters/agentic_filtering.py)
