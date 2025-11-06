# Youtube Agent

> Original Document: [Youtube Agent](https://docs.agno.com/examples/use-cases/agents/youtube-agent.md)
> Category: other
> Downloaded: 2025-11-06T11:51:16.976Z

---

# Youtube Agent

This example shows how to create an intelligent YouTube content analyzer that provides
detailed video breakdowns, timestamps, and summaries. Perfect for content creators,
researchers, and viewers who want to efficiently navigate video content.

Example prompts to try:

* "Analyze this tech review: \[video\_url]"
* "Get timestamps for this coding tutorial: \[video\_url]"
* "Break down the key points of this lecture: \[video\_url]"
* "Summarize the main topics in this documentary: \[video\_url]"
* "Create a study guide from this educational video: \[video\_url]"

## Code

```python youtube_agent.py theme={null}
from textwrap import dedent

from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.youtube import YouTubeTools

youtube_agent = Agent(
    name="YouTube Agent",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[YouTubeTools()],
        instructions=dedent("""\
        You are an expert YouTube content analyst with a keen eye for detail! 🎓
        Follow these steps for comprehensive video analysis:
        1. Video Overview
           - Check video length and basic metadata
           - Identify video type (tutorial, review, lecture, etc.)
           - Note the content structure
        2. Timestamp Creation
           - Create precise, meaningful timestamps
           - Focus on major topic transitions
           - Highlight key moments and demonstrations
           - Format: [start_time, end_time, detailed_summary]
        3. Content Organization
           - Group related segments
           - Identify main themes
           - Track topic progression

        Your analysis style:
        - Begin with a video overview
        - Use clear, descriptive segment titles
        - Include relevant emojis for content types:
          📚 Educational
          💻 Technical
          🎮 Gaming
          📱 Tech Review
          🎨 Creative
        - Highlight key learning points
        - Note practical demonstrations
        - Mark important references

        Quality Guidelines:
        - Verify timestamp accuracy
        - Avoid timestamp hallucination
        - Ensure comprehensive coverage
        - Maintain consistent detail level
        - Focus on valuable content markers
    """),
    add_datetime_to_context=True,
    markdown=True,
)

# Example usage with different types of videos
youtube_agent.print_response(
    "Analyze this video: https://www.youtube.com/watch?v=zjkBMFhNj_g",
    stream=True,
)

# More example prompts to explore:
"""
Tutorial Analysis:
1. "Break down this Python tutorial with focus on code examples"
2. "Create a learning path from this web development course"
3. "Extract all practical exercises from this programming guide"
4. "Identify key concepts and implementation examples"

Educational Content:
1. "Create a study guide with timestamps for this math lecture"
2. "Extract main theories and examples from this science video"
3. "Break down this historical documentary into key events"
4. "Summarize the main arguments in this academic presentation"

Tech Reviews:
1. "List all product features mentioned with timestamps"
2. "Compare pros and cons discussed in this review"
3. "Extract technical specifications and benchmarks"
4. "Identify key comparison points and conclusions"

Creative Content:
1. "Break down the techniques shown in this art tutorial"
2. "Create a timeline of project steps in this DIY video"
3. "List all tools and materials mentioned with timestamps"
4. "Extract tips and tricks with their demonstrations"
"""
```

## Usage

<Steps>
  <Snippet file="create-venv-step.mdx" />

  <Step title="Install libraries">
    ```bash  theme={null}
    pip install openai youtube_transcript_api agno
    ```
  </Step>

  <Step title="Set environment variables">
    ```bash  theme={null}
    export OPENAI_API_KEY=xxx
    ```
  </Step>

  <Step title="Run the agent">
    ```bash  theme={null}
    python youtube_agent.py
    ```
  </Step>
</Steps>
