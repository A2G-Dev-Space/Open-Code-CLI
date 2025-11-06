# Tokens-per-minute rate limiting

> Original Document: [Tokens-per-minute rate limiting](https://docs.agno.com/faq/tpm-issues.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.156Z

---

# Tokens-per-minute rate limiting

<img src="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=6c4a68b6662597c61b761f782dbe5f65" alt="Chat with pdf" data-og-width="698" width="698" data-og-height="179" height="179" data-path="images/tpm_issues.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=280&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=9d57cc77b1620f3ebc6ed5ac2348cd53 280w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=560&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=62e01716372bec142658c779175b6d1e 560w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=840&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=0840a597cda52c0c883f722e8f0cf13c 840w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=1100&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=a3f1e2f454802a9143f82e893eb45af0 1100w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=1650&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=f5556252c255a94e36218a003e929a40 1650w, https://mintcdn.com/agno-v2/yeT29TzCG5roT0hQ/images/tpm_issues.png?w=2500&fit=max&auto=format&n=yeT29TzCG5roT0hQ&q=85&s=ac5204f428d2ee70c268d6ec9e68b44b 2500w" />

If you face any problems with proprietary models (like OpenAI models) where you are rate limited, we provide the option to set `exponential_backoff=True` and to change `delay_between_retries` to a value in seconds (defaults to 1 second).

For example:

```python  theme={null}
from agno.agent import Agent
from agno.models.openai import OpenAIChat

agent = Agent(
    model=OpenAIChat(id="gpt-5-mini"),
    description="You are an enthusiastic news reporter with a flair for storytelling!",
    markdown=True,
    exponential_backoff=True,
    delay_between_retries=2
)
agent.print_response("Tell me about a breaking news story from New York.", stream=True)
```

See our [models documentation](/concepts/models) for specific information about rate limiting.

In the case of OpenAI, they have tier based rate limits. See the [docs](https://platform.openai.com/docs/guides/rate-limits/usage-tiers) for more information.
