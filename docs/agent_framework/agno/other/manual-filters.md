# null

> Original Document: [null](https://docs.agno.com/concepts/knowledge/filters/manual-filters.md)
> Category: other
> Downloaded: 2025-11-06T11:51:13.693Z

---

# null

# Manual Knowledge Filters

Manual filtering gives you full control over which documents are searched by specifying filters directly in your code.

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

> 💡 **Tips:**\
> • Use **Option 1** if you have all your documents and metadata ready at once.\
> • Use **Option 2** if you want to add documents incrementally or as they become available.

## Step 2: Query with Filters

You can pass filters in two ways:

### 1. On the Agent (applies to all queries)

```python  theme={null}
agent = Agent(
    knowledge=knowledge_base,
    search_knowledge=True,
    knowledge_filters={"user_id": "jordan_mitchell"},
)
agent.print_response(
    "Tell me about Jordan Mitchell's experience and skills",
    markdown=True,
)
```

### 2. On Each Query (overrides Agent filters for that run)

```python  theme={null}
agent = Agent(
    knowledge=knowledge_base,
    search_knowledge=True,
)
agent.print_response(
    "Tell me about Jordan Mitchell's experience and skills",
    knowledge_filters={"user_id": "jordan_mitchell"},
    markdown=True,
)
```

<Note>If you pass filters both on the Agent and on the query, the query-level filters take precedence.</Note>

## Combining Multiple Filters

You can filter by multiple fields:

```python  theme={null}
agent = Agent(
    knowledge=knowledge_base,
    search_knowledge=True,
    knowledge_filters={
        "user_id": "jordan_mitchell",
        "document_type": "cv",
        "year": 2025,
    }
)
agent.print_response(
    "Tell me about Jordan Mitchell's experience and skills",
    markdown=True,
)
```

## Try It Yourself!

* Load documents with different metadata.
* Query with different filter combinations.
* Observe how the results change!

***

## Developer Resources

* [Manual filtering](https://github.com/agno-agi/agno/blob/main/cookbook/knowledge/filters/filtering.py)
* [Manual filtering on load](https://github.com/agno-agi/agno/blob/main/cookbook/knowledge/filters/filtering_on_load.py)
