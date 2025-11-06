# Production Application

> Original Document: [Production Application](https://docs.agno.com/templates/infra-management/production-app.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.407Z

---

# Production Application

Your production application runs on AWS and its resources are defined in the `infra/prd_resources.py` file. This guide shows how to:

1. [Build a production image](#build-your-production-image)
2. [Update ECS Task Definitions](#ecs-task-definition)
3. [Update ECS Services](#ecs-service)

## Workspace Settings

The `InfraSettings` object in the `infra/settings.py` file defines common settings used by your workspace apps and resources.

## Build your production image

Your application uses the `agno` images by default. To use your own image:

* Create a Repository in `ECR` and authenticate or use `Dockerhub`.
* Open `infra/settings.py` file
* Update the `image_repo` to your image repository
* Set `build_images=True` and `push_images=True`
* Optional - Set `build_images=False` and `push_images=False` to use an existing image in the repository

### Create an ECR Repository

To use ECR, **create the image repo and authenticate with ECR** before pushing images.

**1. Create the image repository in ECR**

The repo name should match the `infra_name`. Meaning if you're using the default infra name, the repo name would be `ai`.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c68ceb3a9b6784fd519cc04b0e38caf1" alt="create-ecr-image" data-og-width="1389" width="1389" data-og-height="408" height="408" data-path="images/create-ecr-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2ce02d48da7e53a6c335736a17ebec6e 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=f0b4d1687849a637c0a595c4a8d0690a 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=26b1f13eb8b6f9b09a06b9e6bb1eeb27 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e53f084201341a7c92738fa62efdb64c 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c9e2477e1befaf12f81d4d345dac5a26 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=a22af7830053ba9139cfb6d0d4017d4a 2500w" />

**2. Authenticate with ECR**

```bash Authenticate with ECR theme={null}
aws ecr get-login-password --region [region] | docker login --username AWS --password-stdin [account].dkr.ecr.[region].amazonaws.com
```

You can also use a helper script to avoid running the full command

<Note>
  Update the script with your ECR repo before running.
</Note>

<CodeGroup>
  ```bash Mac theme={null}
  ./scripts/auth_ecr.sh
  ```
</CodeGroup>

### Update the `InfraSettings`

```python infra/settings.py theme={null}
infra_settings = InfraSettings(
    ...
    # Subnet IDs in the aws_region
    subnet_ids=["subnet-xyz", "subnet-xyz"],
    # -*- Image Settings
    # Repository for images
    image_repo="your-image-repo",
    # Build images locally
    build_images=True,
    # Push images after building
    push_images=True,
)
```

<Note>
  The `image_repo` defines the repo for your image.

  * If using dockerhub it would be something like `agno`.
  * If using ECR it would be something like `[ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com`
</Note>

### Build a new image

Build the production image using:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up --env prd --infra docker --type image
  ```

  ```bash shorthand theme={null}
  ag infra up -e prd -i docker -t image
  ```
</CodeGroup>

To `force` rebuild images, use the `--force` or `-f` flag

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up --env prd --infra docker --type image --force
  ```

  ```bash shorthand theme={null}
  ag infra up -e prd -i docker -t image -f
  ```
</CodeGroup>

Because the only docker resources in the production env are docker images, you can also use:

<CodeGroup>
  ```bash Build Images theme={null}
  ag infra up prd:docker
  ```

  ```bash Force Build Images theme={null}
  ag infra up prd:docker -f
  ```
</CodeGroup>

## ECS Task Definition

If you updated the Image, CPU, Memory or Environment Variables, update the Task Definition using:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra patch --env prd --infra aws --name td
  ```

  ```bash shorthand theme={null}
  ag infra patch -e prd -i aws -n td
  ```
</CodeGroup>

## ECS Service

To redeploy the production application, update the ECS Service using:

<CodeGroup>
  ```bash terminal theme={null}
  ag infra patch --env prd --infra aws --name service
  ```

  ```bash shorthand theme={null}
  ag infra patch -e prd -i aws -n service
  ```
</CodeGroup>

<br />

<Note>
  If you **ONLY** rebuilt the image, you do not need to update the task definition and can just patch the service to pickup the new image.
</Note>
