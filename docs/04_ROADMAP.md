# OPEN-CLI Roadmap & TODO List

> **문서 버전**: 2.0.0
> **최종 수정일**: 2025-12-11
> **작성자**: Development Team

## 목차

1. [개요](#1-개요)
2. [핵심 아키텍처: 6가지 도구 분류](#2-핵심-아키텍처-6가지-도구-분류)
3. [Phase 0: 아키텍처 리팩토링 (최우선)](#3-phase-0-아키텍처-리팩토링-최우선)
4. [Phase 1: 핵심 기능 강화](#4-phase-1-핵심-기능-강화)
5. [Phase 2: 확장 기능 구현](#5-phase-2-확장-기능-구현)
6. [Phase 3: 고급 기능 구현](#6-phase-3-고급-기능-구현)
7. [테스트 전략](#7-테스트-전략)
8. [우선순위 매트릭스](#8-우선순위-매트릭스)

---

## 1. 개요

### 1.1 프로젝트 비전

OPEN-CLI는 오프라인 기업 환경을 위한 완전한 로컬 LLM CLI 플랫폼입니다.

### 1.2 핵심 변경 사항 (v2.0)

| 항목 | 이전 | 이후 |
|------|------|------|
| 실행 모드 | planning / auto / no-planning | **auto only** (단일 모드) |
| 도구 분류 | 미정의 | **6가지 명확한 분류** |
| 테스트 전략 | Unit + E2E | **시나리오 테스트 only** |
| 도구 등록 | 하드코딩 | **중앙 등록 시스템** (중복 등록 가능) |

---

## 2. 핵심 아키텍처: 6가지 도구 분류

### 2.1 분류 개요

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         OPEN-CLI Tool Architecture                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  LLM이 사용하는 도구 (LLM Tool Call로 호출)                      │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │  1) LLM Simple Tools        │  2) LLM Agent Tools               │    │
│  │     - file (read/write)     │     - docs-search-agent           │    │
│  │     - bash                  │     - planning-agent (향후)       │    │
│  │     - search (grep)         │     - code-review-agent (향후)    │    │
│  │     Sub-LLM 개입 없음        │     Sub-LLM 개입 있음             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  시스템이 로직적으로 사용하는 도구 (자동 트리거)                  │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │  3) System Simple Tools     │  4) System Agent Tools            │    │
│  │     - todo-manager          │     - docs-search-orchestrator    │    │
│  │     - context-builder       │     - plan-orchestrator           │    │
│  │     - result-formatter      │     - risk-analyzer               │    │
│  │     Sub-LLM 개입 없음        │     Sub-LLM 개입 있음             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  외부 연동 도구                                                   │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │  5) User Commands           │  6) MCP Tools                     │    │
│  │     - /model, /settings     │     - 외부 MCP 서버 도구          │    │
│  │     - /save, /load          │     - enable/disable 관리         │    │
│  │     - /help, /clear         │     - /mcp add, /mcp list         │    │
│  │     사용자가 /로 직접 호출   │     사용자가 등록 관리             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 분류별 상세 정의

#### 1) LLM Simple Tools
- **호출 주체**: LLM (tool_call)
- **Sub-LLM**: 없음
- **특징**: 단순 실행, 즉시 결과 반환
- **예시**: file read/write, bash, grep/search

```typescript
interface LLMSimpleTool {
  definition: ToolDefinition;  // LLM에 전달
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
  categories: string[];        // 복수 카테고리 가능
}
```

#### 2) LLM Agent Tools
- **호출 주체**: LLM (tool_call)
- **Sub-LLM**: 있음
- **특징**: 내부적으로 Sub-LLM 호출하여 복잡한 작업 수행
- **예시**: docs-search (bash+LLM), code-review (향후)

```typescript
interface LLMAgentTool {
  definition: ToolDefinition;
  execute: (args: Record<string, unknown>, llmClient: LLMClient) => Promise<ToolResult>;
  categories: string[];
  requiresSubLLM: true;
}
```

#### 3) System Simple Tools
- **호출 주체**: 시스템 로직 (자동 트리거)
- **Sub-LLM**: 없음
- **특징**: 특정 조건에서 자동 실행
- **예시**: TODO 상태 관리, 컨텍스트 빌딩

```typescript
interface SystemSimpleTool {
  name: string;
  execute: (context: SystemContext) => Promise<ToolResult>;
  triggerCondition: (context: SystemContext) => boolean;
}
```

#### 4) System Agent Tools
- **호출 주체**: 시스템 로직 (자동 트리거)
- **Sub-LLM**: 있음
- **특징**: 특정 조건에서 Sub-LLM과 함께 실행
- **예시**: Planning, DocsSearch Orchestrator, Risk Analysis

```typescript
interface SystemAgentTool {
  name: string;
  execute: (context: SystemContext, llmClient: LLMClient) => Promise<ToolResult>;
  triggerCondition: (context: SystemContext) => boolean;
  requiresSubLLM: true;
}
```

#### 5) User Commands
- **호출 주체**: 사용자 (/명령어)
- **특징**: 슬래시로 직접 호출
- **예시**: /model, /settings, /save, /load, /help

```typescript
interface UserCommand {
  name: string;          // '/model'
  aliases?: string[];    // ['/m']
  description: string;
  execute: (args: string[], context: CommandContext) => Promise<CommandResult>;
}
```

#### 6) MCP Tools
- **호출 주체**: LLM (tool_call) + 사용자 관리
- **특징**: 외부 MCP 서버 연동, enable/disable 관리
- **예시**: 외부 DB 도구, 외부 API 도구

```typescript
interface MCPTool {
  definition: ToolDefinition;
  serverId: string;
  enabled: boolean;
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
}
```

### 2.3 도구 중복 등록

**핵심 원칙**: 하나의 도구가 여러 분류에 등록 가능

```typescript
// 예시: bash-tool
const bashTool = {
  name: 'bash',
  // 1) LLM Simple Tool로 등록 → LLM이 직접 호출 가능
  // 4) System Agent Tool (DocsSearch)에서 내부적으로 사용
  categories: ['llm-simple', 'system-agent-internal'],
};

// 예시: docs-search
const docsSearchTool = {
  name: 'docs-search',
  // 2) LLM Agent Tool로 등록 → LLM이 필요시 호출
  // 4) System Agent Tool로 등록 → requiresDocsSearch=true 시 자동 트리거
  categories: ['llm-agent', 'system-agent'],
};
```

### 2.4 도구 선택 로직 (향후)

```typescript
// 1) & 2) LLM 도구 선택 - 도구가 많아지면 LLM이 선택
async function selectLLMTools(task: string, allTools: LLMTool[]): Promise<ToolDefinition[]> {
  if (allTools.length <= 10) {
    return allTools.map(t => t.definition);  // 전부 노출
  }
  // LLM이 관련 도구 선택
  return await llmSelectRelevantTools(task, allTools);
}

// 3) & 4) System 도구 트리거 - triggerCondition으로 결정
function shouldTriggerSystemTool(tool: SystemTool, context: SystemContext): boolean {
  return tool.triggerCondition(context);
}
```

---

## 3. Phase 0: 아키텍처 리팩토링 (최우선)

> **목표**: 6가지 도구 분류 기반 구조 확립, Auto 모드 단일화

### 3.1 실행 모드 단일화

**현재 상태**: planning / auto / no-planning 3가지 모드

**목표**: Auto 모드만 유지

**삭제 대상**:
- [ ] Tab 키로 모드 전환 UI/UX 제거
- [ ] planning mode 관련 코드 제거
- [ ] no-planning mode 관련 코드 제거
- [ ] 모드 선택 관련 상태/로직 제거

**유지 대상**:
- [x] Plan & Execute Orchestrator (내부적으로 자동 판단)
- [x] Planning LLM (시스템이 필요시 자동 호출)

### 3.2 폴더 구조 리팩토링

**목표 구조**:
```
src/
├── tools/
│   ├── index.ts                    # 전체 barrel export + 중앙 등록
│   │
│   ├── llm/                        # 1) & 2) LLM 도구
│   │   ├── index.ts                # LLM 도구 등록 + 선택 로직
│   │   │
│   │   ├── simple/                 # 1) LLM Simple Tools
│   │   │   ├── index.ts
│   │   │   ├── file-tools.ts       # read, write, list, find
│   │   │   ├── bash-tools.ts       # bash 명령 실행
│   │   │   └── search-tools.ts     # grep, ripgrep
│   │   │
│   │   └── agents/                 # 2) LLM Agent Tools
│   │       ├── index.ts
│   │       └── docs-search.ts      # 문서 검색 (Sub-LLM)
│   │
│   ├── system/                     # 3) & 4) System 도구
│   │   ├── index.ts
│   │   │
│   │   ├── simple/                 # 3) System Simple Tools
│   │   │   ├── index.ts
│   │   │   ├── todo-manager.ts     # TODO 상태 관리
│   │   │   └── context-builder.ts  # 컨텍스트 구축
│   │   │
│   │   └── agents/                 # 4) System Agent Tools
│   │       ├── index.ts
│   │       ├── plan-orchestrator.ts    # Planning 오케스트레이터
│   │       ├── docs-orchestrator.ts    # Docs 검색 오케스트레이터
│   │       └── risk-analyzer.ts        # 위험도 분석
│   │
│   ├── user/                       # 5) User Commands
│   │   ├── index.ts                # 명령어 등록 + 라우터
│   │   ├── session-commands.ts     # /save, /load, /history
│   │   ├── config-commands.ts      # /model, /settings
│   │   └── system-commands.ts      # /help, /clear, /exit
│   │
│   └── mcp/                        # 6) MCP Tools
│       ├── index.ts
│       ├── mcp-client.ts           # MCP 프로토콜
│       └── mcp-registry.ts         # enable/disable 관리
│
├── core/
│   ├── llm/                        # LLM 클라이언트
│   ├── config/                     # 설정 관리
│   ├── session/                    # 세션 관리
│   └── knowledge/                  # Local RAG (문서 저장)
│
├── ui/                             # UI 컴포넌트
│
└── types/                          # 타입 정의
```

### 3.3 중앙 도구 등록 시스템

**파일**: `tools/index.ts`

```typescript
// 모든 도구 중앙 등록
export const TOOL_REGISTRY = {
  llm: {
    simple: LLM_SIMPLE_TOOLS,
    agents: LLM_AGENT_TOOLS,
  },
  system: {
    simple: SYSTEM_SIMPLE_TOOLS,
    agents: SYSTEM_AGENT_TOOLS,
  },
  user: USER_COMMANDS,
  mcp: MCP_TOOLS,
};

// LLM에 전달할 도구 정의 가져오기
export function getLLMToolDefinitions(filter?: string[]): ToolDefinition[];

// LLM 도구 실행
export async function executeLLMTool(name: string, args: any, llmClient?: LLMClient): Promise<ToolResult>;

// System 도구 트리거 체크
export function checkSystemToolTriggers(context: SystemContext): SystemTool[];

// User 명령어 실행
export async function executeUserCommand(command: string, args: string[], context: CommandContext): Promise<CommandResult>;
```

### 3.4 TODO 목록

#### 3.4.1 모드 단일화
- [ ] `PlanExecuteApp.tsx`에서 모드 전환 UI 제거
- [ ] Tab 키 핸들링 제거
- [ ] `executionMode` 상태 제거
- [ ] 관련 훅/컴포넌트 정리

#### 3.4.2 폴더 구조 변경
- [ ] `tools/llm/simple/` 폴더 생성
- [ ] `tools/llm/agents/` 폴더 생성
- [ ] `tools/system/simple/` 폴더 생성
- [ ] `tools/system/agents/` 폴더 생성
- [ ] `tools/user/` 폴더 생성
- [ ] `tools/mcp/` 폴더 생성

#### 3.4.3 기존 코드 마이그레이션
- [ ] `tools/native/file-tools.ts` → `tools/llm/simple/file-tools.ts`
- [ ] `core/bash-command-tool.ts` → `tools/llm/simple/bash-tools.ts`
- [ ] `core/knowledge/docs-search-agent.ts` → `tools/llm/agents/docs-search.ts` + `tools/system/agents/docs-orchestrator.ts`
- [ ] `plan-and-execute/` → `tools/system/agents/`
- [ ] `core/slash-command-handler.ts` → `tools/user/`

#### 3.4.4 중앙 등록 시스템
- [ ] `tools/index.ts` 구현
- [ ] 각 분류별 `index.ts` 구현
- [ ] 도구 중복 등록 지원

#### 3.4.5 미사용 코드 정리
- [ ] `tools/base/` 폴더 삭제 (이미 삭제됨)
- [ ] `execution/` 폴더 검토 및 정리

---

## 4. Phase 1: 핵심 기능 강화

> **목표**: 주요 기능 안정화 및 도구 확장

### 4.1 LLM Simple Tools 확장

#### 4.1.1 Bash Tool 강화
- [ ] 안전한 명령어 실행 (샌드박싱)
- [ ] 위험 명령어 필터링 강화
- [ ] 타임아웃 처리
- [ ] 출력 스트리밍

#### 4.1.2 Search Tool 구현
- [ ] ripgrep 통합
- [ ] glob 패턴 지원
- [ ] 컨텍스트 라인 표시
- [ ] 결과 하이라이팅

#### 4.1.3 Git Tool 구현 (LLM Simple)
- [ ] status, diff, log
- [ ] add, commit (메시지 자동 생성)
- [ ] 기업 내부 repo 지원

### 4.2 System Agent Tools 강화

#### 4.2.1 Plan Orchestrator 개선
- [ ] 작업 복잡도 자동 분석
- [ ] 적응형 계획 수립
- [ ] 에러 복구 로직 강화

#### 4.2.2 Risk Analyzer 개선
- [ ] 위험도 점수 세분화
- [ ] 작업 유형별 기본 위험도
- [ ] 사용자 정의 규칙

### 4.3 User Commands 확장

- [ ] `/git` - Git 작업 명령어
- [ ] `/docs` - 문서 다운로드/검색
- [ ] `/usage` - 사용량 조회

---

## 5. Phase 2: 확장 기능 구현

### 5.1 MCP 통합

#### 5.1.1 MCP Client
- [ ] MCP 프로토콜 구현
- [ ] 서버 연결 관리
- [ ] 도구/리소스 조회

#### 5.1.2 MCP Registry
- [ ] `/mcp add <server>` - 서버 추가
- [ ] `/mcp list` - 서버 목록
- [ ] `/mcp enable/disable <tool>` - 도구 관리

### 5.2 Tool RAG

#### 5.2.1 Tool Selector (향후)
- [ ] 도구 설명 임베딩
- [ ] 요청 기반 도구 검색
- [ ] LLM 기반 도구 선택

### 5.3 Local RAG 강화

- [ ] Vector Store 구현
- [ ] 하이브리드 검색
- [ ] 결과 리랭킹

### 5.4 사용량 추적

- [ ] 토큰 사용량 추적
- [ ] 도구 사용 통계
- [ ] 비용 계산

---

## 6. Phase 3: 고급 기능 구현

### 6.1 코드 문서화

- [ ] AST 기반 코드 분석
- [ ] 자동 문서 생성
- [ ] `/document` 명령어

### 6.2 고급 Plan-Execute

- [ ] 병렬 실행 지원
- [ ] 체크포인트 시스템
- [ ] 학습 기반 최적화

---

## 7. 테스트 전략

### 7.1 테스트 원칙 변경

| 항목 | 이전 | 이후 |
|------|------|------|
| Unit Test | 유지 | **삭제** |
| E2E Test | 유지 | **시나리오 테스트로 통합** |
| 목표 | 코드 커버리지 | **시나리오 안정성** |

### 7.2 시나리오 테스트 정의

**특징**:
- 내부 구현이 바뀌어도 테스트 변경 불필요
- 사용자 관점의 입출력만 검증
- 실제 사용 시나리오 기반

**구조**:
```
tests/
├── scenarios/
│   ├── file-operations.test.ts      # 파일 CRUD 시나리오
│   ├── code-generation.test.ts      # 코드 생성 시나리오
│   ├── planning-execution.test.ts   # Plan & Execute 시나리오
│   ├── docs-search.test.ts          # 문서 검색 시나리오
│   ├── session-management.test.ts   # 세션 관리 시나리오
│   └── error-recovery.test.ts       # 에러 복구 시나리오
├── fixtures/                        # 테스트 데이터
└── helpers/                         # 테스트 유틸리티
```

**시나리오 예시**:
```typescript
// file-operations.test.ts
describe('File Operations Scenario', () => {
  it('should create a new file when requested', async () => {
    // Given: 사용자가 파일 생성 요청
    const request = 'Create a file named test.txt with content "hello"';

    // When: CLI 실행
    const result = await runCLI(request);

    // Then: 파일이 생성됨
    expect(fs.existsSync('test.txt')).toBe(true);
    expect(fs.readFileSync('test.txt', 'utf-8')).toBe('hello');
  });

  it('should read and summarize a file', async () => {
    // Given: 기존 파일 존재
    fs.writeFileSync('existing.txt', 'Some content here');

    // When: 파일 읽기 요청
    const result = await runCLI('Read existing.txt and tell me what it contains');

    // Then: 내용이 응답에 포함
    expect(result.output).toContain('Some content');
  });
});
```

### 7.3 테스트 마이그레이션 계획

#### Phase 1: 정리
- [ ] 기존 Unit Test 파일 삭제
- [ ] 기존 E2E Test 구조 분석
- [ ] 유지할 시나리오 식별

#### Phase 2: 시나리오 정의
- [ ] 핵심 사용자 시나리오 목록 작성
- [ ] 시나리오별 입출력 정의
- [ ] 테스트 우선순위 결정

#### Phase 3: 구현
- [ ] 테스트 헬퍼 함수 구현
- [ ] 시나리오 테스트 작성
- [ ] CI/CD 연동

### 7.4 시나리오 목록 (예정)

| 시나리오 | 설명 | 우선순위 |
|----------|------|----------|
| 파일 생성/수정/삭제 | 기본 파일 CRUD | P0 |
| 코드 생성 | 새 함수/클래스 생성 | P0 |
| 버그 수정 | 에러 기반 코드 수정 | P0 |
| 문서 검색 | Local RAG 검색 | P1 |
| 세션 저장/로드 | 대화 지속성 | P1 |
| 에러 복구 | 실패 시 재시도 | P1 |
| 모델 전환 | /model 명령어 | P2 |
| 설정 변경 | /settings 명령어 | P2 |

---

## 8. 우선순위 매트릭스

### 8.1 구현 순서

**즉시 시작 (Phase 0)** - 1-2주
1. 모드 단일화 (auto only)
2. 6가지 분류 폴더 구조
3. 중앙 등록 시스템
4. Unit Test 삭제 + 시나리오 테스트 구조

**단기 (Phase 1)** - 3-4주
1. LLM Simple Tools 확장 (bash, search, git)
2. System Agent Tools 강화
3. 핵심 시나리오 테스트

**중기 (Phase 2)** - 5-8주
1. MCP 통합
2. Tool RAG
3. 사용량 추적

**장기 (Phase 3)** - 9-12주
1. 코드 문서화
2. 고급 Plan-Execute
3. 학습 기반 최적화

---

## 부록

### A. 파일 생성/삭제 체크리스트

#### 신규 폴더
- [ ] `src/tools/llm/simple/`
- [ ] `src/tools/llm/agents/`
- [ ] `src/tools/system/simple/`
- [ ] `src/tools/system/agents/`
- [ ] `src/tools/user/`
- [ ] `src/tools/mcp/`
- [ ] `tests/scenarios/`

#### 삭제 대상
- [x] `src/tools/base/` (이미 삭제)
- [ ] `tests/unit/` (Unit Test 삭제)
- [ ] 모드 전환 관련 UI 코드

#### 마이그레이션
- [ ] `tools/native/` → `tools/llm/simple/`
- [ ] `core/bash-command-tool.ts` → `tools/llm/simple/`
- [ ] `core/knowledge/docs-search-agent.ts` → `tools/llm/agents/` + `tools/system/agents/`
- [ ] `plan-and-execute/` → `tools/system/agents/`
- [ ] `core/slash-command-handler.ts` → `tools/user/`

### B. 인터페이스 정의

```typescript
// 공통 결과 타입
interface ToolResult {
  success: boolean;
  result?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

// 1) LLM Simple Tool
interface LLMSimpleTool {
  definition: ToolDefinition;
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
  categories: string[];
}

// 2) LLM Agent Tool
interface LLMAgentTool {
  definition: ToolDefinition;
  execute: (args: Record<string, unknown>, llmClient: LLMClient) => Promise<ToolResult>;
  categories: string[];
  requiresSubLLM: true;
}

// 3) System Simple Tool
interface SystemSimpleTool {
  name: string;
  execute: (context: SystemContext) => Promise<ToolResult>;
  triggerCondition: (context: SystemContext) => boolean;
}

// 4) System Agent Tool
interface SystemAgentTool {
  name: string;
  execute: (context: SystemContext, llmClient: LLMClient) => Promise<ToolResult>;
  triggerCondition: (context: SystemContext) => boolean;
  requiresSubLLM: true;
}

// 5) User Command
interface UserCommand {
  name: string;
  aliases?: string[];
  description: string;
  execute: (args: string[], context: CommandContext) => Promise<CommandResult>;
}

// 6) MCP Tool
interface MCPTool {
  definition: ToolDefinition;
  serverId: string;
  enabled: boolean;
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
}
```

---

*이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
