# Custom Functions in Workflows

> Original Document: [Custom Functions in Workflows](https://docs.agno.com/concepts/workflows/workflow-patterns/custom-function-step-workflow.md)
> Category: workflows
> Downloaded: 2025-11-06T11:51:14.203Z

---

# Custom Functions in Workflows

> How to use custom functions in workflows

Custom functions provide maximum flexibility by allowing you to define specific logic for step execution. Use them to preprocess inputs, orchestrate agents and teams, and postprocess outputs with complete programmatic control.

**Key Capabilities**

* **Custom Logic**: Implement complex business rules and data transformations
* **Agent Integration**: Call agents and teams within your custom processing logic
* **Data Flow Control**: Transform outputs between steps for optimal data handling

**Implementation Pattern**
Define a `Step` with a custom function as the `executor`. The function must accept a `StepInput` object and return a `StepOutput` object, ensuring seamless integration with the workflow system.

<img className="block dark:hidden" src="https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=d9c94fbc2094b100df2fde1e4767f358" alt="Custom function step workflow diagram" data-og-width="2001" width="2001" data-og-height="756" height="756" data-path="images/custom-function-steps-light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=280&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=cc6fdbdbcd274ffd8eeaf936653e9487 280w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=560&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=7135a981cbf2afbbfc9e8a772843ca90 560w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=840&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=084fd07440b87980f0899dea2b0b5ba1 840w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=1100&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=9d57ad4d5f051dc65185bf29ad759118 1100w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=1650&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=b1ba9db7305207a7867efa4ef47912dc 1650w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-light.png?w=2500&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=a4e94cf04d1a1bb212f971ce60cefe5b 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=537393db1d76a7d4c38d43e40c622300" alt="Custom function step workflow diagram" data-og-width="2001" width="2001" data-og-height="756" height="756" data-path="images/custom-function-steps-dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=280&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=40450040ca47de4fa286b95de2e285ed 280w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=560&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=ef0a1060f07688a21b866766dc10526b 560w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=840&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=9c5572c23d25046db363ecaeeb65e3d6 840w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=1100&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=991e880aee26c31a9484d8603e0be424 1100w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=1650&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=0a8c70a163f2ba4a5cd5dfdc487ff14d 1650w, https://mintcdn.com/agno-v2/jBP_3mGLN1rT3Ezh/images/custom-function-steps-dark.png?w=2500&fit=max&auto=format&n=jBP_3mGLN1rT3Ezh&q=85&s=aec1041004efd198455fcb6a740f008d 2500w" />

## Example

```python  theme={null}
content_planning_step = Step(
    name="Content Planning Step",
    executor=custom_content_planning_function,
)

def custom_content_planning_function(step_input: StepInput) -> StepOutput:
    """
    Custom function that does intelligent content planning with context awareness
    """
    message = step_input.input
    previous_step_content = step_input.previous_step_content

    # Create intelligent planning prompt
    planning_prompt = f"""
        STRATEGIC CONTENT PLANNING REQUEST:

        Core Topic: {message}

        Research Results: {previous_step_content[:500] if previous_step_content else "No research results"}

        Planning Requirements:
        1. Create a comprehensive content strategy based on the research
        2. Leverage the research findings effectively
        3. Identify content formats and channels
        4. Provide timeline and priority recommendations
        5. Include engagement and distribution strategies

        Please create a detailed, actionable content plan.
    """

    try:
        response = content_planner.run(planning_prompt)

        enhanced_content = f"""
            ## Strategic Content Plan

            **Planning Topic:** {message}

            **Research Integration:** {"✓ Research-based" if previous_step_content else "✗ No research foundation"}

            **Content Strategy:**
            {response.content}

            **Custom Planning Enhancements:**
            - Research Integration: {"High" if previous_step_content else "Baseline"}
            - Strategic Alignment: Optimized for multi-channel distribution
            - Execution Ready: Detailed action items included
        """.strip()

        return StepOutput(content=enhanced_content)

    except Exception as e:
        return StepOutput(
            content=f"Custom content planning failed: {str(e)}",
            success=False,
        )
```

**Standard Pattern**
All custom functions follow this consistent structure:

```python  theme={null}
def custom_content_planning_function(step_input: StepInput) -> StepOutput:
    # 1. Custom preprocessing
    # 2. Call agents/teams as needed
    # 3. Custom postprocessing
    return StepOutput(content=enhanced_content)
```

## Class-based executor

You can also use a class-based executor by defining a class that implements the `__call__` method.

```python  theme={null}
class CustomExecutor:
    def __call__(self, step_input: StepInput) -> StepOutput:
        # 1. Custom preprocessing
        # 2. Call agents/teams as needed
        # 3. Custom postprocessing
        return StepOutput(content=enhanced_content)

content_planning_step = Step(
    name="Content Planning Step",
    executor=CustomExecutor(),
)
```

**When is this useful?:**

* **Configuration at initialization**: Pass in settings, API keys, or behavior flags when creating the executor
* **Stateful execution**: Maintain counters, caches, or track information across multiple workflow runs
* **Reusable components**: Create configured executor instances that can be shared across multiple workflows

```python  theme={null}
class CustomExecutor:
    def __init__(self, max_retries: int = 3, use_cache: bool = True):
        # Configuration passed during instantiation
        self.max_retries = max_retries
        self.use_cache = use_cache
        self.call_count = 0  # Stateful tracking

    def __call__(self, step_input: StepInput) -> StepOutput:
        self.call_count += 1

        # Access instance configuration and state
        if self.use_cache and self.call_count > 1:
            return StepOutput(content="Using cached result")

        # Your custom logic with access to self.max_retries, etc.
        return StepOutput(content=enhanced_content)

# Instantiate with specific configuration
content_planning_step = Step(
    name="Content Planning Step",
    executor=CustomExecutor(max_retries=5, use_cache=False),
)
```

Also supports async execution by defining the `__call__` method to be an async function.

```python  theme={null}
class CustomExecutor:
    async def __call__(self, step_input: StepInput) -> StepOutput:
        # 1. Custom preprocessing
        # 2. Call agents/teams as needed
        # 3. Custom postprocessing
        return StepOutput(content=enhanced_content)

content_planning_step = Step(
    name="Content Planning Step",
    executor=CustomExecutor(),
)
```

For a detailed example see [Class-based Executor](/examples/concepts/workflows/01-basic-workflows/class_based_executor).

## Streaming execution with custom function step on AgentOS:

If you are running an agent or team within the custom function step, you can enable streaming on the [AgentOS chat page](/agent-os/introduction#chat-page) by setting `stream=True` and `stream_events=True` when calling `run()` or `arun()` and yielding the events.

<Note>
  Using the AgentOS, runs will be asynchronous and responses will be streamed.
  This means you must keep the custom function step asynchronous, by using `.arun()` instead of `.run()` to run your Agents or Teams.
</Note>

```python custom_function_step_async_stream.py theme={null}
content_planner = Agent(
    name="Content Planner",
    model=OpenAIChat(id="gpt-4o"),
    instructions=[
        "Plan a content schedule over 4 weeks for the provided topic and research content",
        "Ensure that I have posts for 3 posts per week",
    ],
    db=InMemoryDb(),
)

async def custom_content_planning_function(
    step_input: StepInput,
) -> AsyncIterator[Union[WorkflowRunOutputEvent, StepOutput]]:
    """
    Custom function that does intelligent content planning with context awareness.

    Note: This function calls content_planner.arun() internally, and all events
    from that agent call will automatically get workflow context injected by
    the workflow execution system - no manual intervention required!
    """
    message = step_input.input
    previous_step_content = step_input.previous_step_content

    # Create intelligent planning prompt
    planning_prompt = f"""
        STRATEGIC CONTENT PLANNING REQUEST:

        Core Topic: {message}

        Research Results: {previous_step_content[:500] if previous_step_content else "No research results"}

        Planning Requirements:
        1. Create a comprehensive content strategy based on the research
        2. Leverage the research findings effectively
        3. Identify content formats and channels
        4. Provide timeline and priority recommendations
        5. Include engagement and distribution strategies

        Please create a detailed, actionable content plan.
    """

    try:
        response_iterator = content_planner.arun(
            planning_prompt, stream=True, stream_events=True
        )
        async for event in response_iterator:
            yield event

        response = content_planner.get_last_run_output()

        enhanced_content = f"""
            ## Strategic Content Plan

            **Planning Topic:** {message}

            **Research Integration:** {"✓ Research-based" if previous_step_content else "✗ No research foundation"}

            **Content Strategy:**
            {response.content}

            **Custom Planning Enhancements:**
            - Research Integration: {"High" if previous_step_content else "Baseline"}
            - Strategic Alignment: Optimized for multi-channel distribution
            - Execution Ready: Detailed action items included
        """.strip()

        yield StepOutput(content=enhanced_content)

    except Exception as e:
        yield StepOutput(
            content=f"Custom content planning failed: {str(e)}",
            success=False,
        )
```

<Note>
  Streaming in case of a class-based executor also works the same way by defining the `__call__` method to yield the events.
</Note>

## Developer Resources

* [Step with a Custom Function](/examples/concepts/workflows/01-basic-workflows/step_with_function)
* [Step with a Custom Function with Streaming on AgentOS](/examples/concepts/workflows/01-basic-workflows/step_with_function_streaming_agentos)
* [Parallel and custom function step streaming on AgentOS](/examples/concepts/workflows/04-workflows-parallel-execution/parallel_and_custom_function_step_streaming_agentos)
