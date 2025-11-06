# Firestore

> Original Document: [Firestore](https://docs.agno.com/concepts/db/firestore.md)
> Category: database
> Downloaded: 2025-11-06T11:51:13.582Z

---

# Firestore

> Learn to use Firestore as a database for your Agents

Agno supports using [Firestore](https://cloud.google.com/firestore) as a database with the `FirestoreDb` class.

You can get started with Firestore following their [Get Started guide](https://firebase.google.com/docs/firestore/quickstart).

## Usage

You need to provide a `project_id` parameter to the `FirestoreDb` class. Firestore will connect automatically using your Google Cloud credentials.

```python firestore_for_agent.py theme={null}
from agno.agent import Agent
from agno.db.firestore import FirestoreDb

PROJECT_ID = "agno-os-test"  # Use your project ID here

# Setup the Firestore database
db = FirestoreDb(project_id=PROJECT_ID)

# Setup your Agent with the Database
agent = Agent(db=db)
```

## Prerequisites

1. Ensure your gcloud project is enabled with Firestore. Reference [Firestore documentation](https://cloud.google.com/firestore/docs/create-database-server-client-library)
2. Install dependencies: `pip install openai google-cloud-firestore agno`
3. Make sure your gcloud project is set up and you have the necessary permissions to access Firestore

## Params

<Snippet file="db-firestore-params.mdx" />

## Developer Resources

* View [Cookbook](https://github.com/agno-agi/agno/tree/main/cookbook/db/firestore/firestore_for_agent.py)
