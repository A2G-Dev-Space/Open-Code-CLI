# SSH Access

> Original Document: [SSH Access](https://docs.agno.com/templates/infra-management/ssh-access.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.430Z

---

# SSH Access

SSH Access is an important part of the developer workflow.

## Dev SSH Access

SSH into the dev containers using the `docker exec` command

```bash  theme={null}
docker exec -it ai-api zsh
```

## Production SSH Access

Your ECS tasks are already enabled with SSH access. SSH into the production containers using:

```bash  theme={null}
ECS_CLUSTER=ai-app-prd-cluster
TASK_ARN=$(aws ecs list-tasks --cluster ai-app-prd-cluster --query "taskArns[0]" --output text)
CONTAINER_NAME=ai-api-prd

aws ecs execute-command --cluster $ECS_CLUSTER \
    --task $TASK_ARN \
    --container $CONTAINER_NAME \
    --interactive \
    --command "zsh"
```
