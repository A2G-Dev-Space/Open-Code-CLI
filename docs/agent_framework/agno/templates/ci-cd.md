# CI/CD

> Original Document: [CI/CD](https://docs.agno.com/templates/infra-management/ci-cd.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.389Z

---

# CI/CD

Agno templates come pre-configured with [Github Actions](https://docs.github.com/en/actions) for CI/CD. We can

1. [Test and Validate on every PR](#test-and-validate-on-every-pr)
2. [Build Docker Images with Github Releases](#build-docker-images-with-github-releases)
3. [Build ECR Images with Github Releases](#build-ecr-images-with-github-releases)

## Test and Validate on every PR

Whenever a PR is opened against the `main` branch, a validate script runs that ensures

1. The changes are formatted using ruff
2. All unit-tests pass
3. The changes don't have any typing or linting errors.

Checkout the `.github/workflows/validate.yml` file for more information.

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=01d9c697e3f87a8248fa8daa6fac3922" alt="validate-cicd" data-og-width="940" width="940" data-og-height="353" height="353" data-path="images/validate-cicd.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=e8bf732e3895a4377b65766816624fc5 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=5dd89160c72ebf2f088d75bd8dfe52dc 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=8a27817ed129343cad278184145eb5ee 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=eb51747558d308ee09444057ba4f7f85 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=57ed9ba5331f3170a62cdfe304d9c05d 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/validate-cicd.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=6b995305ffe38e39b14bbe7ef18ce4ba 2500w" />

## Build Docker Images with Github Releases

If you're using [Dockerhub](https://hub.docker.com/) for images, you can buld and push the images throug a Github Release. This action is defined in the `.github/workflows/docker-images.yml` file.

1. Create a [Docker Access Token](https://hub.docker.com/settings/security) for Github Actions

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=870118e1906c093108643eceaaf577e6" alt="docker-access-token" data-og-width="742" width="742" data-og-height="568" height="568" data-path="images/docker-access-token.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=44ecd6f45c24f63b65c47d63d5dda04e 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7010dc82d6907e7a0e4c9b727a5b1f14 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=f35b57f4d86867cd143d00861e9a188d 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ae91c75b8692c79f3f67b7c949a87305 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ce6d88dc5073bcbb6ec943c2ff9f1750 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/docker-access-token.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c730143dfa3232d2daffbe8f04b77eb1 2500w" />

2. Create secret variables `DOCKERHUB_REPO`, `DOCKERHUB_TOKEN` and `DOCKERHUB_USERNAME` in your github repo. These variables are used by the action in `.github/workflows/docker-images.yml`

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=70015ffb61a3816c45806f85c8c44877" alt="github-actions-docker-secrets" data-og-width="1143" width="1143" data-og-height="822" height="822" data-path="images/github-actions-docker-secrets.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=98a34ba0df0ee5fa4ad3ed51852978d1 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=025950971a2df62fd409c74a6bf265df 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=fdb266b2ef9b01200bbf0704a607af87 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=3a78c11b5d5fe0e1294bdea54fd03004 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e37288626fd82e5fa083c0bc48cf00c9 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-docker-secrets.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=f854830e5040e368d1154389162e173e 2500w" />

3. Run workflow using a Github Release

This workflow is configured to run when a release is created. Create a new release using:

<Note>
  Confirm the image name in the `.github/workflows/docker-images.yml` file before running
</Note>

<CodeGroup>
  ```bash Mac theme={null}
  gh release create v0.1.0 --title "v0.1.0" -n ""
  ```

  ```bash Windows theme={null}
  gh release create v0.1.0 --title "v0.1.0" -n ""
  ```
</CodeGroup>

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2f96812f7b12f8e1f9d831152556c5d7" alt="github-actions-build-docker" data-og-width="1042" width="1042" data-og-height="732" height="732" data-path="images/github-actions-build-docker.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ec6400a97ff55a3a44da52d9e53473ca 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=6568fab440d3f4794aecce651f2a3a0e 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c88fbcfbeb5e647b45e56d064c8066b6 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c7d8bc7f1d25a8167dcbe7920bfca3e6 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ab0a319474f8e5380c2dc9740715b916 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-docker.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=0a29ea2ec1f152a8142a2988768316da 2500w" />

<Note>
  You can also run the workflow using `gh workflow run`
</Note>

## Build ECR Images with Github Releases

If you're using ECR for images, you can buld and push the images through a Github Release. This action is defined in the `.github/workflows/ecr-images.yml` file and uses the new OpenID Connect (OIDC) approach to request the access token, without using IAM access keys.

We will follow this [guide](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/) to create an IAM role which will be used by the github action.

1. Open the IAM console.
2. In the left navigation menu, choose Identity providers.
3. In the Identity providers pane, choose Add provider.
4. For Provider type, choose OpenID Connect.
5. For Provider URL, enter the URL of the GitHub OIDC IdP: [https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com)
6. Get thumbprint to verify the server certificate
7. For Audience, enter sts.amazonaws.com.

Verify the information matches the screenshot below and Add provider

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=3eda54501351859a9afc8a041dc82139" alt="github-oidc-provider" data-og-width="1125" width="1125" data-og-height="799" height="799" data-path="images/github-oidc-provider.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=4c8f4ac0f7afae5f6c02d105fb827306 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2e714e3b3ef8993d0d0db50b9975eb12 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=96bbb52cb5fd2bd262fcb1d2eb2caf66 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=69a06894592bebeefa2170cdf776f424 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7cf6268657b4073faa5671f6710dcbff 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ff74cc7bd14c9412ff7f9ef72d069e15 2500w" />

8. Assign a Role to the provider.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=dbd84c74dc15c2dd74311e69afd6a6cd" alt="github-oidc-provider-assign-role" data-og-width="1347" width="1347" data-og-height="587" height="587" data-path="images/github-oidc-provider-assign-role.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=fc0720d26b0176b03192881e0d00d4c7 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=305275efad18dd80e182f7442bfcb292 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=0dc5facedf7d84a8e35ad5faa29409e7 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7723cea354fe2bc26fed0bccdf406853 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=9038f7189b3752d863fdb6772d34ceae 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-assign-role.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e0e20507f59fa7b57970bdd1b187072e 2500w" />

9. Create a new role.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e7b3d4a069f97ba3dbfe8bc08e8a534f" alt="github-oidc-provider-create-new-role" data-og-width="604" width="604" data-og-height="278" height="278" data-path="images/github-oidc-provider-create-new-role.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=0b0bbe7da72790aeaa23eca25e846e12 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7536bf15de67ff8826aaaaa336d3b2ff 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=65907ad9152fa24dcd1fe791d6a1980d 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7396e3e8f50462a000d5cd3131cf7e94 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=cd64cc43cbf45bf06a66f40db3976251 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-create-new-role.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c8037ba2ea7bfc3e8f03dcb19ed66c9f 2500w" />

10. Confirm that Web identity is already selected as the trusted entity and the Identity provider field is populated with the IdP. In the Audience list, select sts.amazonaws.com, and then select Next.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=3fe69db526ec7276382189d8d063561f" alt="github-oidc-provider-trusted-entity" data-og-width="1300" width="1300" data-og-height="934" height="934" data-path="images/github-oidc-provider-trusted-entity.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=1eb0d8ae46efdbb4f0ce072de01a4287 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=a54123b0b191d9587345115f28a5c2e2 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=74e9c6b7764f1ee331fc692808e898d0 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=a8d61a562ca252b89940f25c67e94c4c 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c2904811b03b257358ba3578dc0a4c8e 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-provider-trusted-entity.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=cd5780393d9adde78a009499ef3ba6bf 2500w" />

11. Add the `AmazonEC2ContainerRegistryPowerUser` permission to this role.

12. Create the role with the name `GithubActionsRole`.

13. Find the role `GithubActionsRole` and copy the ARN.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=ff1efeba61931aa435c13062d91a8f0b" alt="github-oidc-role" data-og-width="1389" width="1389" data-og-height="710" height="710" data-path="images/github-oidc-role.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=1c1afadf6e661558e3cc861e2353a38d 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2231af7fff49341e8393eb7b49b610b1 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=43d85fdcd8f72dbe0ed7948a95793d38 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=f05dc967abe03969118e755451c43a4a 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=b5e1b433d11d461a5fc24c8b14e6bc91 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-oidc-role.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=8b7072639f56d42f00d00b8b735cb375 2500w" />

14. Create the ECR Repositories: `llm` and `jupyter-llm` which are built by the workflow.

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c68ceb3a9b6784fd519cc04b0e38caf1" alt="create-ecr-image" data-og-width="1389" width="1389" data-og-height="408" height="408" data-path="images/create-ecr-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2ce02d48da7e53a6c335736a17ebec6e 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=f0b4d1687849a637c0a595c4a8d0690a 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=26b1f13eb8b6f9b09a06b9e6bb1eeb27 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=e53f084201341a7c92738fa62efdb64c 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=c9e2477e1befaf12f81d4d345dac5a26 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/create-ecr-image.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=a22af7830053ba9139cfb6d0d4017d4a 2500w" />

15. Update the workflow with the `GithubActionsRole` ARN and ECR Repository.

```yaml .github/workflows/ecr-images.yml theme={null}
name: Build ECR Images

on:
  release:
    types: [published]

permissions:
  # For AWS OIDC Token access as per https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#updating-your-github-actions-workflow
  id-token: write # This is required for requesting the JWT
  contents: read # This is required for actions/checkout

env:
  ECR_REPO: [YOUR_ECR_REPO]
  # Create role using https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/
  AWS_ROLE: [GITHUB_ACTIONS_ROLE_ARN]
  AWS_REGION: us-east-1
```

16. Update the `docker-images` workflow to **NOT** run on a release

```yaml .github/workflows/docker-images.yml theme={null}
name: Build Docker Images

on: workflow_dispatch
```

17. Run workflow using a Github Release

<CodeGroup>
  ```bash Mac theme={null}
  gh release create v0.2.0 --title "v0.2.0" -n ""
  ```

  ```bash Windows theme={null}
  gh release create v0.2.0 --title "v0.2.0" -n ""
  ```
</CodeGroup>

<img src="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=aff1bdde8baea8591770b0f6b5ac036b" alt="github-actions-build-ecr" data-og-width="1389" width="1389" data-og-height="710" height="710" data-path="images/github-actions-build-ecr.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=280&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=7440b9e93662a242501bdf7eb37f0620 280w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=560&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=a62d3057b07926a447999d1b75a092dd 560w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=840&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=494393ce11efce791ab0d62f19b1b1fb 840w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=1100&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=2a85f548629bf8dc605f9964f99329fc 1100w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=1650&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=27878c2ccf71bb63426dc120b9233cd3 1650w, https://mintcdn.com/agno-v2/Y7twezR0wF2re1xh/images/github-actions-build-ecr.png?w=2500&fit=max&auto=format&n=Y7twezR0wF2re1xh&q=85&s=9116b3c2eb2bf07b4e8f4c5070e3c1fa 2500w" />

<Note>
  You can also run the workflow using `gh workflow run`
</Note>
