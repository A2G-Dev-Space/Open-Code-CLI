# Development Application

> Original Document: [Development Application](https://docs.agno.com/templates/infra-management/development-app.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.382Z

---

# Development Application

Your development application runs locally on docker and its resources are defined in the `infra/dev_resources.py` file. This guide shows how to:

1. [Build a development image](#build-your-development-image)
2. [Restart all docker containers](#restart-all-containers)
3. [Recreate development resources](#recreate-development-resources)

## Infra Settings

The `InfraSettings` object in the `infra/settings.py` file defines common settings used by your Agno Infra apps and resources.

## Build your development image

Your application uses the `agno` docker images by default. To use your own image:

* Open `infra/settings.py` file
* Update the `image_repo` to your image repository
* Set `build_images=True`

```python infra/settings.py theme={null}
infra_settings = InfraSettings(
    ...
    # -*- Image Settings
    # Repository for images
    image_repo="local",
    # Build images locally
    build_images=True,
)
```

### Build a new image

Build the development image using:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up --env dev --infra docker --type image
  ```

  ```bash short options theme={null}
  ag infra up -e dev -i docker -t image
  ```
</CodeGroup>

To `force` rebuild images, use the `--force` or `-f` flag

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up --env dev --infra docker --type image --force
  ```

  ```bash short options theme={null}
  ag infra up -e dev -i docker -t image -f
  ```
</CodeGroup>

***

## Restart all containers

Restart all docker containers using:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra restart --env dev --infra docker --type container
  ```

  ```bash short options theme={null}
  ag infra restart -e dev -c docker -t container
  ```
</CodeGroup>

***

## Recreate development resources

To recreate all dev resources, use the `--force` flag:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up -f
  ```

  ```bash full options theme={null}
  ag infra up --env dev --infra docker --force
  ```

  ```bash shorthand theme={null}
  ag infra up dev:docker -f
  ```

  ```bash short options theme={null}
  ag infra up -e dev -i docker -f
  ```
</CodeGroup>
