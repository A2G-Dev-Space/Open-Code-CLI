# DynamoDB for Agent

> Original Document: [DynamoDB for Agent](https://docs.agno.com/examples/concepts/db/dynamodb/dynamodb_for_agent.md)
> Category: database
> Downloaded: 2025-11-06T11:51:14.544Z

---

# DynamoDB for Agent

Agno supports using DynamoDB as a storage backend for Agents using the `DynamoDb` class.

## Usage

You need to provide `aws_access_key_id` and `aws_secret_access_key` parameters to the `DynamoDb` class.

```python dynamo_for_agent.py theme={null}
from agno.db.dynamo import DynamoDb

# AWS Credentials
AWS_ACCESS_KEY_ID = getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = getenv("AWS_SECRET_ACCESS_KEY")

db = DynamoDb(
    region_name="us-east-1",
    # aws_access_key_id: AWS access key id
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    # aws_secret_access_key: AWS secret access key
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

# Add storage to the Agent
agent = Agent(db=db)
```

## Params

<Snippet file="db-dynamodb-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/blob/main/cookbook/db/dynamodb/dynamo_for_agent.py)
