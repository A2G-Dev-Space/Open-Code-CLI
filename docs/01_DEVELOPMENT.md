# Development Guide

> **Document Version**: 8.0.0 (v2.2.0)
> **Last Updated**: 2025-12-13

This document provides a comprehensive overview of the **Local-CLI** project architecture, core features, and development guidelines.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Core Features](#4-core-features)
5. [Data Flow Architecture](#5-data-flow-architecture)
6. [Adding New Features](#6-adding-new-features)
7. [Coding Standards](#7-coding-standards)
8. [CLI Execution Modes](#8-cli-execution-modes)

---

## 1. Project Overview

### What is Local-CLI?

**Local-CLI** is an AI-powered terminal coding assistant that enables developers to interact with their codebase through natural language.

- AI reads, writes, and searches files directly
- Execute shell commands with security validation
- Interactive terminal UI for seamless conversations
- Automatic language detection and response matching

### Key Features (v2.2.0)

| Feature | Description |
|---------|-------------|
| **File Tools** | Read, create, edit, list, and find files through AI |
| **Bash Tool** | Shell command execution with dangerous pattern blocking |
| **Supervised Mode** | User approval before file modifications (Tab key toggle) |
| **Plan & Execute** | Automatic task decomposition and sequential execution |
| **Unified Execution Loop** | Integrated Planning/Direct mode execution (v2.2.0) |
| **TODO Context Injection** | TODO state injected per-invoke (prevents history pollution) |
| **Request Classification** | Automatic simple_response vs requires_todo routing |
| **ask-to-user Tool** | LLM asks user questions (2-4 choices + Other option) |
| **tell_to_user Tool** | LLM sends progress messages to user |
| **Usage Tracking** | Session/daily/monthly token statistics |
| **Auto-Compact** | Automatic conversation compression at 80% context usage |
| **Context Display** | `Context (1.3K / 13%)` format showing tokens/percentage |
| **Single Tool Execution** | Forced via `parallel_tool_calls: false` API parameter |
| **Language Priority** | Responds in the same language as user input |
| **Claude Code-style Status Bar** | `✶ Working on... (esc to interrupt · 2m 7s · ↑ 3.6k tokens)` |
| **Static Log System** | Scrollable log history using Ink Static component |
| **Tool Icons** | Emoji icons for each tool (📖📝✏️📂🔍💬🔧) |

---

## 2. Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript (ESM) |
| Runtime | Node.js v20+ |
| CLI | Commander.js |
| UI | Ink (React), Chalk |
| HTTP | Axios |
| Build | tsc |
| Testing | Jest |

---

## 3. Project Structure

### 3.1 Directory Layout

```
src/
├── cli.ts                          # CLI entry point
├── index.ts                        # Library entry point
├── constants.ts                    # Constants definition
│
├── constants/                      # Constant modules
│   └── banner.ts                   # CLI banner ASCII art
│
├── core/                           # Core business logic
│   ├── llm/                        # LLM-related modules
│   │   ├── llm-client.ts           # LLM API communication client
│   │   ├── planning-llm.ts         # TODO list generation LLM
│   │   ├── request-classifier.ts   # Request classifier (simple/todo)
│   │   └── index.ts
│   │
│   ├── config/                     # Configuration management
│   │   ├── config-manager.ts       # Configuration file management
│   │   └── index.ts
│   │
│   ├── session/                    # Session management
│   │   ├── session-manager.ts      # Session save/restore
│   │   └── index.ts
│   │
│   ├── knowledge/                  # Knowledge management (RAG)
│   │   ├── docs-search-agent.ts    # Local document search agent
│   │   ├── document-manager.ts     # Document indexing management
│   │   └── index.ts
│   │
│   ├── compact/                    # Conversation compression (Auto-Compact)
│   │   ├── context-tracker.ts      # Context usage tracking
│   │   ├── compact-prompts.ts      # Compression prompt templates
│   │   ├── compact-manager.ts      # Compression execution logic
│   │   └── index.ts
│   │
│   ├── docs-manager.ts             # Document download management (/docs)
│   ├── usage-tracker.ts            # Usage tracking (/usage)
│   ├── slash-command-handler.ts    # Slash command processing
│   ├── bash-command-tool.ts        # Bash command execution (security validation)
│   ├── todo-executor.ts            # TODO executor
│   └── auto-updater.ts             # GitHub auto-updater
│
├── orchestration/                  # Plan & Execute schemas
│   ├── orchestrator.ts             # (DEPRECATED) Main orchestrator
│   ├── state-manager.ts            # Execution state management
│   ├── llm-schemas.ts              # LLM I/O schemas and system prompts
│   ├── types.ts                    # Type definitions
│   └── index.ts
│
├── tools/                          # AI tools (6-category system)
│   ├── types.ts                    # Tool type interfaces
│   ├── registry.ts                 # Central tool registration system
│   │
│   ├── llm/                        # Tools called by LLM via tool_call
│   │   ├── simple/                 # Simple tools (no Sub-LLM)
│   │   │   ├── file-tools.ts       # File tools + callback system
│   │   │   ├── bash-tool.ts        # Bash command execution tool (v2.1.0+)
│   │   │   ├── todo-tools.ts       # TODO management tools
│   │   │   ├── ask-user-tool.ts    # ask-to-user tool
│   │   │   └── index.ts
│   │   ├── agents/                 # Agent tools (with Sub-LLM)
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── system/                     # Auto-invoked system tools
│   │   ├── simple/                 # Simple system tools (no Sub-LLM)
│   │   │   └── index.ts
│   │   ├── agents/                 # System agent tools (with Sub-LLM)
│   │   │   ├── docs-search.ts      # Local RAG document search
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── user/                       # User /slash commands
│   │   └── index.ts
│   │
│   ├── mcp/                        # MCP (Model Context Protocol)
│   │   └── index.ts
│   │
│   └── index.ts
│
├── ui/                             # UI components (React/Ink)
│   ├── ink-entry.tsx               # Ink rendering entry point
│   ├── index.ts
│   │
│   ├── components/
│   │   ├── PlanExecuteApp.tsx      # Main app (most important!)
│   │   │                           # - Static log system
│   │   │                           # - LogEntry types and rendering
│   │   │                           # - Tool icons/emojis
│   │   ├── StatusBar.tsx           # Status bar (Claude Code style, Context %)
│   │   ├── Logo.tsx                # Start screen logo (color gradient)
│   │   ├── CustomTextInput.tsx     # Text input (Korean support)
│   │   ├── FileBrowser.tsx         # @ file selector
│   │   ├── CommandBrowser.tsx      # / command selector
│   │   ├── TodoListView.tsx        # TODO list view
│   │   ├── ProgressBar.tsx         # Progress status bar
│   │   ├── LLMSetupWizard.tsx      # First-run LLM setup wizard
│   │   ├── ModelSelector.tsx       # /model model selector
│   │   ├── MarkdownRenderer.tsx    # Markdown/code syntax highlighting
│   │   ├── ActivityIndicator.tsx   # Activity indicator (token metrics)
│   │   ├── ThinkingIndicator.tsx   # Thinking indicator
│   │   ├── index.ts
│   │   │
│   │   ├── dialogs/                # Dialog components
│   │   │   ├── AskUserDialog.tsx   # ask-to-user dialog
│   │   │   ├── SettingsDialog.tsx  # Settings dialog
│   │   │   ├── DocsBrowser.tsx     # /docs document browser
│   │   │   └── index.ts
│   │   │
│   │   ├── panels/                 # Panel components
│   │   │   ├── SessionPanel.tsx    # Session panel
│   │   │   └── index.ts
│   │   │
│   │   └── views/                  # View components
│   │       ├── ChatView.tsx        # Chat view (markdown rendering)
│   │       └── index.ts
│   │
│   ├── contexts/                   # React Context
│   │   └── TokenContext.tsx        # Token usage tracking
│   │
│   ├── hooks/                      # React custom hooks
│   │   ├── usePlanExecution.ts     # Plan execution state management (core!)
│   │   │                           # - Unified execution loop
│   │   │                           # - TODO context injection
│   │   │                           # - Auto-compact integration
│   │   ├── useFileBrowserState.ts  # File browser state
│   │   ├── useCommandBrowserState.ts # Command browser state
│   │   ├── useFileList.ts          # File list loading
│   │   ├── slashCommandProcessor.ts # /command processing
│   │   ├── atFileProcessor.ts      # @file processing
│   │   └── index.ts
│   │
│   ├── PlanExecuteView.tsx         # (legacy)
│   ├── TodoPanel.tsx               # TODO panel
│   └── UpdateNotification.tsx      # Update notification
│
├── types/                          # Global type definitions
│   └── index.ts
│
├── utils/                          # Utilities
│   ├── logger.ts                   # Logging system
│   ├── json-stream-logger.ts       # JSON log stream
│   ├── cache.ts                    # Caching
│   ├── file-system.ts              # File system helpers
│   └── retry.ts                    # Retry logic
│
└── errors/                         # Error classes
    ├── base.ts                     # Base error
    ├── llm.ts                      # LLM-related errors
    ├── network.ts                  # Network errors
    ├── file.ts                     # File errors
    ├── validation.ts               # Validation errors
    └── index.ts
```

### 3.2 Data Storage Location

```
~/.local-cli/                        # Configuration and data directory
├── config.json                     # Main configuration
├── usage.json                      # Usage statistics
├── docs/                           # Local documents (for RAG)
│   └── agent_framework/            # Downloaded documents
│       ├── agno/                   # Agno Framework docs
│       └── adk/                    # Google ADK docs
├── backups/                        # Automatic backups
└── projects/{cwd}/                 # Per-project data
    ├── {session-id}.json           # Session data
    ├── {session-id}_log.json       # JSON log
    └── {session-id}_error.json     # Error log
```

---

## 4. Core Features

### 4.1 Request Classification System

**Location**: `src/core/llm/request-classifier.ts`

Automatically classifies user requests to determine appropriate handling:

```typescript
type ClassificationType = 'simple_response' | 'requires_todo';

// Classification flow
User Request
    ↓
┌─────────────────────────────────┐
│  RequestClassifier.classify()   │
│  - LLM analyzes request type    │
└─────────────────────────────────┘
    ↓                    ↓
simple_response      requires_todo
(direct response)    (create TODOs then execute)
```

### 4.2 File Tools

**Location**: `src/tools/llm/simple/file-tools.ts`

| Tool | Icon | Description | Parameters |
|------|------|-------------|------------|
| `read_file` | 📖 | Read file contents | `reason`, `file_path` |
| `create_file` | 📝 | Create new file (fails if exists) | `reason`, `file_path`, `content` |
| `edit_file` | ✏️ | Edit existing file (line-based) | `reason`, `file_path`, `edits[]` |
| `list_files` | 📂 | List directory contents | `reason`, `directory_path?`, `recursive?` |
| `find_files` | 🔍 | Search files with glob pattern | `reason`, `pattern`, `directory_path?` |
| `tell_to_user` | 💬 | Send message to user | `message` |

**Important**: All file tools require the `reason` parameter (explains what's being done to user)

#### edit_file Usage

```typescript
// Line-based editing (line_number is 1-based)
{
  "file_path": "src/app.ts",
  "edits": [
    { "line_number": 5, "original_text": "const x = 1;", "new_text": "const x = 2;" },
    { "line_number": 10, "original_text": "// delete this", "new_text": "" }  // deletion
  ]
}
```

### 4.3 Bash Tool (v2.1.0+)

**Location**: `src/tools/llm/simple/bash-tool.ts`

Enables LLM to execute shell commands safely.

| Tool | Icon | Description | Parameters |
|------|------|-------------|------------|
| `bash` | 🔧 | Execute shell command | `reason`, `command`, `working_directory?` |

**Security Features**: Dangerous command patterns are blocked:
- `rm -rf /`, `rm -rf ~`, `rm -rf *`
- `dd if=`, `mkfs`, fork bomb
- `sudo rm`, `shutdown`, `reboot`, etc.

```typescript
// Dangerous patterns (blocked)
const DANGEROUS_PATTERNS = [
  /\brm\s+-rf\s+[\/~]/i,
  /\bdd\s+if=/i,
  /\bmkfs\b/i,
  /\bshutdown\b/i,
  // ...
];
```

### 4.4 Static Log System

**Location**: `src/ui/components/PlanExecuteApp.tsx`

Scrollable log system using Ink's `Static` component.

```typescript
// LogEntry types
type LogEntryType =
  | 'logo'              // Start logo
  | 'user_input'        // User input
  | 'assistant_message' // AI response
  | 'tool_start'        // Tool execution start
  | 'tool_result'       // Tool execution result
  | 'tell_user'         // tell_to_user message
  | 'plan_created'      // Plan created
  | 'todo_start'        // TODO started
  | 'todo_complete'     // TODO completed
  | 'todo_fail'         // TODO failed
  | 'compact';          // Conversation compressed

interface LogEntry {
  id: string;
  type: LogEntryType;
  content: string;
  details?: string;
  toolArgs?: Record<string, unknown>;  // for tool_start, tool_result
  success?: boolean;
  items?: string[];     // for plan_created
  diff?: string[];      // for edit_file diff
}
```

#### Callback System

Callbacks in `file-tools.ts` for delivering events to UI:

```typescript
// Tool execution start/result
setToolExecutionCallback((toolName, reason, args) => { ... });
setToolResponseCallback((toolName, success, result) => { ... });

// Message/plan/TODO events
setTellToUserCallback((message) => { ... });
setPlanCreatedCallback((todoTitles) => { ... });
setTodoStartCallback((title) => { ... });
setTodoCompleteCallback((title) => { ... });
setTodoFailCallback((title) => { ... });
setCompactCallback((originalCount, newCount) => { ... });
```

### 4.5 Tool Result Display Rules

| Tool | Display Format |
|------|----------------|
| `read_file` | Show up to 5 lines + "... (N more lines)" |
| `list_files` | "N items (preview...)" |
| `find_files` | "N items (preview...)" |
| `create_file` | diff format (+ for all lines, green) |
| `edit_file` | diff format (- / + full display, red/green) |
| `bash` | Command output (stdout/stderr) |
| `tell_to_user` | Hidden tool_result (shown in tell_user log) |

### 4.6 TODO Management LLM Tools

**Location**: `src/tools/llm/simple/todo-tools.ts`

| Tool | Description |
|------|-------------|
| `update_todos` | Update TODO status (in_progress, completed, failed) - batch support |
| `get_todo_list` | Get current TODO list |

### 4.7 ask-to-user Tool

**Location**: `src/tools/llm/simple/ask-user-tool.ts`

Enables LLM to ask questions to the user.

```typescript
interface AskUserRequest {
  question: string;
  options: string[];  // 2-4 choices
  // "Other (type your own)" option is auto-added by UI
}
```

**UI**: `src/ui/components/dialogs/AskUserDialog.tsx`
- Arrow keys and Enter for selection
- Number keys (1-4) for quick selection
- Text input when "Other" is selected

### 4.8 Auto-Compact (Conversation Compression)

**Location**: `src/core/compact/`

Automatically compresses conversation when context window reaches 80%.

| File | Role |
|------|------|
| `context-tracker.ts` | Track prompt_tokens, detect 80% |
| `compact-prompts.ts` | Compression prompt templates, dynamic context injection |
| `compact-manager.ts` | Execute compression via LLM call |

```typescript
// Manual compression
/compact

// Auto compression
- Triggered when Context reaches 80% before message send
- StatusBar shows "Context XX%" (green/yellow/red)
- Last 2 messages preserved during compression (continuity)
```

**v2.2.0 Changes**:
- Auto-Compact works in Planning mode too
- `contextTracker.reset()` call enables repeated compression

### 4.9 Usage Tracking

**Location**: `src/core/usage-tracker.ts`

```typescript
interface SessionUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  requestCount: number;
  startTime: number;
  models: Record<string, number>;
  lastPromptTokens: number;  // For context tracking
}

// Key methods
usageTracker.recordUsage(model, inputTokens, outputTokens);
usageTracker.getSessionUsage();
usageTracker.getSessionElapsedSeconds();
usageTracker.resetSession();
usageTracker.formatSessionStatus(activity);  // Claude Code style
```

**Slash command**: `/usage`

### 4.10 Document Download

**Location**: `src/core/docs-manager.ts`

Download from developer-predefined document sources only.

```typescript
// Available sources
AVAILABLE_SOURCES = [
  { id: 'agno', name: 'Agno Framework', repoUrl: '...' },
  { id: 'adk', name: 'Google ADK', repoUrl: '...' },
];

// Slash commands
/docs                    # Show document browser UI (↑↓ navigate, Enter download)
/docs download agno      # Download Agno docs
/docs download adk       # Download ADK docs
```

**UI**: `src/ui/components/dialogs/DocsBrowser.tsx`
- Arrow keys and Enter for selection
- Number keys (1-9) for quick download
- Installation status display (✅ installed / ⬜ not installed)

### 4.11 LLM Client

**Location**: `src/core/llm/llm-client.ts`

| Feature | Method | Description |
|---------|--------|-------------|
| Basic chat | `sendMessage()` | Single message send |
| Streaming | `sendMessageStream()` | Real-time token response |
| Tool Calling | `sendMessageWithTools()` | AI tool invocation |
| Tool + Loop | `chatCompletionWithTools()` | Repeated tool call execution |

### 4.12 Plan-Execute (Unified Execution Loop)

**Location**: `src/ui/hooks/usePlanExecution.ts`

Since v2.2.0, Planning mode and Direct mode use a unified execution loop.

#### Architecture Change (v2.2.0)

| Before (v2.1.x) | Now (v2.2.0) |
|-----------------|--------------|
| `PlanExecuteOrchestrator` for-loop | Unified while-loop in `usePlanExecution` |
| TODO state included in history | TODO Context Injection (no history pollution) |
| Separate Orchestrator instance | Single execution loop |

#### Core Functions

```typescript
// Build TODO context (injected per LLM call)
function buildTodoContext(todos: TodoItem[]): string {
  // Create markdown format of current TODO state
  // Not saved to history
}

// Check completion condition
function areAllTodosCompleted(todos: TodoItem[]): boolean {
  return todos.every(t => t.status === 'completed' || t.status === 'failed');
}

// Execution loop
while (!areAllTodosCompleted(currentTodos) && iterations < MAX_ITERATIONS) {
  // 1. Build TODO context
  const todoContext = buildTodoContext(currentTodos);

  // 2. Temporarily add TODO context to user message
  const messagesForLLM = currentMessages.map((m, i) =>
    i === lastUserMsgIndex ? { ...m, content: m.content + todoContext } : m
  );

  // 3. LLM call
  const result = await llmClient.chatCompletionWithTools(messagesForLLM, FILE_TOOLS);

  // 4. Update messages (without TODO context)
  currentMessages = [...currentMessages, ...newMessages];

  // 5. Auto-compact check
  if (contextTracker.shouldTriggerAutoCompact(maxTokens)) {
    // Execute compression, preserve last 2 messages
  }
}
```

#### Orchestration Module (DEPRECATED)

`src/orchestration/orchestrator.ts` is no longer used.
However, schemas and type definitions are still in use:

| File | Status | Role |
|------|--------|------|
| `orchestrator.ts` | DEPRECATED | (not used) |
| `state-manager.ts` | In use | Execution state management |
| `llm-schemas.ts` | In use | System prompts, LLM schemas |
| `types.ts` | In use | Type definitions |

### 4.13 Slash Commands

**Location**: `src/ui/hooks/slashCommandProcessor.ts`

| Command | Description |
|---------|-------------|
| `/exit`, `/quit` | Exit app |
| `/clear` | Reset conversation and TODOs |
| `/compact` | Compress conversation (manual) |
| `/settings` | Open settings menu |
| `/model` | Open model selector |
| `/load` | Load saved session |
| `/docs` | Open document browser |
| `/usage` | Token usage statistics |
| `/help` | Show help |

---

## 5. Data Flow Architecture

### 5.1 Overall Execution Flow

```
User Input (terminal message)
        ↓
┌─────────────────────────────────────────────────────────────────┐
│                   React/Ink UI Layer                             │
│              src/ui/components/PlanExecuteApp.tsx                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Static Log System                                         │   │
│  │ - Manage history with LogEntry[] array                    │   │
│  │ - Scrollable via Ink Static component                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Auto-Compact Check                             │
│              Execute compression first if Context > 80%          │
│              (preserve last 2 messages)                          │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Request Classifier                             │
│              src/core/llm/request-classifier.ts                  │
│                                                                  │
│              simple_response  ←→  requires_todo                  │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│               Unified Execution Loop (v2.2.0)                    │
│              src/ui/hooks/usePlanExecution.ts                    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ executePlanMode / executeDirectMode                     │     │
│  │ - TODO Context Injection (per-invoke)                   │     │
│  │ - Context Tracking + Auto-compact                       │     │
│  │ - areAllTodosCompleted() check                          │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Tool Execution Layer                           │
│                     src/tools/                                   │
│                                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │ LLM Tools  │ │ System     │ │ User       │ │ MCP        │   │
│  │ (File,Bash,│ │ Tools      │ │ Commands   │ │ Tools      │   │
│  │  TODO,Ask) │ │            │ │ (/slash)   │ │            │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
│                                                                  │
│  Tool Callbacks → PlanExecuteApp → Static Log                   │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│               External Systems / LLM API                         │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │ File       │  │ LLM API    │  │ Bash       │                 │
│  │ System     │  │ (OpenAI)   │  │ Commands   │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Adding New Features

### 6.1 Adding a New LLM Tool

**Step 1**: Create tool file in `src/tools/llm/simple/`

```typescript
// src/tools/llm/simple/my-tool.ts
import { LLMSimpleTool, ToolResult, ToolCategory } from '../../types.js';
import { ToolDefinition } from '../../../types/index.js';

const MY_TOOL_DEFINITION: ToolDefinition = {
  type: 'function',
  function: {
    name: 'my_tool',
    description: 'Description of what the tool does',
    parameters: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: `A natural, conversational explanation for the user...`
        },
        param1: { type: 'string', description: 'Parameter description' }
      },
      required: ['reason', 'param1']
    }
  }
};

async function executeMyTool(args: Record<string, unknown>): Promise<ToolResult> {
  const param1 = args['param1'] as string;
  // Implement tool logic
  return { success: true, result: 'result' };
}

export const myTool: LLMSimpleTool = {
  definition: MY_TOOL_DEFINITION,
  execute: executeMyTool,
  categories: ['llm-simple'] as ToolCategory[],
  description: 'My tool description',
};
```

**Step 2**: Export from `src/tools/llm/simple/index.ts`

**Step 3**: Add tool icon (in PlanExecuteApp.tsx's `getToolIcon` function)

```typescript
const getToolIcon = (toolName: string): string => {
  switch (toolName) {
    // ... existing tools
    case 'my_tool':
      return '🔧';  // Choose appropriate icon
    default:
      return '🔧';
  }
};
```

### 6.2 Adding a New Slash Command

**Step 1**: Register command in `src/ui/hooks/slashCommandProcessor.ts`

```typescript
export const SLASH_COMMANDS: CommandMetadata[] = [
  // ... existing commands
  {
    name: '/mycommand',
    description: 'My command description',
  },
];
```

**Step 2**: Add handler in `src/core/slash-command-handler.ts`

```typescript
// Add /mycommand command
if (trimmedCommand === '/mycommand') {
  // Command logic
  const resultMessage = 'Result message';
  const updatedMessages = [
    ...context.messages,
    { role: 'assistant' as const, content: resultMessage },
  ];
  context.setMessages(updatedMessages);
  return {
    handled: true,
    shouldContinue: false,
    updatedContext: { messages: updatedMessages },
  };
}
```

### 6.3 Adding a New Document Source

**Location**: Add to `AVAILABLE_SOURCES` array in `src/core/docs-manager.ts`

```typescript
export const AVAILABLE_SOURCES: DocsSource[] = [
  // ... existing sources
  {
    id: 'new-source',
    name: 'New Framework',
    description: 'New framework documentation',
    repoUrl: 'https://github.com/org/repo',
    branch: 'main',
    subPath: 'docs',
    targetDir: 'agent_framework/new-source',
  },
];
```

---

## 7. Coding Standards

### 7.1 File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Core logic | kebab-case.ts | `llm-client.ts`, `usage-tracker.ts` |
| UI components | PascalCase.tsx | `PlanExecuteApp.tsx`, `AskUserDialog.tsx` |
| Type definitions | index.ts or types.ts | `types/index.ts` |

### 7.2 Logging Rules (Required!)

See `docs/02_LOGGING.md` for details.

```typescript
import { logger } from '../utils/logger.js';

async function myFunction(input: string) {
  logger.enter('myFunction', { input });

  try {
    logger.flow('Processing input');
    const result = await process(input);
    logger.vars({ name: 'result', value: result });

    logger.exit('myFunction', { success: true });
    return result;
  } catch (error) {
    logger.error('myFunction failed', error);
    throw error;
  }
}
```

**Note**: `logger.info()` is deprecated. Use `logger.debug()` or `logger.flow()`.

### 7.3 Index Signature Access

Use bracket notation when accessing Record type properties in TypeScript:

```typescript
// Correct
const value = args['param_name'];

// Wrong (TS4111 error)
const value = args.param_name;
```

### 7.4 Tool reason Parameter

All LLM Tools must include the `reason` parameter:

```typescript
reason: {
  type: 'string',
  description: `A natural, conversational explanation for the user about what you're doing (in user's language).
Write as if you're talking to the user directly.
Examples:
- "Checking how the current authentication logic is implemented"
- "Opening the file where the error occurred to find the problem"`
}
```

### 7.5 Language Priority

System prompt includes Language Priority guide:

```
## CRITICAL - Language Priority (HIGHEST)

ALWAYS respond in the SAME LANGUAGE as the user's input.
- If user writes in Korean → respond in Korean, use Korean for tool reasons
- If user writes in English → respond in English, use English for tool reasons
- Match the user's language for ALL outputs including status messages and notes
```

---

## 8. CLI Execution Modes

| Mode | Command | Log Level | Use Case |
|------|---------|-----------|----------|
| Normal | `local-cli` | INFO | General use |
| Verbose | `local-cli --verbose` | DEBUG | Development/debugging |
| Debug | `local-cli --debug` | VERBOSE | Deep analysis |

---

## Document List

1. `README.md` - Project introduction and quick start
2. `docs/01_DEVELOPMENT.md` - Development guide (this document)
3. `docs/02_LOGGING.md` - Logging system detailed guide
4. `docs/03_TESTING.md` - Testing guide
5. `docs/04_ROADMAP.md` - Project roadmap

---

**Questions or suggestions? Please use GitHub Issues!**
