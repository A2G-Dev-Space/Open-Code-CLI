# BaseGuardrail

> Original Document: [BaseGuardrail](https://docs.agno.com/reference/hooks/base-guardrail.md)
> Category: other
> Downloaded: 2025-11-06T11:51:17.230Z

---

# BaseGuardrail

## Methods

### `check`

Perform the guardrail checks synchronously.

**Parameters:**

* `run_input` (RunInput | TeamRunInput): The input provided to the Agent or Team when invoking the run.

**Returns:** `None`

### `async_check`

Perform the guardrail checks asynchronously.

**Parameters:**

* `run_input` (RunInput | TeamRunInput): The input provided to the Agent or Team when invoking the run.

**Returns:** `None`
