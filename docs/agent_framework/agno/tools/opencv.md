# OpenCV

> Original Document: [OpenCV](https://docs.agno.com/concepts/tools/toolkits/others/opencv.md)
> Category: tools
> Downloaded: 2025-11-06T11:51:14.043Z

---

# OpenCV

> OpenCVTools enables agents to capture images and videos from webcam using OpenCV computer vision library.

## Example

The following agent can capture images and videos from your webcam:

```python  theme={null}
from agno.agent import Agent
from agno.tools.opencv import OpenCVTools

agent = Agent(
    instructions=[
        "You are a computer vision assistant that can capture images and videos",
        "Use the webcam to take photos or record videos as requested",
        "Provide clear feedback about capture operations",
        "Help with basic computer vision tasks",
    ],
    tools=[OpenCVTools()],
)

agent.print_response("Take a photo using the webcam", stream=True)
```

## Toolkit Params

| Parameter              | Type   | Default | Description                                           |
| ---------------------- | ------ | ------- | ----------------------------------------------------- |
| `show_preview`         | `bool` | `False` | Whether to show camera preview window during capture. |
| `enable_capture_image` | `bool` | `True`  | Enable image capture functionality.                   |
| `enable_capture_video` | `bool` | `True`  | Enable video capture functionality.                   |

## Toolkit Functions

| Function        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `capture_image` | Capture a single image from the webcam.                  |
| `capture_video` | Record a video from the webcam for a specified duration. |

## Developer Resources

* View [Tools Source](https://github.com/agno-agi/agno/blob/main/libs/agno/agno/tools/opencv.py)
* [OpenCV Documentation](https://docs.opencv.org/)
