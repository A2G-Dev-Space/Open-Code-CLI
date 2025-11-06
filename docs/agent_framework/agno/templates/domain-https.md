# Use Custom Domain and HTTPS

> Original Document: [Use Custom Domain and HTTPS](https://docs.agno.com/templates/infra-management/domain-https.md)
> Category: templates
> Downloaded: 2025-11-06T11:51:17.399Z

---

# Use Custom Domain and HTTPS

## Overview

To add a live AgentOS instance to os.agno.com, the endpoint must be HTTPS. Here is how you can add a custom domain and HTTPS to your AWS loadbalancer.

## Use a custom domain

1. Register your domain with [Route 53](https://us-east-1.console.aws.amazon.com/route53/).
2. Point the domain to the loadbalancer DNS.

### Custom domain for your AgentOS App

Create a record in the Route53 console to point `app.[YOUR_DOMAIN]` to the AgentOS endpoint.

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=2387492f4fa89cab98e2a603da83535b" alt="llm-app-aidev-run" data-og-width="1081" width="1081" data-og-height="569" height="569" data-path="images/llm-app-aidev-run.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=1d9004362958e21665a9deb78811a4dd 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=16e4a3f99f355b484c3bfc0ff98ec7c9 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=d2659746f0b009a8e84c7fe1528cac65 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=1b3b6f7c9a098578bcc4cf88f5802588 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=d1e8a2a0a23ce16cbaf50ebe0fce0fba 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-aidev-run.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=4c1c3fbd924321ecfe7aabedc3d9ad1e 2500w" />

You can visit the app at `[http://app.[YOUR_DOMAIN]`

<Note>Note the `http` in the domain name.</Note>

## Add HTTPS

To add HTTPS:

1. Create a certificate using [AWS ACM](https://us-east-1.console.aws.amazon.com/acm). Request a certificat for `*.[YOUR_DOMAIN]`

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=15b580029369ef5c8039bddfad4be52d" alt="llm-app-request-cert" data-og-width="1105" width="1105" data-og-height="581" height="581" data-path="images/llm-app-request-cert.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=05442b5b3ac14b98d42e885488be4ede 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=9ce2e4e86b46e10e984aa1b1ab9939a7 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=85149f2d24287108d22bd604f7014dc3 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=dbb81c8a8e8df3c85eaed02a097a89b1 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=6c804f2e99c3881f52cabd5566b54802 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-request-cert.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=b9534df74f2df9325cdeae0448e25bfd 2500w" />

2. Creating records in Route 53.

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=4291826e3abd20126daf4e1bbd42c0a3" alt="llm-app-validate-cert" data-og-width="1322" width="1322" data-og-height="566" height="566" data-path="images/llm-app-validate-cert.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=c7813e664032c848f1b2c5a51953f8eb 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=b98c005abf74fc4a7b7c75678cf8b0f6 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=b25347bff02d1684a44906d860b51a98 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=f7a1bafd43f582f40f13513ea64daa32 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=179c892f6141685a69e521865a7c4d28 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/llm-app-validate-cert.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=051a273f486a1f576ee0cedd97c24c69 2500w" />

3. Add the certificate ARN to Apps

<Note>Make sure the certificate is `Issued` before adding it to your Apps</Note>

Update the `infra/prd_resources.py` file and add the `load_balancer_certificate_arn` to the `FastAPI` app.

```python infra/prd_resources.py theme={null}

# -*- FastAPI running on ECS
prd_fastapi = FastApi(
    ...
    # To enable HTTPS, create an ACM certificate and add the ARN below:
    load_balancer_enable_https=True,
    load_balancer_certificate_arn="arn:aws:acm:us-east-1:497891874516:certificate/6598c24a-d4fc-4f17-8ee0-0d3906eb705f",
    ...
)
```

4. Create new Loadbalancer Listeners

Create new listeners for the loadbalancer to pickup the HTTPs configuration.

<CodeGroup>
  ```bash terminal theme={null}
  ag infra up --env prd --infra aws --name listener
  ```

  ```bash shorthand theme={null}
  ag infra up -e prd -i aws -n listener
  ```
</CodeGroup>

<Note>The certificate should be `Issued` before applying it.</Note>

After this, `https` should be working on your custom domain.

5. Update existing listeners to redirect HTTP to HTTPS

<CodeGroup>
  ```bash terminal theme={null}
  ag infra patch --env prd --infra aws --name listener
  ```

  ```bash shorthand theme={null}
  ag infra patch -e prd -i aws -n listener
  ```
</CodeGroup>

After this, all HTTP requests should redirect to HTTPS automatically.
