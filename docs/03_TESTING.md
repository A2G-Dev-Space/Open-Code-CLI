# 테스트 가이드 (Testing Guide)

이 문서는 OPEN-CLI의 E2E 테스트 시스템을 설명합니다.
**모든 PR은 테스트 통과 후 생성해야 합니다.**

---

## 목차

1. [빠른 시작](#1-빠른-시작)
2. [테스트 명령어](#2-테스트-명령어)
3. [테스트 카테고리](#3-테스트-카테고리)
4. [테스트 시나리오 상세](#4-테스트-시나리오-상세)
5. [테스트 출력 이해하기](#5-테스트-출력-이해하기)
6. [새 테스트 추가하기](#6-새-테스트-추가하기)
7. [문제 해결](#7-문제-해결)
8. [Demo 테스트 시나리오 상세](#8-demo-테스트-시나리오-상세)
9. [Agno 코드 생성 평가 시나리오 상세](#9-agno-코드-생성-평가-시나리오-상세)
10. [Human-in-the-Loop (HITL) 테스트](#10-human-in-the-loop-hitl-테스트)
11. [Real LLM 테스트](#11-real-llm-테스트)
12. [테스트 프롬프트 예시](#12-테스트-프롬프트-예시)
13. [Agno Agent 코드 생성 평가 시스템 (CLI)](#13-agno-agent-코드-생성-평가-시스템-cli)
14. [데모 스크립트](#14-데모-스크립트)

---

## 1. 빠른 시작

### PR 생성 전 필수 실행

```bash
# 모든 테스트 실행 (단위 + E2E)
npm run test:all

# 또는 E2E만 실행
npm run test:e2e
```

### 테스트 통과 시 출력

```
╔════════════════════════════════════════════════════════════╗
║          OPEN-CLI E2E Test Suite                          ║
╚════════════════════════════════════════════════════════════╝

테스트 시나리오 현황:
  file-tools     ██████░░░░ 6개
  llm-client     ████████░░ 8개
  plan-execute   ███████░░░ 7개
  session        ████░░░░░░ 4개
  config         █████░░░░░ 5개
  local-rag      ████░░░░░░ 4개
  integration    ██████░░░░ 6개
  settings       ██████░░░░ 6개
  demos          ████░░░░░░ 4개
  agno-eval      ███░░░░░░░ 3개

════════════════════════════════════════════════════════════
                        테스트 결과 요약
════════════════════════════════════════════════════════════

  ████████████████████████████████████████

  Total:   53
  Passed:  53
  Failed:  0

  ✓ 모든 테스트가 통과했습니다!
```

---

## 2. 테스트 명령어

### 기본 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run test:e2e` | E2E 테스트 실행 |
| `npm run test:e2e:verbose` | 상세 로그와 함께 실행 |
| `npm run test:e2e:list` | 테스트 목록만 출력 |
| `npm run test:all` | 단위 테스트 + E2E 테스트 |
| `npm run prepr` | PR 전 검증 (lint + E2E) |

### 옵션

```bash
# 상세 로그 출력
npm run test:e2e -- --verbose

# 특정 카테고리만 실행
npm run test:e2e -- --filter llm-client

# 특정 테스트 ID만 실행 (단일 테스트)
npm run test:e2e -- --test llm-basic-chat

# 축약형 단일 테스트
npm run test:e2e -- -t agent-simple-task

# 첫 실패 시 중단
npm run test:e2e -- --fail-fast

# 조합 사용
npm run test:e2e -- --verbose --filter file-tools --fail-fast

# 단일 테스트 + 상세 로그
npm run test:e2e -- -t llm-basic-chat -v
```

---

## 3. 테스트 카테고리

### file-tools (파일 도구)
- `read_file`: 파일 읽기
- `write_file`: 파일 쓰기
- `list_files`: 디렉토리 목록
- `find_files`: 파일 검색
- LLM을 통한 파일 작업

### llm-client (LLM 클라이언트)
- 기본 대화
- 한국어 대화
- 스트리밍 응답
- 코드 생성
- Tool Calling
- 에러 처리

### plan-execute (Plan & Execute)
- TODO 리스트 생성
- 복잡한 요청 분해
- TODO 구조 검증
- 의존성 처리

### session (세션 관리)
- 세션 저장
- 세션 로드
- 세션 목록 조회
- 영속성 검증

### config (설정 관리)
- 설정 읽기
- 엔드포인트 확인 (다중 엔드포인트 지원)
- 모델 정보 확인 (Health 상태 포함)
- LLM Client 생성
- Health Check 기능

### local-rag (로컬 RAG)
- 단순 문서 검색
- 코드 관련 검색
- 다중 파일 검색
- 프로젝트 문서 검색

### integration (통합 테스트)
- 전체 워크플로우
- 파일 작업 연계
- 세션 워크플로우
- 에러 복구
- LLM Tool Chain

### demos (데모 테스트)
- Simple Demo (Mock LLM)
- HITL Demo (Auto-approve)
- Logger Demo
- Real LLM Plan & Execute

### agno-eval (Agno 코드 생성 평가)
- Agno Code Generation (Quick)
- Agno Evaluation System Init
- Agno Code Validator
- Agno Single Code Generation

---

## 4. 테스트 시나리오 상세

이 섹션은 각 테스트가 **왜** 필요하고, **무엇을** 테스트하며, **어떻게** 검증하는지 설명합니다.

### 4.1 File Tools (파일 도구)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `file-tools-write` | 파일 쓰기 테스트 | `write_file` 도구가 파일을 정상 생성하는지 확인 |
| `file-tools-read` | 파일 읽기 테스트 | `read_file` 도구가 파일 내용을 정확히 읽는지 확인 |
| `file-tools-list` | 디렉토리 목록 테스트 | `list_files` 도구가 디렉토리 내 파일들을 나열하는지 확인 |
| `file-tools-find` | 파일 검색 테스트 | `find_files` 도구가 패턴으로 파일을 찾는지 확인 |
| `file-tools-llm-read` | LLM 파일 읽기 테스트 | LLM이 `read_file` 도구를 호출하여 파일을 읽는지 확인 |
| `file-tools-llm-write` | LLM 파일 쓰기 테스트 | LLM이 `write_file` 도구를 호출하여 파일을 생성하는지 확인 |

#### file-tools-write
```
목적: write_file 도구가 파일을 정상적으로 생성하는지 확인
동작:
  1. /tmp/open-cli-test 디렉토리 생성 (setup)
  2. write_file 도구로 test-file.txt 파일에 내용 작성
  3. fs.access()로 파일 존재 확인
  4. 디렉토리 삭제 (teardown)
기대값: 파일이 존재하고 쓰기 결과에 '성공' 문자열 포함
확인방법:
  - 콘솔에서 "✓ 파일 쓰기" 출력 확인
  - verbose 모드에서 [Action Result] 확인
```

#### file-tools-llm-read
```
목적: LLM이 read_file 도구를 올바르게 호출하는지 확인
동작:
  1. 테스트 파일 생성 (Project Name: OPEN-CLI 내용)
  2. LLM에게 "파일을 읽고 프로젝트 이름을 알려주세요" 요청
  3. LLM이 read_file 도구 호출 → 파일 내용 획득 → 응답 생성
기대값: LLM 응답에 'OPEN-CLI' 포함
확인방법:
  - verbose 모드에서 LLM 응답 내용 확인
  - 응답에 프로젝트 이름이 정확히 포함되어 있는지 확인
주의: LLM 비결정적 응답으로 실패 가능 (retryCount: 2 적용)
```

### 4.2 LLM Client (LLM 클라이언트)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `llm-basic-chat` | 기본 대화 테스트 | LLM이 간단한 질문에 응답하는지 확인 |
| `llm-korean-chat` | 한국어 대화 테스트 | LLM이 한국어를 이해하고 응답하는지 확인 |
| `llm-streaming` | 스트리밍 응답 테스트 | 스트리밍 방식으로 응답을 받을 수 있는지 확인 |
| `llm-long-response` | 긴 응답 테스트 | LLM이 긴 응답을 생성할 수 있는지 확인 |
| `llm-code-generation` | 코드 생성 테스트 | LLM이 코드를 생성할 수 있는지 확인 |
| `llm-tool-calling` | Tool Calling 테스트 | LLM이 도구를 호출할 수 있는지 확인 |
| `llm-context-understanding` | 컨텍스트 이해 테스트 | LLM이 주어진 컨텍스트를 이해하는지 확인 |
| `llm-error-handling` | 에러 처리 테스트 | LLM이 에러 상황을 적절히 처리하는지 확인 |

#### llm-basic-chat
```
목적: LLM과 기본 대화가 가능한지 확인
동작:
  1. LLM에게 "1 + 1은 무엇인가요? 숫자만 대답해주세요." 질문
  2. LLM 응답 수신
기대값: 응답에 '2' 포함
확인방법:
  - verbose 모드에서 [Action Result]: 2 확인
  - 빠른 응답 시간 (보통 1초 이내)
```

#### llm-streaming
```
목적: LLM 스트리밍 응답이 정상 동작하는지 확인
동작:
  1. 스트리밍 모드로 "1부터 5까지 숫자 나열" 요청
  2. 청크 단위로 응답 수신
기대값: 응답이 '1.*2.*3.*4.*5' 패턴과 매칭
확인방법:
  - verbose 모드에서 스트리밍 출력 확인 (숫자가 순차적으로 나타남)
  - 최종 [Action Result]에 모든 숫자 포함
```

#### llm-context-understanding
```
목적: LLM이 제공된 컨텍스트를 이해하고 질문에 답하는지 확인
동작:
  1. 프롬프트에 프로젝트 정보 포함 (이름: OPEN-CLI, 버전: 1.0.0 등)
  2. "이 프로젝트의 이름은 무엇인가요?" 질문
기대값: 응답에 'OPEN-CLI' 포함
확인방법:
  - LLM이 컨텍스트에서 정보를 추출하여 정확히 답변
  - verbose 모드에서 응답 내용 확인
주의: LLM 비결정적 응답 (retryCount: 2 적용)
```

### 4.3 Plan & Execute (계획 및 실행)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `plan-generate-simple` | TODO 생성 (단순) | 단순 요청을 TODO로 분해하는지 확인 |
| `plan-generate-complex` | TODO 생성 (복잡) | 복잡한 요청을 여러 TODO로 분해하는지 확인 |
| `plan-todo-structure` | TODO 구조 검증 | TODO가 올바른 구조(id, title, description, status)를 가지는지 확인 |
| `plan-execute-file-read` | 파일 읽기 Plan | 파일 읽기 작업의 Plan 생성 확인 |
| `plan-execute-file-write` | 파일 쓰기 Plan | 파일 쓰기 작업의 Plan 생성 확인 |
| `plan-multi-step` | 다단계 Plan | 여러 단계 작업의 Plan 생성 확인 |
| `plan-dependency-handling` | TODO 의존성 | TODO 간 의존성 설정 확인 |

#### plan-generate-simple
```
목적: 단순한 요청을 TODO 리스트로 분해하는지 확인
동작:
  1. "package.json 파일을 읽고 프로젝트 이름을 알려주세요" 요청
  2. LLM이 작업을 TODO 리스트로 분해
기대값: 최소 1개 이상의 TODO 생성
확인방법:
  - verbose 모드에서 생성된 TODO 배열 확인
  - 각 TODO에 id, title, description 필드 존재
```

#### plan-generate-complex
```
목적: 복잡한 요청을 여러 TODO로 분해하는지 확인
동작:
  1. 4개의 하위 작업이 포함된 복잡한 요청 전달
     - src 폴더 구조 파악
     - package.json 의존성 확인
     - README.md 읽기
     - 프로젝트 요약 리포트 작성
  2. LLM이 각 작업을 별도 TODO로 분해
기대값: 최소 3개 이상의 TODO 생성
확인방법:
  - verbose 모드에서 TODO 배열 확인
  - 각 TODO가 원본 요청의 하위 작업과 대응
```

### 4.4 Agent Loop (에이전트 루프)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `agent-simple-task` | 단순 작업 테스트 | Agent Loop가 단순 작업을 완료하는지 확인 |
| `agent-file-creation` | 파일 생성 테스트 | Agent Loop가 파일을 생성하는지 확인 |
| `agent-context-gathering` | Context Gathering | Agent가 컨텍스트를 수집하는지 확인 |
| `agent-multi-step-task` | 다단계 작업 테스트 | Agent가 여러 단계 작업을 완료하는지 확인 |

#### agent-simple-task
```
목적: Agent Loop가 단순한 작업을 완료하는지 확인
동작:
  1. /tmp/open-cli-agent-test에 data.json 파일 생성
  2. Agent에게 TODO 전달: "data.json 파일을 읽고 프로젝트 이름 확인"
  3. Agent Loop 실행 (최대 3회 반복)
     - Context Gathering: 파일 읽기
     - Action: 결과 분석
     - Verification: 완료 확인
기대값: Agent가 결과를 반환 (null이 아님)
확인방법:
  - verbose 모드에서 Agent의 각 단계 출력 확인
  - 결과가 존재하는지 확인
```

#### agent-file-creation
```
목적: Agent Loop가 파일 생성 작업을 완료하는지 확인
동작:
  1. Agent에게 TODO 전달: "config.json 파일에 { "debug": true } 작성"
  2. Agent Loop 실행
  3. 생성된 파일 존재 및 내용 확인
기대값: config.json 파일이 생성되고 'debug' 문자열 포함
확인방법:
  - 파일 시스템에서 파일 존재 확인
  - 파일 내용에 'debug' 포함 확인
주의: LLM이 도구를 호출하지 않을 수 있음 (retryCount: 2 적용)
```

### 4.5 Session (세션 관리)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `session-save` | 세션 저장 테스트 | 세션을 저장할 수 있는지 확인 |
| `session-load` | 세션 로드 테스트 | 저장된 세션을 로드할 수 있는지 확인 |
| `session-list` | 세션 목록 조회 | 세션 목록을 조회할 수 있는지 확인 |
| `session-persistence` | 세션 영속성 | 저장/로드 후 데이터가 유지되는지 확인 |

#### session-persistence
```
목적: 세션 저장 후 로드했을 때 데이터가 정확히 유지되는지 확인
동작:
  1. 2개의 메시지가 포함된 세션 저장
     - user: "Persistence test message"
     - assistant: "Response message"
  2. 세션 목록에서 저장된 세션 찾기
  3. 세션 로드하여 메시지 확인
기대값:
  - 로드된 세션의 메시지 수 == 2
  - 첫 번째 메시지 내용이 정확히 일치
확인방법:
  - verbose 모드에서 저장된 sessionId 확인
  - 로드된 데이터의 messages 배열 확인
```

### 4.6 Config (설정 관리)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `config-read` | 설정 읽기 테스트 | 현재 설정을 읽을 수 있는지 확인 |
| `config-endpoints` | 엔드포인트 설정 | 엔드포인트가 올바르게 설정되어 있는지 확인 |
| `config-model-info` | 모델 정보 | 모델 정보가 올바르게 설정되어 있는지 확인 |
| `config-initialization` | ConfigManager 초기화 | ConfigManager가 올바르게 초기화되는지 확인 |
| `config-llm-client-creation` | LLM Client 생성 | 설정 기반 LLM Client 생성 확인 |

#### config-endpoints
```
목적: 엔드포인트 설정이 올바른 구조를 가지는지 확인
동작:
  1. config.endpoints 값 조회
  2. 첫 번째 엔드포인트의 구조 확인
기대값:
  - endpoints가 배열
  - 각 엔드포인트에 name, baseUrl, models 필드 존재
확인방법:
  - verbose 모드에서 엔드포인트 정보 출력 확인
  - 필수 필드 존재 여부 검증
```

#### config-llm-client-creation
```
목적: 설정을 기반으로 LLM Client를 생성하고 실제로 통신할 수 있는지 확인
동작:
  1. ConfigManager 초기화
  2. 첫 번째 엔드포인트 정보 획득
  3. LLMClient 인스턴스 생성
  4. 간단한 메시지 전송 ("Hi")
기대값: LLM으로부터 응답 수신 성공
확인방법:
  - verbose 모드에서 { success: true, responseReceived: true } 확인
  - 엔드포인트 미설정 시 경고 메시지 출력
```

### 4.7 Local RAG (로컬 문서 검색)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `rag-simple-search` | 단순 문서 검색 | 로컬 문서에서 키워드를 검색하는지 확인 |
| `rag-code-search` | 코드 관련 검색 | 코드 관련 문서를 검색하는지 확인 |
| `rag-multi-file-search` | 다중 파일 검색 | 여러 문서에서 관련 정보를 검색하는지 확인 |
| `rag-project-docs` | 프로젝트 문서 검색 | 실제 프로젝트 문서에서 검색하는지 확인 |

#### rag-simple-search
```
목적: 로컬 문서에서 키워드 기반 검색이 동작하는지 확인
동작:
  1. 테스트 문서 생성 (guide.md - 설치 방법, 사용법 등 포함)
  2. "설치 방법" 키워드로 검색
기대값: 검색 결과가 비어있지 않음
확인방법:
  - verbose 모드에서 검색 결과 확인
  - 결과에 관련 내용 포함
```

### 4.8 Integration (통합 테스트)

| ID | 테스트명 | 목적 |
|----|----------|------|
| `integration-full-workflow` | 전체 워크플로우 | LLM → Plan → Execute → Verify 전체 흐름 테스트 |
| `integration-file-operations` | 파일 작업 연계 | 읽기 → 변환 → 쓰기 연계 동작 테스트 |
| `integration-session-workflow` | 세션 워크플로우 | 대화 → 저장 → 로드 → 계속 흐름 테스트 |
| `integration-error-recovery` | 에러 복구 | 에러 발생 후 정상 복구 테스트 |
| `integration-concurrent-operations` | 동시 작업 | 여러 파일 작업 동시 처리 테스트 |
| `integration-llm-tool-chain` | LLM Tool Chain | LLM이 여러 도구를 연속 사용하는지 테스트 |

#### integration-full-workflow
```
목적: OPEN-CLI의 전체 흐름이 정상 동작하는지 확인
동작:
  1. 테스트 파일 생성 (project-info.json)
  2. LLM에게 파일 읽기 요청 → 도구 호출 → 응답
  3. Plan 생성 요청 → TODO 리스트 생성
기대값:
  - LLM 응답에 'Integration Test Project' 포함
  - 최소 1개 이상의 TODO 생성
확인방법:
  - verbose 모드에서 각 단계의 결과 확인
  - 전체 흐름이 끊김 없이 진행
주의: LLM 비결정적 응답 (retryCount: 2 적용)
```

#### integration-error-recovery
```
목적: 에러 발생 후 시스템이 정상 복구되는지 확인
동작:
  1. 존재하지 않는 파일 읽기 시도 (/nonexistent/path/file.txt)
  2. executeReadFile이 { success: false, error: ... } 반환
  3. 정상 파일 읽기 (package.json)
기대값:
  - 첫 번째 단계: error === true
  - 두 번째 단계: 파일 내용에 'open-cli' 포함
확인방법:
  - 첫 번째 단계에서 에러가 throw되지 않고 처리됨
  - 두 번째 단계가 정상 실행됨
```

#### integration-llm-tool-chain
```
목적: LLM이 여러 도구를 연속으로 사용하는지 확인
동작:
  1. config.json 파일 생성 (database: mongodb 포함)
  2. LLM에게 복합 요청: "디렉토리 목록 확인 → config.json 읽기 → 데이터베이스 종류 알려주기"
  3. LLM이 list_files → read_file 순서로 도구 호출
기대값: LLM 응답에 'mongodb' 포함
확인방법:
  - verbose 모드에서 LLM의 도구 호출 순서 확인
  - 최종 응답에 올바른 정보 포함
```

### 4.9 비결정적 테스트와 재시도

LLM 기반 테스트는 **비결정적(non-deterministic)** 특성을 가집니다.
동일한 입력에 대해 다른 출력이 나올 수 있습니다.

#### 비결정적 테스트 예시
- `llm-context-understanding`: LLM이 "OPEN-CLI" 대신 "OPEN‑CLI" (다른 하이픈)로 응답
- `file-tools-llm-write`: LLM이 도구를 호출하지 않고 "파일을 생성했습니다"라고만 응답
- `agent-file-creation`: Agent가 파일 생성 도구를 호출하지 않음

#### 재시도 설정
```typescript
{
  id: 'llm-context-understanding',
  timeout: 300000,
  retryCount: 2,  // 실패 시 최대 2번 재시도
  // ...
}
```

#### 재시도가 적용된 테스트
| 테스트 ID | 재시도 횟수 | 이유 |
|-----------|-------------|------|
| `file-tools-llm-read` | 2 | LLM 응답 형식 변동 |
| `file-tools-llm-write` | 2 | LLM이 도구를 호출하지 않을 수 있음 |
| `llm-context-understanding` | 2 | LLM 응답 형식 변동 |
| `agent-file-creation` | 2 | Agent가 도구를 호출하지 않을 수 있음 |
| `integration-full-workflow` | 2 | LLM 응답 형식 변동 |

---

## 5. 테스트 출력 이해하기

### 시나리오 실행 출력

```
┌─ [file-tools] 파일 쓰기 테스트 (file-tools-write)
│ write_file 도구로 파일을 생성하고 내용을 작성합니다.
│
│  ✓ Setup
│  ✓ 파일 쓰기
│  ✓ 파일 존재 확인
│  ✓ Teardown
│
└─ ✓ PASSED 1234ms
```

### 상태 아이콘

| 아이콘 | 의미 |
|--------|------|
| ✓ | 성공 |
| ✗ | 실패 |
| ○ | 실행 중 / 대기 |
| ↻ | 재시도 중 |

### Verbose 모드 출력

```bash
npm run test:e2e -- --verbose
```

verbose 모드에서는 각 단계의 결과가 자세히 표시됩니다:

```
┌─ [llm-client] 컨텍스트 이해 테스트 (llm-context-understanding)
│ LLM이 주어진 컨텍스트를 이해하는지 테스트합니다.
│  ○ 컨텍스트 기반 질문  [Action Result]: 프로젝트 이름은 **OPEN-CLI**입니다.
│  ✓ 컨텍스트 기반 질문
│
└─ ✓ PASSED 1284ms
```

### 재시도 출력

```
┌─ [file-tools] LLM을 통한 파일 읽기 테스트 (file-tools-llm-read)
│  ✗ LLM에게 파일 읽기 요청 - Validation failed
│  ↻ 재시도 1/2...
│  ✓ LLM에게 파일 읽기 요청
│
└─ ✓ PASSED 8234ms
```

### 실패 시 출력

```
┌─ [llm-client] 기본 대화 테스트 (llm-basic-chat)
│ LLM과 기본적인 대화가 가능한지 테스트합니다.
│
│  ✗ 간단한 질문 - Timeout after 60000ms
│
└─ ✗ FAILED 60001ms
   Error: Timeout after 60000ms

실패한 테스트:
  ✗ 기본 대화 테스트
    Timeout after 60000ms
    - 간단한 질문: Timeout after 60000ms
```

### 테스트 결과 요약

```
════════════════════════════════════════════════════════════
                      테스트 결과 요약
════════════════════════════════════════════════════════════

  ████████████████████████████████████████

  Total:   44
  Passed:  42
  Failed:  2

  실패한 테스트:
    ✗ LLM을 통한 파일 쓰기 테스트 (file-tools-llm-write)
    ✗ Agent Loop 파일 생성 테스트 (agent-file-creation)
```

---

## 6. 새 테스트 추가하기

### 6.1 시나리오 파일 위치

```
test/e2e/scenarios/
├── file-tools.ts
├── llm-client.ts
├── plan-execute.ts
├── agent-loop.ts
├── session.ts
├── config.ts
├── local-rag.ts
├── integration.ts
└── index.ts
```

### 6.2 시나리오 구조

```typescript
import { TestScenario } from '../types.js';

export const myScenarios: TestScenario[] = [
  {
    id: 'my-test-id',           // 고유 ID
    name: '테스트 이름',          // 표시 이름
    description: '테스트 설명',   // 설명
    category: 'integration',    // 카테고리
    enabled: true,              // 활성화 여부
    timeout: 60000,             // 타임아웃 (ms)

    // 테스트 전 설정 (선택)
    setup: async () => {
      // 테스트 환경 설정
    },

    // 테스트 후 정리 (선택)
    teardown: async () => {
      // 테스트 환경 정리
    },

    // 테스트 단계
    steps: [
      {
        name: '단계 이름',
        action: { type: 'llm_chat', prompt: '테스트 질문' },
        validation: { type: 'contains', value: '예상 응답' },
      },
    ],
  },
];
```

### 6.3 Action 타입

| 타입 | 설명 | 파라미터 |
|------|------|----------|
| `llm_chat` | LLM 대화 | prompt, useTools? |
| `llm_stream` | 스트리밍 대화 | prompt |
| `file_read` | 파일 읽기 | path |
| `file_write` | 파일 쓰기 | path, content |
| `file_list` | 디렉토리 목록 | directory |
| `file_find` | 파일 검색 | pattern, directory? |
| `plan_generate` | Plan 생성 | userRequest |
| `agent_loop` | Agent Loop | todo, maxIterations? |
| `docs_search` | 문서 검색 | query, searchPath? |
| `session_save` | 세션 저장 | sessionId? |
| `session_load` | 세션 로드 | sessionId |
| `session_list` | 세션 목록 | - |
| `config_get` | 설정 조회 | key? |
| `custom` | 커스텀 함수 | fn |

### 6.4 Validation 타입

| 타입 | 설명 | 파라미터 |
|------|------|----------|
| `exists` | 결과가 존재 | - |
| `not_empty` | 빈 값 아님 | - |
| `contains` | 문자열 포함 | value |
| `not_contains` | 문자열 미포함 | value |
| `equals` | 값 동일 | value |
| `matches` | 정규식 매칭 | pattern |
| `is_array` | 배열인지 | minLength? |
| `is_object` | 객체인지 | hasKeys? |
| `file_exists` | 파일 존재 | path |
| `llm_response_valid` | 유효한 LLM 응답 | - |
| `todos_generated` | TODO 생성됨 | minCount? |
| `custom` | 커스텀 검증 | fn |

### 6.5 시나리오 등록

`test/e2e/scenarios/index.ts`에 추가:

```typescript
export { myScenarios } from './my-scenarios.js';

import { myScenarios } from './my-scenarios.js';

export function getAllScenarios(): TestScenario[] {
  return [
    // ... 기존 시나리오
    ...myScenarios,
  ];
}
```

---

## 7. 문제 해결

### Q: 테스트가 타임아웃됩니다

**A:** LLM 응답 시간이 길 수 있습니다. 시나리오의 `timeout`을 늘려보세요.

```typescript
{
  timeout: 180000, // 3분
  // ...
}
```

### Q: LLM 연결 에러가 발생합니다

**A:** 설정을 확인하세요.

```bash
# OPEN-CLI 실행
open

# UI에서 설정 확인
/settings → LLMs

# 또는 모델 전환
/model
```

### Q: 특정 테스트만 실행하고 싶습니다

**A:** `--filter` 옵션을 사용하세요.

```bash
npm run test:e2e -- --filter llm-client
npm run test:e2e -- --filter file-tools-write  # ID로 필터
```

### Q: 상세 로그를 보고 싶습니다

**A:** `--verbose` 옵션을 사용하세요.

```bash
npm run test:e2e -- --verbose
```

### Q: 테스트 파일을 정리하지 못하고 종료됐습니다

**A:** 임시 파일을 수동으로 삭제하세요.

```bash
rm -rf /tmp/open-cli-*
```

---

## PR 체크리스트

PR 생성 전 다음을 확인하세요:

- [ ] `npm run lint` 통과
- [ ] `npm run test:e2e` 통과
- [ ] 새 기능에 테스트 시나리오 추가 (해당 시)
- [ ] 기존 테스트가 깨지지 않음

```bash
# 한 번에 검증
npm run prepr
```

---

## 8. Demo 테스트 시나리오 상세

데모 테스트는 Plan & Execute 시스템의 핵심 기능을 검증합니다.

### 8.1 demo-simple (Mock LLM 기반 테스트)

```
파일: test/e2e/scenarios/demos.ts
ID: demo-simple
카테고리: demos
타임아웃: 30000ms (30초)
```

**목적**: Mock LLM을 사용하여 Plan & Execute의 기본 동작을 검증합니다. 실제 LLM 없이도 시스템의 핵심 흐름을 테스트할 수 있습니다.

**테스트 로직**:

```typescript
// 1. SimpleMockLLM 클래스 - 실제 LLM 대신 사용
class SimpleMockLLM extends LLMClient {
  async sendMessage(): Promise<string> {
    // JSON 형태의 성공 응답 반환
    return JSON.stringify({
      status: 'success',
      result: `Task ${this.taskNumber} completed successfully!`,
      log_entries: [...],
      files_changed: [...],
    });
  }
}

// 2. 테스트 계획 (3개 태스크)
const testPlan = [
  { id: 'task-1', title: 'Setup project structure', dependencies: [] },
  { id: 'task-2', title: 'Implement core functionality', dependencies: ['task-1'] },
  { id: 'task-3', title: 'Add tests', dependencies: ['task-2'] },
];

// 3. 실행 및 결과 검증
const summary = await orchestrator.executePhase(testPlan);
```

**검증 조건**:
- ✅ `planSize === 3` (3개 태스크 계획)
- ✅ `logsCount > 0` (로그가 캡처됨)

**사용 시점**: LLM 서버 없이 빠른 통합 테스트가 필요할 때

---

### 8.2 demo-logger (로깅 시스템 테스트)

```
파일: test/e2e/scenarios/demos.ts
ID: demo-logger
카테고리: demos
타임아웃: 10000ms (10초)
```

**목적**: 로깅 시스템(`src/utils/logger.ts`)의 다양한 기능이 정상 동작하는지 검증합니다.

**테스트 로직**:

```typescript
// 테스트하는 로거 기능들:
logger.info('Test info message');            // 정보 로깅
logger.debug('Test debug message', {...});   // 디버그 로깅 (데이터 포함)
logger.warn('Test warning', {...});          // 경고 로깅
logger.enter('testFunction', {...});         // 함수 진입 추적
logger.flow('Test flow step');               // 흐름 단계 추적
logger.exit('testFunction', {...});          // 함수 종료 추적
logger.vars({ name: 'testVar', ... });       // 변수 추적
logger.state('State change', 'old', 'new');  // 상태 변경 추적

// 타이머 기능
logger.startTimer('test-timer');
await new Promise(resolve => setTimeout(resolve, 10));
const elapsed = logger.endTimer('test-timer');
```

**검증 조건**:
- ✅ `functionsUsed` 배열에 모든 로거 함수 포함
- ✅ `timerWorked === true` (타이머가 0보다 큰 값 반환)

**사용 시점**: 로깅 시스템의 기능이 깨지지 않았는지 확인할 때

---

### 8.3 demo-real-llm (실제 LLM Plan & Execute)

```
파일: test/e2e/scenarios/demos.ts
ID: demo-real-llm
카테고리: demos
타임아웃: 180000ms (3분)
```

**목적**: 실제 LLM 엔드포인트를 사용하여 전체 Plan & Execute 흐름을 검증합니다.

**테스트 로직**:

```typescript
// 1. 실제 LLM 클라이언트 사용
const llmClient = new LLMClient();
const orchestrator = new PlanExecuteOrchestrator(llmClient, {
  maxDebugAttempts: 3,    // 실패 시 최대 3회 재시도
  taskTimeout: 60000,      // 태스크당 1분 타임아웃
  hitl: { enabled: true, approvePlan: true },
});

// 2. 이벤트 리스너 등록
orchestrator.on('planCreated', () => { planCreated = true; });
orchestrator.on('todoCompleted', () => { tasksCompleted++; });

// 3. 실제 요청 실행
const summary = await orchestrator.execute(
  'Create a simple calculator module with add and subtract functions'
);
```

**이벤트 흐름**:
1. `planCreated` - LLM이 태스크 계획 생성
2. `todoStarted` - 각 태스크 시작
3. `todoCompleted` - 각 태스크 완료
4. 최종 `summary` 반환

**검증 조건**:
- ✅ `planCreated === true` (계획이 생성됨)
- ✅ `completedTasks >= 1` (최소 1개 태스크 완료)

**사용 시점**: LLM 서버와의 실제 통합 테스트, 전체 워크플로우 검증

---

## 9. Agno 코드 생성 평가 시나리오 상세

Agno 평가 테스트는 LLM의 코드 생성 품질을 점수화하여 검증합니다.

### 9.1 점수 기반 평가 시스템

```typescript
// 임계값 설정 (test/e2e/scenarios/agno-evaluation.ts)
const PASS_THRESHOLD = 50;   // 50% 이상 → 완전 통과
const WARN_THRESHOLD = 30;   // 30% 이상 → 경고와 함께 통과
                              // 30% 미만 → 실패
```

**점수 계산 로직** (100점 만점):

| 항목 | 배점 | 설명 |
|------|------|------|
| 코드 블록 생성 | 30점 | Python 코드 블록이 1개 이상 생성되었는지 |
| 문법 유효성 | 40점 | 생성된 코드의 Python 문법이 올바른지 |
| Import 유효성 | 30점 | import 구문이 올바른 형식인지 |

```typescript
// 점수 계산 예시
let score = 0;
if (codeBlocks.length > 0) score += 30;
score += (syntaxValidCount / codeBlocks.length) * 40;
score += (importValidCount / codeBlocks.length) * 30;
```

### 9.2 agno-evaluation-quick (빠른 평가)

```
파일: test/e2e/scenarios/agno-evaluation.ts
ID: agno-evaluation-quick
카테고리: agno-eval
타임아웃: 300000ms (5분)
```

**목적**: 테스트 케이스 1-2번을 사용하여 LLM의 Agno 코드 생성 품질을 빠르게 평가합니다.

**테스트 로직**:

```typescript
// 1. LLMClient 직접 생성 (subprocess 대신)
const { createLLMClient } = await import('../../../src/core/llm-client.js');
const llmClient = createLLMClient();

// 2. 테스트 케이스 로드 (test/fixtures/prompts/agno_prompts.md)
const allTestCases = await parseTestCases(promptsPath);
const testCases = selectTestCases(allTestCases, [1, 2]);

// 3. 각 테스트 케이스 평가
for (const testCase of testCases) {
  const result = await evaluateTestCase(testCase, llmClient);
  // result.score: 0-100
}

// 4. 전체 통계 계산
const successRate = (passedCount / totalCount) * 100;
```

**evaluateTestCase() 함수 상세**:

```typescript
async function evaluateTestCase(testCase, llmClient) {
  // 시스템 프롬프트
  const systemPrompt = `You are an expert Python developer...`;

  // LLM 호출 (sendMessage 메서드 사용)
  const responseText = await llmClient.sendMessage(testCase.prompt, systemPrompt);

  // 코드 블록 추출
  const codeBlocks = extractCodeBlocks(responseText);

  // 각 코드 블록 검증
  for (const code of codeBlocks) {
    const validation = await validateCode(code);
    // validation.syntaxValid, validation.importsValid
  }

  // 점수 계산 및 반환
  return { score, passed: score >= WARN_THRESHOLD };
}
```

**코드 블록 추출 정규식**:

```typescript
function extractCodeBlocks(response: string): string[] {
  const codeBlockRegex = /```(?:python|py)\n([\s\S]*?)```/gm;
  // ```python 또는 ```py로 시작하는 코드 블록 추출
}
```

**검증 조건**:
- ✅ `successRate >= 50%` → `✅ Agno evaluation PASSED`
- ✅ `successRate >= 30%` → `⚠️ Agno evaluation PASSED with warning`
- ❌ `successRate < 30%` → `❌ Agno evaluation FAILED`

**출력 예시**:
```
📝 Evaluating Test Case 1... Score: 100/100, Code blocks: 2
📝 Evaluating Test Case 2... Score: 100/100, Code blocks: 1
✅ Agno evaluation PASSED: 100.0% success, avg score: 100.0/100
```

---

### 9.3 agno-evaluation-init (시스템 초기화)

```
파일: test/e2e/scenarios/agno-evaluation.ts
ID: agno-evaluation-init
카테고리: agno-eval
타임아웃: 30000ms (30초)
```

**목적**: 테스트 케이스 파서(`parseTestCases`)가 `agno_prompts.md` 파일을 올바르게 파싱하는지 검증합니다.

**테스트 로직**:

```typescript
const promptsPath = path.join(process.cwd(), 'test/fixtures/prompts', 'agno_prompts.md');
const testCases = await parseTestCases(promptsPath);

return {
  testCasesFound: testCases.length,          // 파싱된 테스트 케이스 수
  hasPrompts: testCases.every(tc => tc.prompt?.length > 0),  // 모든 케이스에 프롬프트 존재
  hasIds: testCases.every(tc => typeof tc.id === 'number'),  // 모든 케이스에 ID 존재
};
```

**검증 조건**:
- ✅ `testCasesFound > 0` (테스트 케이스가 1개 이상 파싱됨)
- ✅ `hasPrompts === true` (모든 케이스에 프롬프트 존재)
- ✅ `hasIds === true` (모든 케이스에 숫자 ID 존재)

**사용 시점**: 테스트 데이터 파일이 손상되지 않았는지 확인

---

### 9.4 agno-code-validator (코드 검증기)

```
파일: test/e2e/scenarios/agno-evaluation.ts
ID: agno-code-validator
카테고리: agno-eval
타임아웃: 30000ms (30초)
```

**목적**: 코드 검증기(`validateCode`)가 Python 코드의 문법 오류를 올바르게 감지하는지 검증합니다.

**테스트 로직**:

```typescript
// 유효한 Python 코드
const validPython = `
def hello():
    print("Hello, World!")

if __name__ == "__main__":
    hello()
`;

// 문법 오류가 있는 Python 코드
const invalidPython = `
def hello(
    print("Hello, World!")
`;  // 괄호 닫힘 누락

const validResult = await validateCode(validPython);
const invalidResult = await validateCode(invalidPython);
```

**검증 조건**:
- ✅ 유효한 코드: `hasCode=true`, `syntaxValid=true`
- ✅ 무효한 코드: `hasCode=true`, `syntaxValid=false`, `hasErrors=true`

**사용 시점**: 코드 검증 로직이 올바르게 동작하는지 확인

---

### 9.5 agno-single-generation (단일 코드 생성)

```
파일: test/e2e/scenarios/agno-evaluation.ts
ID: agno-single-generation
카테고리: agno-eval
타임아웃: 120000ms (2분)
```

**목적**: LLM에게 단일 Agno Agent 코드 생성을 요청하고 품질을 점수로 평가합니다.

**테스트 로직**:

```typescript
// llm_chat 액션 사용
action: {
  type: 'llm_chat',
  prompt: `Python으로 간단한 Agno Agent를 만들어주세요.
요구사항:
1. agno 라이브러리의 Agent 클래스 사용
2. OpenAI 모델 사용
3. 간단한 인사 기능 구현

완전한 실행 가능한 코드를 \`\`\`python 블록으로 제공해주세요.`,
  useTools: false,
}

// 커스텀 검증
validation: {
  type: 'custom',
  fn: async (result) => {
    const response = result?.content || result || '';
    const codeBlocks = extractCodeBlocks(response);

    // 코드 블록이 없으면 경고
    if (codeBlocks.length === 0) {
      console.log(`⚠️ No Python code blocks found`);
      return response.length > 50;  // 최소 응답 길이 확인
    }

    // 첫 번째 코드 블록 검증 및 점수 계산
    const validation = await validateCode(codeBlocks[0]);
    let score = 0;
    if (codeBlocks.length > 0) score += 30;
    if (validation.syntaxValid) score += 40;
    if (validation.importsValid) score += 30;

    console.log(`📊 Code Generation Score: ${score}/100`);
    return score >= WARN_THRESHOLD;  // 30점 이상이면 통과
  },
}
```

**출력 예시**:
```
📊 Code Generation Score: 100/100
   - Code blocks: 1
   - Syntax valid: true
   - Imports valid: true
```

**검증 조건**:
- ✅ `score >= 30` (30점 이상이면 통과)

**사용 시점**: 단일 코드 생성 요청에 대한 LLM 응답 품질 확인

---

## 10. Real LLM 테스트

### 빠른 시작

```bash
# 빠른 테스트 (1개 시나리오)
npm run test:real-llm

# 전체 테스트 (4개 시나리오)
TEST_MODE=full npm run test:real-llm

# 상세 로그
VERBOSE=true npm run test:real-llm
```

### 테스트 시나리오

| 시나리오 | 카테고리 | 설명 |
|----------|----------|------|
| Simple Calculator | SIMPLE | 기본 순차 실행 |
| Todo List Manager | SIMPLE | CRUD 작업 |
| User Authentication | MEDIUM | JWT, bcrypt 의존성 |
| REST API with Express | COMPLEX | 멀티스텝 프로젝트 |

### 결과 해석

**성공 지표:**
- ✅ Plan created - LLM이 태스크 계획 생성
- ✅ All tasks completed - 모든 태스크 완료
- ✅ Log entries captured - 구조화된 로그 캡처

**경고 신호:**
- ⚠️ Plan size outside range - 태스크 수 비정상
- ⚠️ Debug attempts - 재시도 필요
- ⚠️ Long duration - 예상 시간 초과

---

## 12. 테스트 프롬프트 예시

### 순차 태스크 (기본)

```
Create a simple calculator with add, subtract, multiply, and divide functions
```
- 예상: 3-4개 태스크
- 테스트: 순차 실행, 컨텍스트 전달

### 의존성 태스크

```
Build a REST API with Express that includes:
- Database connection
- User model
- CRUD endpoints
- Error handling middleware
```
- 예상: 5-6개 태스크 (의존성 포함)
- 테스트: 의존성 순서, previous_context 사용

### 에러 처리 테스트

```
Implement a type-safe HTTP client with:
- Generic request/response types
- Error handling
- Retry logic
- Request interceptors
```
- 예상: 4-5개 태스크, Debug 모드 트리거 가능
- 테스트: 에러 감지, Debug 워크플로우

---

## 13. Agno Agent 코드 생성 평가 시스템 (CLI)

별도의 CLI를 통해 Agno Agent의 코드 생성 능력을 더 자세히 평가할 수 있습니다.

### 파일 위치

```
test/
├── evaluation/                    # 평가 시스템 코드
│   ├── test-case-parser.ts       # agno_prompts.md 파싱
│   ├── subprocess-executor.ts     # 'open chat' 명령 실행
│   ├── code-validator.ts          # 코드 검증 로직
│   ├── report-generator.ts        # 결과 리포트 생성
│   ├── evaluator.ts               # 메인 orchestrator
│   └── run-evaluation.ts          # CLI 실행 스크립트
├── fixtures/prompts/
│   └── agno_prompts.md            # 테스트 케이스 프롬프트 데이터
└── demos/                         # 데모 스크립트
    ├── demo-hitl.ts               # HITL 데모
    ├── simple-demo.ts             # 간단한 P&E 데모
    ├── test-plan-execute.ts       # Real LLM 테스트
    └── logger-demo.ts             # 로깅 데모
```

### 평가 기준

1. **Docs Search 사용 여부**: 코드 생성 시 문서 검색 기능 활용 확인
2. **Import 구문 검증**: 생성된 코드의 import 구문이 올바른지 검증
3. **문법 에러 검증**: Python/TypeScript 문법 에러가 없는지 확인
4. **코드 생성 여부**: 마크다운 코드 블록이 실제로 생성되었는지 확인

### 사용법

```bash
# 전체 테스트 실행
npm run evaluate

# 특정 테스트만 실행
npm run evaluate -- --test 1,2,3

# 빠른 테스트 (1-3번 + JSON 리포트)
npm run evaluate:quick

# 타임아웃 설정 (밀리초)
npm run evaluate -- --timeout 600000

# JSON 리포트 생성
npm run evaluate -- --format json

# 마크다운 + JSON 둘 다 생성
npm run evaluate -- --format both
```

### CLI 옵션

| 옵션 | 축약형 | 설명 | 기본값 |
|------|--------|------|--------|
| `--test` | `-t` | 실행할 테스트 케이스 ID (쉼표 구분) | 모든 테스트 |
| `--timeout` | - | 실행 타임아웃 (밀리초) | 300000 (5분) |
| `--format` | `-f` | 리포트 포맷 (markdown, json, both) | markdown |
| `--output` | `-o` | 리포트 출력 디렉토리 | evaluation-reports/ |
| `--help` | `-h` | 도움말 표시 | - |

### 성공 조건

테스트 케이스가 성공하려면 다음을 **모두** 만족해야 합니다:

- ✅ Subprocess 정상 종료 (exit code 0)
- ✅ 최소 1개 이상의 코드 블록 생성
- ✅ Docs search 기능 사용
- ✅ 모든 코드 블록의 문법이 유효
- ✅ 모든 코드 블록의 import 구문이 유효

### 리포트 예시

```markdown
# Agno Agent Code Generation Evaluation Report

**Generated**: 2025-01-26 10:30:45

## Summary
- **Total Tests**: 10
- **Passed**: 7 (70.0%)
- **Failed**: 3 (30.0%)

### Metrics
- **Average Duration**: 45.23s
- **Docs Search Usage**: 80.0%
- **Code Generation Rate**: 90.0%
- **Syntax Validity Rate**: 70.0%
- **Import Validity Rate**: 75.0%
```

---

## 14. 데모 스크립트

### Simple Demo (기본)

```bash
npm run demo
```

Plan & Execute의 기본 동작을 보여주는 데모입니다.

### HITL Demo

```bash
npm run demo:hitl
```

Human-in-the-Loop 승인 흐름을 실제로 체험해볼 수 있습니다.

### Real LLM Test

```bash
# 빠른 테스트
npm run test:real-llm

# 전체 테스트
TEST_MODE=full npm run test:real-llm

# 상세 로그
VERBOSE=true npm run test:real-llm
```

실제 LLM 엔드포인트를 사용한 Plan & Execute 테스트입니다.

### Logger Demo

```bash
npm run demo:logger
```

로깅 시스템의 다양한 기능을 보여주는 데모입니다.

---

**질문이 있으면 GitHub Issues를 이용해주세요!**
