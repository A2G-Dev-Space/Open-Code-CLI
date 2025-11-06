# Setup infra for new users

> Original Document: [Setup infra for new users](https://docs.agno.com/templates/infra-management/new-users.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.396Z

---

# Setup infra for new users

Follow these steps to setup an existing infra:

<Steps>
  <Step title="Clone git repository">
    Clone the git repo and `cd` into the infra directory

    <CodeGroup>
      ```bash Mac theme={null}
      git clone https://github.com/[YOUR_GIT_REPO].git

      cd your_infra_directory
      ```

      ```bash Windows theme={null}
      git clone https://github.com/[YOUR_GIT_REPO].git

      cd your_infra_directory
      ```
    </CodeGroup>
  </Step>

  <Step title="Create and activate a virtual environment">
    <CodeGroup>
      ```bash Mac theme={null}
      python3 -m venv aienv
      source aienv/bin/activate
      ```

      ```bash Windows theme={null}
      python3 -m venv aienv
      aienv/scripts/activate
      ```
    </CodeGroup>
  </Step>

  <Step title="Install agno">
    <CodeGroup>
      ```bash Mac theme={null}
      pip install -U agno
      ```

      ```bash Windows theme={null}
      pip install -U agno
      ```
    </CodeGroup>
  </Step>

  <Step title="Copy secrets">
    Copy `infra/example_secrets` to `infra/secrets`

    <CodeGroup>
      ```bash Mac theme={null}
      cp -r infra/example_secrets infra/secrets
      ```

      ```bash Windows theme={null}
      cp -r infra/example_secrets infra/secrets
      ```
    </CodeGroup>
  </Step>

  <Step title="Start infra">
    <Note>
      Install [docker desktop](https://docs.docker.com/desktop/install/mac-install/) if needed.
    </Note>

    <CodeGroup>
      ```bash terminal theme={null}
      ag infra up
      ```

      ```bash full options theme={null}
      ag infra up --env dev --infra docker
      ```

      ```bash shorthand theme={null}
      ag infra up dev:docker
      ```
    </CodeGroup>
  </Step>

  <Step title="Stop infra">
    <CodeGroup>
      ```bash terminal theme={null}
      ag infra down
      ```

      ```bash full options theme={null}
      ag infra down --env dev --infra docker
      ```

      ```bash shorthand theme={null}
      ag infra down dev:docker
      ```
    </CodeGroup>
  </Step>
</Steps>
