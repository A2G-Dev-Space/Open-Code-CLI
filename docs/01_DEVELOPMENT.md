# 개발자 종합 가이드 (Development Guide)

> **문서 버전**: 4.0.0 (v1.0.0)
> **최종 수정일**: 2025-12-11

이 문서는 **OPEN-CLI** 프로젝트의 전체 구조, 아키텍처, 핵심 기능, 개발 규칙을 설명합니다.

---

## 목차

1. [프로젝트 정체성](#1-프로젝트-정체성)
2. [기술 스택](#2-기술-스택)
3. [폴더 구조](#3-폴더-구조)
4. [핵심 기능 상세](#4-핵심-기능-상세)
5. [데이터 흐름 아키텍처](#5-데이터-흐름-아키텍처)
6. [새 기능 추가하기](#6-새-기능-추가하기)
7. [코딩 규칙](#7-코딩-규칙)
8. [CLI 실행 모드](#8-cli-실행-모드)

---

## 1. 프로젝트 정체성

### OPEN-CLI란?

**오프라인 기업 환경을 위한 로컬 LLM CLI 플랫폼**입니다.

- 인터넷 없이 독립적으로 작동
- 기업의 로컬 LLM 서버(OpenAI Compatible)와 연결
- AI가 직접 파일을 읽고, 쓰고, 검색하고, 코드를 실행
- 터미널에서 Interactive UI로 AI와 대화

### 핵심 기능 (v1.0.0)

| 기능 | 설명 |
|------|------|
| Plan & Execute | 복잡한 작업을 자동으로 분해하여 순차 실행 |
| 요청 분류 | simple_response vs requires_todo 자동 분류 |
| 승인 모드 | 승인/승인(항상허용)/거부+코멘트 |
| ask-to-user Tool | LLM이 사용자에게 질문 (2-4 선택지 + Other) |
| 사용량 추적 | 세션/일별/월별 토큰 통계 |
| 문서 다운로드 | /docs download agno, adk |
| Claude Code 스타일 상태바 | `✶ ~하는 중… (esc to interrupt · 2m 7s · ↑ 3.6k tokens)` |

---

## 2. 기술 스택

| 항목 | 기술 |
|------|------|
| 언어 | TypeScript (ESM) |
| 런타임 | Node.js v20+ |
| CLI | Commander.js |
| UI | Ink (React), Chalk |
| HTTP | Axios |
| 빌드 | tsc |

---

## 3. 폴더 구조

### 3.1 전체 구조

```
src/
├── cli.ts                          # CLI 진입점 (open 명령)
├── index.ts                        # 라이브러리 진입점
├── constants.ts                    # 상수 정의
│
├── core/                           # 핵심 비즈니스 로직
│   ├── llm/                        # LLM 관련 모듈
│   │   ├── llm-client.ts           # LLM API 통신 클라이언트
│   │   ├── planning-llm.ts         # TODO 리스트 생성 LLM
│   │   ├── request-classifier.ts   # 요청 분류기 (Phase 1) ✅ NEW
│   │   └── index.ts
│   │
│   ├── config/                     # 설정 관리
│   │   ├── config-manager.ts       # 설정 파일 관리
│   │   ├── project-config.ts       # 프로젝트별 설정
│   │   └── index.ts
│   │
│   ├── session/                    # 세션 관리
│   │   ├── session-manager.ts      # 세션 저장/복구
│   │   └── index.ts
│   │
│   ├── knowledge/                  # 지식 관리 (RAG)
│   │   ├── docs-search-agent.ts    # 로컬 문서 검색 에이전트
│   │   ├── document-manager.ts     # 문서 인덱싱 관리
│   │   └── index.ts
│   │
│   ├── docs-manager.ts             # 문서 다운로드 관리 (Phase 4) ✅ NEW
│   ├── usage-tracker.ts            # 사용량 추적 (Phase 3) ✅ NEW
│   ├── slash-command-handler.ts    # 슬래시 명령 처리
│   ├── bash-command-tool.ts        # Bash 명령 실행 (보안 검증)
│   ├── todo-executor.ts            # TODO 실행기
│   ├── agent-framework-handler.ts  # 에이전트 프레임워크 핸들러
│   ├── internal-monologue.ts       # Extended Thinking
│   ├── scratchpad.ts               # 외부 TODO 파일 관리
│   ├── auto-updater.ts             # GitHub 자동 업데이트
│   ├── git-auto-updater.ts         # Git 기반 자동 업데이트
│   │
│   └── (re-export files)           # 하위 호환성 re-export
│       ├── llm-client.ts           # → llm/llm-client.ts
│       ├── config-manager.ts       # → config/config-manager.ts
│       ├── session-manager.ts      # → session/session-manager.ts
│       ├── planning-llm.ts         # → llm/planning-llm.ts
│       ├── docs-search-agent.ts    # → knowledge/docs-search-agent.ts
│       ├── document-manager.ts     # → knowledge/document-manager.ts
│       └── project-config.ts       # → config/project-config.ts
│
├── orchestration/                  # Plan & Execute 오케스트레이션 ✅ RENAMED
│   ├── orchestrator.ts             # 메인 오케스트레이터
│   ├── state-manager.ts            # 실행 상태 관리
│   ├── approval-manager.ts         # 사용자 승인 관리 (HITL) ✅ UPDATED
│   ├── risk-analyzer.ts            # 위험도 분석
│   ├── llm-schemas.ts              # LLM 입출력 스키마
│   ├── types.ts                    # 타입 정의
│   └── index.ts
│
├── execution/                      # 다계층 실행 시스템
│   ├── layer-manager.ts            # 계층 선택 및 관리
│   ├── standard-tools.ts           # 표준 도구 계층
│   ├── sdk-layer.ts                # 동적 코드 생성 계층
│   ├── subagent-layer.ts           # 서브 에이전트 계층
│   └── skills-layer.ts             # 스킬 계층
│
├── tools/                          # AI 도구 (6가지 분류 시스템)
│   ├── types.ts                    # 도구 타입 인터페이스
│   ├── registry.ts                 # 도구 중앙 등록 시스템
│   │
│   ├── llm/                        # LLM이 tool_call로 호출하는 도구
│   │   ├── simple/                 # Sub-LLM 없는 단순 도구
│   │   │   ├── file-tools.ts       # 파일 도구 (read, write, list, find)
│   │   │   ├── todo-tools.ts       # TODO 관리 도구 (Phase 1) ✅ NEW
│   │   │   ├── ask-user-tool.ts    # ask-to-user 도구 (Phase 2) ✅ NEW
│   │   │   └── index.ts
│   │   ├── agents/                 # Sub-LLM 사용 에이전트 도구
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── system/                     # 로직에서 자동 호출되는 도구
│   │   ├── simple/                 # Sub-LLM 없는 시스템 도구
│   │   │   └── index.ts
│   │   ├── agents/                 # Sub-LLM 사용 시스템 도구
│   │   │   ├── docs-search.ts      # 로컬 RAG 문서 검색
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── user/                       # 사용자 /슬래시 명령어
│   │   └── index.ts
│   │
│   ├── mcp/                        # MCP (Model Context Protocol)
│   │   └── index.ts
│   │
│   ├── native/                     # (하위 호환성)
│   │   ├── file-tools.ts
│   │   └── index.ts
│   │
│   ├── file-tools.ts               # (하위 호환성)
│   └── index.ts
│
├── ui/                             # UI 컴포넌트 (React/Ink)
│   ├── ink-entry.tsx               # Ink 렌더링 진입점
│   ├── index.ts
│   │
│   ├── components/
│   │   ├── PlanExecuteApp.tsx      # 메인 앱 (가장 중요!) ✅ UPDATED
│   │   ├── StatusBar.tsx           # 상태바 (Claude Code 스타일) ✅ UPDATED
│   │   ├── Logo.tsx                # 시작 화면 로고 (버전 표시) ✅ UPDATED
│   │   ├── CustomTextInput.tsx     # 텍스트 입력 (한글 지원)
│   │   ├── FileBrowser.tsx         # @ 파일 선택기
│   │   ├── CommandBrowser.tsx      # / 명령어 선택기
│   │   ├── TodoListView.tsx        # TODO 리스트 뷰
│   │   ├── ProgressBar.tsx         # 진행 상태바
│   │   ├── LLMSetupWizard.tsx      # 첫 실행 LLM 설정 마법사
│   │   ├── ModelSelector.tsx       # /model 모델 선택기
│   │   ├── MarkdownRenderer.tsx    # 마크다운/코드 구문 강조
│   │   ├── ActivityIndicator.tsx   # 활동 표시기 (토큰 메트릭)
│   │   ├── ThinkingIndicator.tsx   # 생각 중 표시기
│   │   ├── index.ts
│   │   │
│   │   ├── dialogs/                # 다이얼로그 컴포넌트
│   │   │   ├── ApprovalDialog.tsx  # 승인 다이얼로그 (Phase 2) ✅ UPDATED
│   │   │   ├── AskUserDialog.tsx   # ask-to-user 다이얼로그 (Phase 2) ✅ NEW
│   │   │   ├── SettingsDialog.tsx  # 설정 다이얼로그
│   │   │   └── index.ts
│   │   │
│   │   ├── panels/                 # 패널 컴포넌트
│   │   │   ├── SessionPanel.tsx    # 세션 패널
│   │   │   └── index.ts
│   │   │
│   │   └── views/                  # 뷰 컴포넌트
│   │       ├── ChatView.tsx        # 채팅 뷰 (마크다운 렌더링)
│   │       └── index.ts
│   │
│   ├── contexts/                   # React Context
│   │   └── TokenContext.tsx        # 토큰 사용량 추적
│   │
│   ├── hooks/                      # React 커스텀 훅
│   │   ├── usePlanExecution.ts     # Plan 실행 상태 관리 ✅ UPDATED
│   │   ├── useFileBrowserState.ts  # 파일 브라우저 상태
│   │   ├── useCommandBrowserState.ts # 명령 브라우저 상태
│   │   ├── useFileList.ts          # 파일 목록 로드
│   │   ├── slashCommandProcessor.ts # /명령어 처리
│   │   ├── atFileProcessor.ts      # @파일 처리
│   │   └── index.ts
│   │
│   ├── PlanExecuteView.tsx         # (legacy)
│   ├── TodoPanel.tsx               # TODO 패널
│   └── UpdateNotification.tsx      # 업데이트 알림
│
├── types/                          # 전역 타입 정의
│   └── index.ts
│
├── utils/                          # 유틸리티
│   ├── logger.ts                   # 로깅 시스템
│   ├── json-stream-logger.ts       # JSON 로그 스트림
│   ├── cache.ts                    # 캐싱
│   ├── file-system.ts              # 파일 시스템 헬퍼
│   └── retry.ts                    # 재시도 로직
│
├── errors/                         # 에러 클래스
│   ├── base.ts                     # 기본 에러
│   ├── llm.ts                      # LLM 관련 에러
│   ├── network.ts                  # 네트워크 에러
│   ├── file.ts                     # 파일 에러
│   ├── config.ts                   # 설정 에러
│   ├── validation.ts               # 검증 에러
│   └── index.ts
│
├── verification/                   # 검증 시스템
│   └── verification-system.ts      # Rule/Visual/LLM-Judge
│
└── workflows/                      # 워크플로우
    └── tdd-workflow.ts             # TDD 자동화
```

### 3.2 데이터 저장 위치

```
~/.open-cli/                        # 설정 및 데이터 디렉토리
├── config.json                     # 메인 설정
├── endpoints.json                  # LLM 엔드포인트 목록
├── usage.json                      # 사용량 통계 (Phase 3) ✅ NEW
├── docs/                           # 로컬 문서 (RAG용)
│   └── agent_framework/            # 다운로드된 문서 (Phase 4) ✅ NEW
│       ├── agno/                   # Agno Framework 문서
│       └── adk/                    # Google ADK 문서
├── backups/                        # 자동 백업
└── projects/{cwd}/                 # 프로젝트별 데이터
    ├── {session-id}.json           # 세션 데이터
    ├── {session-id}_log.json       # JSON 로그
    └── {session-id}_error.json     # 에러 로그
```

---

## 4. 핵심 기능 상세

### 4.1 요청 분류 시스템 (Phase 1)

**위치**: `src/core/llm/request-classifier.ts`

사용자 요청을 자동으로 분류하여 적절한 처리 방식을 결정합니다.

```typescript
type ClassificationType = 'simple_response' | 'requires_todo';

// 분류 흐름
User 요청
    ↓
┌─────────────────────────────────┐
│  RequestClassifier.classify()   │
│  - LLM이 요청 유형 분석         │
└─────────────────────────────────┘
    ↓                    ↓
simple_response      requires_todo
(바로 응답)          (TODO 생성 후 실행)
```

### 4.2 TODO 관리 LLM Tools (Phase 1)

**위치**: `src/tools/llm/simple/todo-tools.ts`

| 도구 | 설명 |
|------|------|
| `update-todo-list` | TODO 상태 업데이트 (in_progress, completed, failed) |
| `get-todo-list` | 현재 TODO 목록 조회 |

### 4.3 ask-to-user Tool (Phase 2)

**위치**: `src/tools/llm/simple/ask-user-tool.ts`

LLM이 사용자에게 질문할 수 있는 도구입니다.

```typescript
interface AskUserRequest {
  question: string;
  options: string[];  // 2-4개 선택지
  // "Other (직접 입력)" 옵션은 UI에서 자동 추가
}
```

**UI**: `src/ui/components/dialogs/AskUserDialog.tsx`
- 방향키와 Enter로 선택
- 숫자 키(1-4)로 빠른 선택
- "Other" 선택 시 텍스트 입력

### 4.4 승인 모드 (Phase 2)

**위치**: `src/orchestration/approval-manager.ts`, `src/ui/components/dialogs/ApprovalDialog.tsx`

위험한 작업 실행 전 사용자 승인을 요청합니다.

```typescript
type ApprovalAction = 'approve' | 'approve_always' | 'reject_with_comment' | 'stop';

// UI 옵션
[1] ✅ 승인 - 이 계획 실행
[2] ✅ 승인 (항상 허용) - 이 유형 항상 허용
[3] ❌ 거부 + 코멘트 - 피드백과 함께 거부
```

### 4.5 사용량 추적 (Phase 3)

**위치**: `src/core/usage-tracker.ts`

```typescript
interface SessionUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  requestCount: number;
  startTime: number;
  models: Record<string, number>;
}

// 주요 메서드
usageTracker.recordUsage(model, inputTokens, outputTokens);
usageTracker.getSessionUsage();
usageTracker.getSessionElapsedSeconds();
usageTracker.resetSession();
usageTracker.formatSessionStatus(activity);  // Claude Code 스타일
```

**슬래시 명령어**: `/usage`

### 4.6 문서 다운로드 (Phase 4)

**위치**: `src/core/docs-manager.ts`

개발팀이 사전 정의한 문서 소스만 다운로드 가능합니다.

```typescript
// 사용 가능한 소스
AVAILABLE_SOURCES = [
  { id: 'agno', name: 'Agno Framework', repoUrl: '...' },
  { id: 'adk', name: 'Google ADK', repoUrl: '...' },
];

// 슬래시 명령어
/docs                    # 정보 표시
/docs download agno      # Agno 문서 다운로드
/docs download adk       # ADK 문서 다운로드
```

### 4.7 File-Tools

**위치**: `src/tools/llm/simple/file-tools.ts`

| 도구 | 설명 | 파라미터 |
|------|------|----------|
| `read_file` | 파일 내용 읽기 | `file_path` |
| `write_file` | 파일 생성/수정 | `file_path`, `content` |
| `list_files` | 디렉토리 목록 조회 | `directory_path` |
| `find_files` | glob 패턴으로 파일 검색 | `pattern`, `directory_path?` |

### 4.8 LLM-Client

**위치**: `src/core/llm/llm-client.ts`

| 기능 | 메서드 | 설명 |
|------|--------|------|
| 기본 대화 | `sendMessage()` | 단일 메시지 전송 |
| 스트리밍 | `sendMessageStream()` | 실시간 토큰 응답 |
| Tool Calling | `sendMessageWithTools()` | AI 도구 호출 |

### 4.9 Plan-Execute (Orchestration)

**위치**: `src/orchestration/`

| 파일 | 역할 |
|------|------|
| `orchestrator.ts` | 전체 워크플로우 조율 |
| `state-manager.ts` | 실행 상태 관리 |
| `approval-manager.ts` | HITL 사용자 승인 |
| `risk-analyzer.ts` | 작업 위험도 분석 |
| `llm-schemas.ts` | LLM 입출력 형식 |
| `types.ts` | 타입 정의 |

---

## 5. 데이터 흐름 아키텍처

### 5.1 전체 실행 흐름

```
User Input (터미널 메시지)
        ↓
┌─────────────────────────────────────────────────────────────────┐
│                   React/Ink UI Layer                             │
│              src/ui/components/PlanExecuteApp.tsx                │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Request Classifier (Phase 1)                   │
│              src/core/llm/request-classifier.ts                  │
│                                                                  │
│              simple_response  ←→  requires_todo                  │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Plan-Execute (Orchestration)                   │
│                     src/orchestration/                           │
│                                                                  │
│  Planning → Approval (HITL) → Execution → Debugging              │
└──────────────────────────┬──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Tool Execution Layer                           │
│                     src/tools/, src/execution/                   │
│                                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │ LLM Tools  │ │ System     │ │ User       │ │ MCP        │   │
│  │ (Simple/   │ │ Tools      │ │ Commands   │ │ Tools      │   │
│  │  Agent)    │ │            │ │ (/slash)   │ │            │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
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

## 6. 새 기능 추가하기

### 6.1 새 LLM Tool 추가

**1단계**: `src/tools/llm/simple/`에 도구 파일 생성

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
        param1: { type: 'string', description: 'Parameter description' }
      },
      required: ['param1']
    }
  }
};

async function executeMyTool(args: Record<string, unknown>): Promise<ToolResult> {
  const param1 = args['param1'] as string;
  // 도구 로직 구현
  return { success: true, result: 'result' };
}

export const myTool: LLMSimpleTool = {
  definition: MY_TOOL_DEFINITION,
  execute: executeMyTool,
  categories: ['llm-simple'] as ToolCategory[],
  description: 'My tool description',
};
```

**2단계**: `src/tools/llm/simple/index.ts`에서 export

### 6.2 새 슬래시 명령어 추가

**위치**: `src/core/slash-command-handler.ts`

```typescript
// /mycommand 명령어 추가
if (trimmedCommand === '/mycommand') {
  // 명령어 로직
  const resultMessage = '결과 메시지';
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

### 6.3 새 문서 소스 추가 (Phase 4)

**위치**: `src/core/docs-manager.ts`의 `AVAILABLE_SOURCES` 배열에 추가

```typescript
export const AVAILABLE_SOURCES: DocsSource[] = [
  // ... 기존 소스
  {
    id: 'new-source',
    name: 'New Framework',
    description: '새 프레임워크 문서',
    repoUrl: 'https://github.com/org/repo',
    branch: 'main',
    subPath: 'docs',
    targetDir: 'agent_framework/new-source',
  },
];
```

---

## 7. 코딩 규칙

### 7.1 파일 명명 규칙

| 종류 | 규칙 | 예시 |
|------|------|------|
| Core 로직 | kebab-case.ts | `llm-client.ts`, `usage-tracker.ts` |
| UI 컴포넌트 | PascalCase.tsx | `PlanExecuteApp.tsx`, `AskUserDialog.tsx` |
| 타입 정의 | index.ts 또는 types.ts | `types/index.ts` |

### 7.2 로깅 규칙 (필수!)

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

### 7.3 Index Signature 접근

TypeScript에서 Record 타입의 속성 접근 시 bracket notation 사용:

```typescript
// 올바른 방법
const value = args['param_name'];

// 틀린 방법 (TS4111 에러)
const value = args.param_name;
```

---

## 8. CLI 실행 모드

| 모드 | 명령어 | 로그 레벨 | 용도 |
|------|--------|----------|------|
| Normal | `open` | INFO | 일반 사용 |
| Verbose | `open --verbose` | DEBUG | 개발/디버깅 |
| Debug | `open --debug` | VERBOSE | 심층 분석 |

---

## 문서 목록

1. `README.md` - 프로젝트 소개 및 빠른 시작
2. `docs/01_DEVELOPMENT.md` - 개발자 종합 가이드 (이 문서)
3. `docs/02_LOGGING.md` - 로깅 시스템 상세 가이드
4. `docs/03_TESTING.md` - 테스트 가이드
5. `docs/04_ROADMAP.md` - 프로젝트 로드맵

---

**질문이나 제안사항이 있으면 GitHub Issues를 이용해주세요!**
