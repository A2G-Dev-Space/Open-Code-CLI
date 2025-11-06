# Add Secrets

> Original Document: [Add Secrets](https://docs.agno.com/templates/infra-management/secrets.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.403Z

---

# Add Secrets

Secret management is a critical part of your application security and should be taken seriously.

Local secrets are defined in the `infra/secrets` directory which is excluded from version control (see `.gitignore`). Its contents should be handled with the same security as passwords.

Production secrets are managed by [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).

<Note>
  Incase you're missing the secrets dir, copy `infra/example_secrets`
</Note>

## Development Secrets

Apps running locally can read secrets using a `yaml` file, for example:

```python dev_resources.py theme={null}
dev_fastapi = FastApi(
    ...
    # Read secrets from secrets/dev_app_secrets.yml
    secrets_file=infra_settings.infra_root.joinpath("infra/secrets/dev_app_secrets.yml"),
)
```

## Production Secrets

`AWS Secrets` are used to manage production secrets, which are read by the production apps.

```python prd_resources.py theme={null}
# -*- Secrets for production application
prd_secret = SecretsManager(
    ...
    # Create secret from workspace/secrets/prd_app_secrets.yml
    secret_files=[
        infra_settings.infra_root.joinpath("infra/secrets/prd_app_secrets.yml")
    ],
)

# -*- Secrets for production database
prd_db_secret = SecretsManager(
    ...
    # Create secret from workspace/secrets/prd_db_secrets.yml
    secret_files=[infra_settings.infra_root.joinpath("infra/secrets/prd_db_secrets.yml")],
)
```

Read the secret in production apps using:

<CodeGroup>
  ```python FastApi theme={null}
  prd_fastapi = FastApi(
      ...
      aws_secrets=[prd_secret],
      ...
  )
  ```

  ```python RDS theme={null}
  prd_db = DbInstance(
      ...
      aws_secret=prd_db_secret,
      ...
  )
  ```
</CodeGroup>

Production resources can also read secrets using yaml files but we highly recommend using [AWS Secrets](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).
