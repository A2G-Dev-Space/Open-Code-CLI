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
  ...

════════════════════════════════════════════════════════════
                        테스트 결과 요약
════════════════════════════════════════════════════════════

  ████████████████████████████████████████

  Total:   45
  Passed:  45
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

### agent-loop (Agent Loop)
- 단순 작업 실행
- 파일 생성 작업
- Context Gathering
- 다단계 작업

### session (세션 관리)
- 세션 저장
- 세션 로드
- 세션 목록 조회
- 영속성 검증

### config (설정 관리)
- 설정 읽기
- 엔드포인트 확인
- 모델 정보 확인
- LLM Client 생성

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
# 설정 확인
open config show

# 재설정
open config init
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

**질문이 있으면 GitHub Issues를 이용해주세요!**
