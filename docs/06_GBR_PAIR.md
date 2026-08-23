# Pair a phone with Build Remote Agent

Local CLI can use **Build Remote Agent** as a pairing device: the paid
iOS/Android app spectates (and can inject into) this desktop `local-cli`
session through the free MIT `gbr-agent`. Phone and PC never open ports to
each other.

Website: https://grokbuildremote.com/
Agent: https://github.com/LinespottingOrg/GrokBuildRemote-Agents (MIT)
Protocol: `gbr/1` · need agent **v0.6.0+**

Independent product by Linespotting AB. Not affiliated with xAI or SpaceX.

Local CLI's in-product MCP client is still roadmap (see
[04_ROADMAP.md](./04_ROADMAP.md) Phase 7). Until `/mcp add` ships, attach with
the loopback Bot API next to this process.

## Install + pair

```bash
# macOS / Linux
curl -fsSL https://grokbuildremote.com/install.sh | bash
gbr-agent version          # must print v0.6.0 or newer
gbr-agent pair             # QR in browser + printed 8-char code
gbr-agent run              # leave running
```

```powershell
# Windows
irm https://grokbuildremote.com/install.ps1 | iex
gbr-agent version
gbr-agent pair
gbr-agent run
```

Phone: open Build Remote Agent → **Scan QR from computer** (or type the 8-char
code). Sessions appear in the app. **Unpair** in Settings before changing PCs.
Force-close is not enough.

## Attach this agent

After `gbr-agent run` on the **same machine** as Local CLI:

```bash
curl -sS http://127.0.0.1:8788/health
curl -sS http://127.0.0.1:8788/v1/sessions
```

Optional MCP stdio (for Phase 7 `/mcp add` later, or any MCP client beside Local CLI):

```bash
git clone https://github.com/LinespottingOrg/GrokBuildRemote-Agents.git
cd GrokBuildRemote-Agents/mcp/gbr-mcp && npm install
node bin/gbr-mcp.js --diagnose
```

Phone is spectator. Orchestration stays on Local CLI (Ollama / vLLM / LM Studio).
Do not commit mailbox keys. Phone **Settings → Bot API** is the only place the
relay key is copied.
