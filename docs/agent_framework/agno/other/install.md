# Install & Setup

> Original Document: [Install & Setup](https://docs.agno.com/how-to/install.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.047Z

---

# Install & Setup

## Install `agno` SDK

We highly recommend:

* Installing `agno` using `pip` in a python virtual environment.

<Steps>
  <Step title="Create a virtual environment">
    <CodeGroup>
      ```bash Mac theme={null}
      python3 -m venv ~/.venvs/agno
      source ~/.venvs/agno/bin/activate
      ```

      ```bash Windows theme={null}
      python3 -m venv agnoenv
      agnoenv/scripts/activate
      ```
    </CodeGroup>
  </Step>

  <Step title="Install agno">
    Install `agno` using pip

    <CodeGroup>
      ```bash Mac theme={null}
      pip install -U agno
      ```

      ```bash Windows theme={null}
      pip install -U agno
      ```
    </CodeGroup>
  </Step>
</Steps>

<br />

<Note>
  If you encounter errors, try updating pip using `python -m pip install --upgrade pip`
</Note>

***

## Upgrade agno

To upgrade `agno`, run this in your virtual environment

```bash  theme={null}
pip install -U agno --no-cache-dir
```
