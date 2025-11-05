# OPEN-CLI

**🇰🇷 한국어** | [🇺🇸 English](#english-version)

---

## 🇰🇷 한국어

### 📋 프로젝트 개요

**오프라인 기업 환경을 위한 로컬 LLM CLI 플랫폼**

OPEN-CLI는 인터넷 연결이 없는 기업 환경에서 로컬 AI 모델을 활용하여 개발자를 지원하는 터미널 기반 도구입니다.

### ✨ 핵심 가치

- 🔒 **완전 오프라인 운영**: 인터넷 없이 독립적으로 작동
- 🏢 **사내 모델 통합**: 기업의 로컬 LLM 서버 직접 연결 (OpenAI Compatible)
- 🚀 **빠른 설치**: Git clone 후 npm install만으로 즉시 사용
- 🛠️ **파일 시스템 접근**: AI가 직접 파일을 읽고 쓰고 검색
- 📚 **로컬 문서 관리**: 오프라인 지식 베이스 구축

### 🎯 타겟 유저

- **오프라인 기업 개발자**: 인터넷 접근이 제한된 환경에서 일하는 개발팀
- **보안 중시 조직**: 데이터를 외부로 전송할 수 없는 금융/국방/의료 분야
- **로컬 AI 사용자**: 사내에 구축된 LLM 서버를 활용하려는 엔터프라이즈 사용자
- **CLI 선호 개발자**: 터미널에서 AI와 대화하며 코딩하고 싶은 개발자

---

## 🚀 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone https://github.com/A2G-Dev-Space/Open-Code-CLI.git
cd Open-Code-CLI

# 의존성 설치
npm install

# 빌드
npm run build

# 글로벌 명령어 설정 (선택사항)
npm link
```

### 2. 초기 설정

```bash
# 대화형 초기화
open config init

# 또는
node dist/cli.js config init
```

**설정 과정**:
```
🚀 OPEN-CLI 초기화

? 엔드포인트 이름: My LLM Server
? Base URL: https://your-llm-server.com/v1/
? API Key (선택사항): ********
? Model ID: gemini-2.0-flash
? Model 이름: Gemini Flash
? Max Tokens: 1048576

🔍 연결 테스트 중...
✔ 연결 성공!

✅ 초기화 완료!
```

---

## 💻 사용법

### 기본 명령어

```bash
# 대화형 모드 시작 (추천!)
open

# 도움말
open help

# 설정 확인
open config show
```

### 대화형 모드 (Interactive Mode)

```bash
$ open

╔════════════════════════════════════════════════╗
║        OPEN-CLI Interactive Mode (Ink UI)      ║
╚════════════════════════════════════════════════╝

Model: gemini-2.0-flash
Commands: /exit /clear /help | Ctrl+C to quit

🧑 You: package.json 파일을 읽어서 프로젝트 이름 알려줘

🔧 Tool: read_file(file_path="package.json")

🤖 Assistant: 프로젝트 이름은 "open-cli"입니다.

You: _
```

**주요 메타 명령어**:
- `/exit` - 종료
- `/clear` - 대화 초기화
- `/save [name]` - 현재 대화 저장
- `/load` - 저장된 대화 불러오기
- `/endpoint` - LLM 엔드포인트 전환
- `/docs` - 로컬 문서 보기/검색
- `/help` - 도움말

### LLM 도구 (자동 실행)

대화형 모드에서 LLM이 자동으로 사용할 수 있는 도구:

- `read_file` - 파일 읽기
- `write_file` - 파일 쓰기
- `list_files` - 디렉토리 목록
- `find_files` - 파일 검색 (glob 패턴)

**예시**:
```bash
You: src 폴더에 있는 모든 TypeScript 파일을 찾아줘

🔧 Tool: find_files(pattern="*.ts", directory_path="src")

🤖 Assistant: 다음 TypeScript 파일들을 찾았습니다:
- src/cli.ts
- src/core/llm-client.ts
- src/core/config-manager.ts
...
```

### 세션 관리

```bash
# 대화 저장
You: /save typescript-tutorial

# 대화 불러오기
You: /load
? 불러올 대화 선택: typescript-tutorial

# 저장된 대화 목록
You: /sessions
```

### 로컬 문서 시스템

```bash
# 문서 목록
open docs list

# 문서 추가
open docs add

# 문서 검색
open docs search "typescript"

# Interactive Mode에서
You: /docs search typescript
```

---

## ✨ 주요 기능

### ✅ 완료된 기능 (Phase 1 & 2)

- ✅ OpenAI Compatible API 연결
- ✅ 대화형 모드 (Ink UI + Classic UI)
- ✅ 파일 시스템 도구 (LLM이 자동 사용)
- ✅ 세션 저장/복구
- ✅ 멀티 엔드포인트 관리
- ✅ 로컬 문서 시스템 (마크다운 지식 베이스)
- ✅ ESM 마이그레이션
- ✅ **GitHub Release Auto-Update System** 🆕
  - 자동 버전 체크 (GitHub Releases API)
  - 원클릭 업데이트 (Git pull 또는 Tarball 다운로드)
  - 롤백 지원 (자동 백업 생성)
  - `--no-update` 플래그로 비활성화 가능

### 🚧 개발 중 (Phase 2.5)

**Plan-and-Execute 아키텍처** (3-4주 예상)

사용자 요청을 자동으로 TODO list로 분해하고 순차 실행하는 시스템:

```
사용자: "TypeScript로 REST API 만들어줘"
    ↓
Planning LLM → TODO List 자동 생성
    ├─ ☐ 1. TypeScript 프로젝트 설정 조사
    ├─ ☐ 2. Express.js 설치
    ├─ ☐ 3. 라우트 구조 생성
    ├─ ☐ 4. API 엔드포인트 구현
    └─ ☐ 5. 테스트 코드 작성
    ↓
각 TODO 순차 실행
    ├─ Docs Search Agent (선행)
    ├─ LLM 실행 (Tools 사용)
    └─ ✓ 완료
    ↓
Session에 진행 상황 저장
```

**주요 기능**:
- 📋 TODO list 자동 생성 및 UI 표시
- 🔍 Docs Search Agent (각 TODO 실행 전 문서 검색)
- 🎯 실시간 진행 상황 추적
- 💾 TODO 상태 저장/복구

**Docs Search Agent Tool**:
- LLM이 bash 명령어로 ~/.open-cli/docs 폴더 검색
- Multi-iteration (최대 10회) 복잡한 검색 수행
- 검색 결과 자동 요약

**UI 개선**:
- Tool 사용 내역 박스 표시
- 하단 상태바 (컨텍스트 사용률)
- ASCII 로고 및 Welcome 화면

---

## 📦 디렉토리 구조

```
~/.open-cli/
├── config.json       # 설정 파일
├── sessions/         # 저장된 대화
├── docs/            # 로컬 문서 (마크다운)
├── backups/         # 백업
└── logs/            # 로그
```

---

## 🛠️ 기술 스택

- **언어**: TypeScript (ESM)
- **런타임**: Node.js v20+
- **CLI**: Commander.js
- **UI**: Ink (React), Chalk, Inquirer
- **HTTP**: Axios

---

## 📚 추가 문서

- [PROGRESS.md](./PROGRESS.md) - 개발 진행 상황 (상세)
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - 프로젝트 전체 문서

---

## 📄 라이선스

MIT License

---

## 🤝 기여 및 문의

**GitHub**: https://github.com/A2G-Dev-Space/Open-Code-CLI
**Email**: gkstmdgk2731@naver.com

---

---

<a name="english-version"></a>

## 🇺🇸 English

### 📋 Project Overview

**Local LLM CLI Platform for Offline Enterprise Environments**

OPEN-CLI is a terminal-based tool that helps developers in offline enterprise environments by utilizing local AI models without internet connectivity.

### ✨ Key Features

- 🔒 **Fully Offline**: Works independently without internet
- 🏢 **Enterprise LLM Integration**: Direct connection to company's local LLM servers (OpenAI Compatible)
- 🚀 **Quick Setup**: Ready to use after git clone and npm install
- 🛠️ **File System Access**: AI can directly read, write, and search files
- 📚 **Local Document Management**: Build offline knowledge base

### 🎯 Target Users

- **Offline Enterprise Developers**: Development teams working in internet-restricted environments
- **Security-Focused Organizations**: Finance/Defense/Healthcare sectors that cannot send data externally
- **Local AI Users**: Enterprise users who want to utilize in-house LLM servers
- **CLI-Loving Developers**: Developers who prefer coding while chatting with AI in terminal

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone repository
git clone https://github.com/A2G-Dev-Space/Open-Code-CLI.git
cd Open-Code-CLI

# Install dependencies
npm install

# Build
npm run build

# Global command setup (optional)
npm link
```

### 2. Initial Setup

```bash
# Interactive initialization
open config init

# Or
node dist/cli.js config init
```

**Setup Process**:
```
🚀 OPEN-CLI Initialization

? Endpoint name: My LLM Server
? Base URL: https://your-llm-server.com/v1/
? API Key (optional): ********
? Model ID: gemini-2.0-flash
? Model name: Gemini Flash
? Max Tokens: 1048576

🔍 Testing connection...
✔ Connection successful!

✅ Initialization complete!
```

---

## 💻 Usage

### Basic Commands

```bash
# Start interactive mode (Recommended!)
open

# Help
open help

# View config
open config show
```

### Interactive Mode

```bash
$ open

╔════════════════════════════════════════════════╗
║        OPEN-CLI Interactive Mode (Ink UI)      ║
╚════════════════════════════════════════════════╝

Model: gemini-2.0-flash
Commands: /exit /clear /help | Ctrl+C to quit

🧑 You: Read package.json and tell me the project name

🔧 Tool: read_file(file_path="package.json")

🤖 Assistant: The project name is "open-cli".

You: _
```

**Meta Commands**:
- `/exit` - Exit
- `/clear` - Clear conversation
- `/save [name]` - Save current conversation
- `/load` - Load saved conversation
- `/endpoint` - Switch LLM endpoint
- `/docs` - View/search local documents
- `/help` - Help

### LLM Tools (Auto-Execution)

Tools that LLM can automatically use in interactive mode:

- `read_file` - Read file
- `write_file` - Write file
- `list_files` - List directory
- `find_files` - Find files (glob pattern)

**Example**:
```bash
You: Find all TypeScript files in src folder

🔧 Tool: find_files(pattern="*.ts", directory_path="src")

🤖 Assistant: Found the following TypeScript files:
- src/cli.ts
- src/core/llm-client.ts
- src/core/config-manager.ts
...
```

### Session Management

```bash
# Save conversation
You: /save typescript-tutorial

# Load conversation
You: /load
? Select conversation: typescript-tutorial

# List saved conversations
You: /sessions
```

### Local Document System

```bash
# List documents
open docs list

# Add document
open docs add

# Search documents
open docs search "typescript"

# In Interactive Mode
You: /docs search typescript
```

---

## ✨ Features

### ✅ Completed (Phase 1 & 2)

- ✅ OpenAI Compatible API connection
- ✅ Interactive mode (Ink UI + Classic UI)
- ✅ File system tools (Auto-used by LLM)
- ✅ Session save/restore
- ✅ Multi-endpoint management
- ✅ Local document system (Markdown knowledge base)
- ✅ ESM migration

### 🚧 In Development (Phase 2.5)

**Plan-and-Execute Architecture** (3-4 weeks estimated)

System that automatically decomposes user requests into TODO lists and executes sequentially:

```
User: "Build REST API with TypeScript"
    ↓
Planning LLM → Auto-generate TODO List
    ├─ ☐ 1. Research TypeScript project setup
    ├─ ☐ 2. Install Express.js
    ├─ ☐ 3. Create route structure
    ├─ ☐ 4. Implement API endpoints
    └─ ☐ 5. Write tests
    ↓
Execute each TODO sequentially
    ├─ Docs Search Agent (pre-execution)
    ├─ LLM execution (with Tools)
    └─ ✓ Complete
    ↓
Save progress to Session
```

**Key Features**:
- 📋 Auto-generate TODO list with UI display
- 🔍 Docs Search Agent (search docs before each TODO)
- 🎯 Real-time progress tracking
- 💾 Save/restore TODO state

**Docs Search Agent Tool**:
- LLM searches ~/.open-cli/docs using bash commands
- Multi-iteration (max 10) for complex searches
- Auto-summarize search results

**UI Improvements**:
- Tool usage display box
- Bottom status bar (context usage)
- ASCII logo and welcome screen

---

## 📦 Directory Structure

```
~/.open-cli/
├── config.json       # Configuration file
├── sessions/         # Saved conversations
├── docs/            # Local documents (Markdown)
├── backups/         # Backups
└── logs/            # Logs
```

---

## 🛠️ Tech Stack

- **Language**: TypeScript (ESM)
- **Runtime**: Node.js v20+
- **CLI**: Commander.js
- **UI**: Ink (React), Chalk, Inquirer
- **HTTP**: Axios

---

## 📚 Additional Documentation

- [PROGRESS.md](./PROGRESS.md) - Development Progress (Detailed)
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Complete Project Documentation

---

## 📄 License

MIT License

---

## 🤝 Contributing & Contact

**GitHub**: https://github.com/A2G-Dev-Space/Open-Code-CLI
**Email**: gkstmdgk2731@naver.com

---

**Version**: 0.2.0
**Last Updated**: 2025-11-04
