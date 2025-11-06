# Control Plane

> Original Document: [Control Plane](https://docs.agno.com/agent-os/control-plane.md)
> Category: agent
> Downloaded: 2025-11-06T11:51:13.486Z

---

# Control Plane

> The main web interface for interacting with and managing your AgentOS instances

The AgentOS Control Plane is your primary web interface for accessing and managing all AgentOS features. This intuitive dashboard serves as the central hub where you interact with your agents, manage knowledge bases, track sessions, monitor performance, and control user access.

<Frame>
  <img src="https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=47cda181dd5fe3e35b00952cc2fc1e85" alt="AgentOS Control Plane Dashboard" style={{ borderRadius: "0.5rem" }} data-og-width="3477" width="3477" data-og-height="2005" height="2005" data-path="images/agentos-full-screenshot.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=280&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=64b3f57b511b5082368b71ab2461fc91 280w, https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=560&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=611e80fc18ec8b4d10f2c01711242bea 560w, https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=840&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=d3d30a7be52757d5d2a444385094d2c0 840w, https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=1100&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=e94a89850b6d5f063a1f5b13c9503002 1100w, https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=1650&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=8a17eadbd7c02cdc2fb6f9e234f4ac61 1650w, https://mintcdn.com/agno-v2/Is_2Bv3MNVYdZh1v/images/agentos-full-screenshot.png?w=2500&fit=max&auto=format&n=Is_2Bv3MNVYdZh1v&q=85&s=2450b803257dcc93c2621c855964fb2b 2500w" />
</Frame>

## OS Management

Connect and inspect your OS runtimes from a single interface. Switch between local development and live production instances, monitor connection health, and configure endpoints for your different environments.

<Frame>
  <video autoPlay muted loop playsInline style={{ borderRadius: "0.5rem", width: "100%", height: "auto" }}>
    <source src="https://mintcdn.com/agno-v2/CnjZpOWVs1q9bnAO/videos/agentos-select-os.mp4?fit=max&auto=format&n=CnjZpOWVs1q9bnAO&q=85&s=c6514be6950c2e9c7b103f071ac85b11" type="video/mp4" data-path="videos/agentos-select-os.mp4" />
  </video>
</Frame>

## User Management

Manage your organization members and their access to AgentOS features. Configure your organization name, invite team members, and control permissions from a centralized interface.

### Inviting Members

Add new team members to your organization by entering their email addresses. You can invite multiple users at once by separating emails with commas or pressing Enter/Tab between addresses.

### Member Roles

Control what each member can access:

* **Owner**: Full administrative access including billing and member management
* **Member**: Access to AgentOS features and collaboration capabilities

<Frame>
  <video autoPlay muted loop playsInline style={{ borderRadius: "0.5rem", width: "100%", height: "auto" }}>
    <source src="https://mintcdn.com/agno-v2/CnjZpOWVs1q9bnAO/videos/agentos-invite-member.mp4?fit=max&auto=format&n=CnjZpOWVs1q9bnAO&q=85&s=f54f71b63fd4b2110e211e0d1f0602c6" type="video/mp4" data-path="videos/agentos-invite-member.mp4" />
  </video>
</Frame>

## General Settings

Configure your account preferences and organization settings. Access your profile information, manage billing and subscription details, and adjust organization-wide preferences from a centralized settings interface.

## Feature Access

The control plane provides direct access to all main AgentOS capabilities through an intuitive interface:

<Note>
  **Getting Started Tip**: The control plane is your gateway to all AgentOS
  features. Start by connecting your OS instance, then explore each feature
  section to familiarize yourself with the interface.
</Note>

<CardGroup cols={2}>
  <Card title="Chat Interface" icon="comment" href="/agent-os/features/chat-interface">
    Start conversations with your agents and access multi-agent interactions
  </Card>

  <Card title="Knowledge Management" icon="book" href="/concepts/knowledge/overview">
    Upload and organize documents with search and browsing capabilities
  </Card>

  <Card title="Memory System" icon="brain" href="/concepts/memory/overview">
    Browse stored memories and search through conversation history
  </Card>

  <Card title="Session Tracking" icon="clock" href="/concepts/agents/sessions">
    Track and analyze agent interactions and performance
  </Card>

  <Card title="Evaluation & Testing" icon="chart-bar" href="/concepts/evals/overview">
    Test and evaluate agent performance with comprehensive metrics
  </Card>

  <Card title="Metrics & Monitoring" icon="chart-line" href="/concepts/agents/metrics">
    Monitor system performance and usage analytics
  </Card>
</CardGroup>

## Next Steps

Ready to get started with the AgentOS control plane? Here's what you need to do:

<CardGroup cols={2}>
  <Card title="Create Your First OS" icon="plus" href="/agent-os/creating-your-first-os">
    Set up a new AgentOS instance from scratch using our templates
  </Card>

  <Card title="Connect Your AgentOS" icon="link" href="/agent-os/connecting-your-os">
    Learn how to connect your local development environment to the platform
  </Card>
</CardGroup>
