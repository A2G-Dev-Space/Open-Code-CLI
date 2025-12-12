# Local-CLI

**AI-Powered Terminal Coding Assistant**

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> An intelligent command-line interface that helps developers write, edit, and manage code through natural language conversations with AI.

---

## Overview

**Local-CLI** is a terminal-based AI coding assistant that brings the power of large language models directly to your development workflow. It enables you to:

- **Read, create, and edit files** through natural language commands
- **Execute shell commands** safely with built-in security validation
- **Plan complex tasks** with automatic TODO decomposition
- **Manage context** intelligently with auto-compaction

Perfect for developers who prefer working in the terminal and want AI assistance without leaving their command-line environment.

---

## Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **File Operations** | Read, create, edit, list, and search files through AI |
| **Bash Execution** | Run shell commands with dangerous pattern blocking |
| **Plan & Execute** | Automatically break complex tasks into manageable TODOs |
| **Supervised Mode** | Approve file modifications before they happen (Tab to toggle) |
| **Auto-Compact** | Automatic conversation compression at 80% context usage |
| **Session Management** | Save and restore conversation sessions |

### Interactive UI

- **Real-time streaming** responses with syntax highlighting
- **File browser** (`@` key) for quick file selection
- **Command browser** (`/` key) for slash commands
- **Progress indicators** with token usage tracking
- **Claude Code-style status bar** showing context usage

### Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show help information |
| `/clear` | Reset conversation and TODOs |
| `/compact` | Manually compress conversation |
| `/model` | Select AI model |
| `/settings` | Open settings menu |
| `/usage` | Display token usage statistics |
| `/load` | Load saved session |
| `/docs` | Document management |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+C` | Exit application |
| `ESC` | Interrupt current operation |
| `Tab` | Toggle Auto/Supervised mode |
| `@` | Open file browser |
| `/` | Open command browser |

---

## Installation

### Prerequisites

- **Node.js** v20.0.0 or higher
- **npm** v10.0.0 or higher

### Quick Start

```bash
# Clone the repository
git clone https://github.com/A2G-Dev-Space/Local-CLI.git
cd Local-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Link globally
npm link

# Run
local-cli
```

### Development Mode

```bash
# Watch mode for development
npm run watch

# Run with verbose logging
local-cli --verbose

# Run with debug logging
local-cli --debug
```

---

## Usage

### Basic Interaction

Start the CLI and begin chatting with AI:

```bash
local-cli
```

Then simply type your request:

```
> Create a new React component called Button with primary and secondary variants
```

The AI will analyze your request, create a plan if needed, and execute the necessary file operations.

### File Operations

The AI can perform various file operations:

```
> Read the package.json file and explain what dependencies are installed
> Create a new TypeScript file for user authentication
> Edit the config.ts file to add a new environment variable
> Find all .tsx files in the src directory
```

### Shell Commands

Execute shell commands through the AI:

```
> Run npm test and show me the results
> List all running processes
> Check git status
```

### Planning Mode

For complex tasks, the AI automatically creates a TODO list:

```
> Refactor the authentication module to use JWT tokens
```

The AI will:
1. Analyze the existing code
2. Create a step-by-step plan
3. Execute each TODO item sequentially
4. Report progress in real-time

---

## Configuration

### Data Directory

All configuration and data is stored in `~/.local-cli/`:

```
~/.local-cli/
├── config.json          # Main configuration
├── usage.json           # Token usage statistics
├── docs/                # Downloaded documentation
├── backups/             # Automatic backups
└── projects/{cwd}/      # Per-project sessions
    ├── {session-id}.json
    └── {session-id}_log.json
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `LOCAL_CLI_DEBUG` | Enable debug mode |
| `LOCAL_CLI_LOG_LEVEL` | Set logging level (info, debug, verbose) |

---

## Architecture

### Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript (ESM) |
| Runtime | Node.js v20+ |
| CLI Framework | Commander.js |
| UI Library | Ink (React for CLI) |
| Styling | Chalk |
| HTTP Client | Axios |

### Project Structure

```
src/
├── cli.ts                    # Entry point
├── core/                     # Core business logic
│   ├── llm/                  # LLM client and utilities
│   ├── config/               # Configuration management
│   ├── session/              # Session persistence
│   ├── compact/              # Auto-compact system
│   └── knowledge/            # Document search (RAG)
├── tools/                    # AI tool definitions
│   ├── llm/                  # LLM-callable tools
│   │   └── simple/           # File, Bash, TODO tools
│   ├── system/               # System-invoked tools
│   └── user/                 # User slash commands
├── ui/                       # React/Ink components
│   ├── components/           # UI components
│   └── hooks/                # React hooks
├── orchestration/            # Plan & Execute logic
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
└── errors/                   # Error classes
```

---

## AI Tools

Local-CLI provides the following tools to the AI:

| Tool | Icon | Description |
|------|------|-------------|
| `read_file` | 📖 | Read file contents |
| `create_file` | 📝 | Create new files |
| `edit_file` | ✏️ | Edit existing files (line-based) |
| `list_files` | 📂 | List directory contents |
| `find_files` | 🔍 | Search files with glob patterns |
| `bash` | 🔧 | Execute shell commands |
| `ask_user` | 💬 | Ask user for input |
| `update_todos` | ✅ | Manage TODO list |

---

## Scripts

```bash
# Development
npm run build          # Compile TypeScript
npm run watch          # Watch mode
npm run dev            # Run with ts-node

# Testing
npm test               # Run unit tests
npm run test:e2e       # Run E2E tests
npm run test:coverage  # Generate coverage report

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format with Prettier
```

---

## Troubleshooting

### "Cannot find module" errors

```bash
npm run build
```

### UI rendering issues

Try running with verbose mode to see detailed logs:

```bash
local-cli --verbose
```

### Session issues

Clear the session data:

```bash
rm -rf ~/.local-cli/projects/
```

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Keywords

`ai-coding-assistant` `cli-tool` `terminal-ai` `code-generation` `developer-tools` `typescript` `nodejs` `llm` `chatgpt-cli` `copilot-alternative` `ai-pair-programming` `command-line-ai`

---

**Made with ❤️ by the Local-CLI Team**
