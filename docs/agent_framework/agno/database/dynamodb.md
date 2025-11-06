# DynamoDB

> Original Document: [DynamoDB](https://docs.agno.com/concepts/db/dynamodb.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.574Z

---

# DynamoDB

> Learn to use DynamoDB as a database for your Agents

Agno supports using [DynamoDB](https://aws.amazon.com/dynamodb/) as a database with the `DynamoDb` class.

## Usage

To connect to DynamoDB, you will need valid AWS credentials. You can set them as environment variables:

* `AWS_REGION`: The AWS region to connect to.
* `AWS_ACCESS_KEY_ID`: Your AWS access key id.
* `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

```python dynamo_for_agent.py theme={null}
from agno.db.dynamo import DynamoDb

# Setup your Database
db = DynamoDb()

# Setup your Agent with the Database
agent = Agent(db=db)
```

## Params

<Snippet file="db-dynamodb-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/dynamodb/dynamo_for_agent.py)
