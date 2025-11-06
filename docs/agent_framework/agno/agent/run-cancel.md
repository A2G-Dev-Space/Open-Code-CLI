# Cancelling a Run

> Original Document: [Cancelling a Run](https://docs.agno.com/concepts/agents/run-cancel.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.574Z

---

# Cancelling a Run

> Learn how to cancel an Agent run.

You can cancel a running agent by using the `agent.cancel_run()` function on the agent.

Below is a basic example that starts an agent run in a thread and cancels it from another thread, simulating how it can be done via an API. This is supported via [AgentOS](/agent-os/api#cancelling-a-run) as well.

```python  theme={null}
import threading
import time

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.run.agent import RunEvent
from agno.run.base import RunStatus


def long_running_task(agent: Agent, run_id_container: dict):
    """
    Simulate a long-running agent task that can be cancelled.
    """
    # Start the agent run - this simulates a long task
    final_response = None
    content_pieces = []

    for chunk in agent.run(
        "Write a very long story about a dragon who learns to code. "
        "Make it at least 2000 words with detailed descriptions and dialogue. "
        "Take your time and be very thorough.",
        stream=True,
    ):
        if "run_id" not in run_id_container and chunk.run_id:
            run_id_container["run_id"] = chunk.run_id

        if chunk.event == RunEvent.run_content:
            print(chunk.content, end="", flush=True)
            content_pieces.append(chunk.content)
        # When the run is cancelled, a `RunEvent.run_cancelled` event is emitted
        elif chunk.event == RunEvent.run_cancelled:
            print(f"\n🚫 Run was cancelled: {chunk.run_id}")
            run_id_container["result"] = {
                "status": "cancelled",
                "run_id": chunk.run_id,
                "cancelled": True,
                "content": "".join(content_pieces)[:200] + "..."
                if content_pieces
                else "No content before cancellation",
            }
            return
        elif hasattr(chunk, "status") and chunk.status == RunStatus.completed:
            final_response = chunk

    # If we get here, the run completed successfully
    if final_response:
        run_id_container["result"] = {
            "status": final_response.status.value
            if final_response.status
            else "completed",
            "run_id": final_response.run_id,
            "cancelled": final_response.status == RunStatus.cancelled,
            "content": ("".join(content_pieces)[:200] + "...")
            if content_pieces
            else "No content",
        }
    else:
        run_id_container["result"] = {
            "status": "unknown",
            "run_id": run_id_container.get("run_id"),
            "cancelled": False,
            "content": ("".join(content_pieces)[:200] + "...")
            if content_pieces
            else "No content",
        }



def cancel_after_delay(agent: Agent, run_id_container: dict, delay_seconds: int = 3):
    """
    Cancel the agent run after a specified delay.
    """
    print(f"⏰ Will cancel run in {delay_seconds} seconds...")
    time.sleep(delay_seconds)

    run_id = run_id_container.get("run_id")
    if run_id:
        print(f"🚫 Cancelling run: {run_id}")
        success = agent.cancel_run(run_id)
        if success:
            print(f"✅ Run {run_id} marked for cancellation")
        else:
            print(
                f"❌ Failed to cancel run {run_id} (may not exist or already completed)"
            )
    else:
        print("⚠️  No run_id found to cancel")


def main():
    # Initialize the agent with a model
    agent = Agent(
        name="StorytellerAgent",
        model=OpenAIChat(id="gpt-5-mini"),  # Use a model that can generate long responses
        description="An agent that writes detailed stories",
    )

    print("🚀 Starting agent run cancellation example...")
    print("=" * 50)

    # Container to share run_id between threads
    run_id_container = {}

    # Start the agent run in a separate thread
    agent_thread = threading.Thread(
        target=lambda: long_running_task(agent, run_id_container), name="AgentRunThread"
    )

    # Start the cancellation thread
    cancel_thread = threading.Thread(
        target=cancel_after_delay,
        args=(agent, run_id_container, 8),  # Cancel after 5 seconds
        name="CancelThread",
    )

    # Start both threads
    print("🏃 Starting agent run thread...")
    agent_thread.start()

    print("🏃 Starting cancellation thread...")
    cancel_thread.start()

    # Wait for both threads to complete
    print("⌛ Waiting for threads to complete...")
    agent_thread.join()
    cancel_thread.join()

    # Print the results
    print("\n" + "=" * 50)
    print("📊 RESULTS:")
    print("=" * 50)

    result = run_id_container.get("result")
    if result:
        print(f"Status: {result['status']}")
        print(f"Run ID: {result['run_id']}")
        print(f"Was Cancelled: {result['cancelled']}")

        if result.get("error"):
            print(f"Error: {result['error']}")
        else:
            print(f"Content Preview: {result['content']}")

        if result["cancelled"]:
            print("\n✅ SUCCESS: Run was successfully cancelled!")
        else:
            print("\n⚠️  WARNING: Run completed before cancellation")
    else:
        print("❌ No result obtained - check if cancellation happened during streaming")

    print("\n🏁 Example completed!")


if __name__ == "__main__":
    # Run the main example
    main()
```

For a more complete example, see [Cancel a run](https://github.com/agno-agi/agno/tree/main/cookbook/agents/other/cancel_a_run.py).
