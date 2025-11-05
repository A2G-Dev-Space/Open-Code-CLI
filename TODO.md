# OPEN-CLI TODO List

**프로젝트 전체 TODO 및 구현 로드맵**

이 문서는 OPEN-CLI의 모든 작업을 우선순위별로 정리하고, 관련 설계 문서 링크를 포함합니다.

---

## 📚 주요 문서

| 문서 | 설명 | 링크 |
|------|------|------|
| **README.md** | 프로젝트 개요 및 빠른 시작 가이드 | [README.md](./README.md) |
| **PROGRESS.md** | 개발 진행 상황 및 상세 구현 가이드 | [PROGRESS.md](./PROGRESS.md) |
| **BLUEPRINT.md** | 전체 UI/UX 디자인 청사진 (50+ 모킹) | [BLUEPRINT.md](./BLUEPRINT.md) |
| **PROJECT_OVERVIEW.md** | 프로젝트 전체 아키텍처 문서 | [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) |
| **TODO.md** | 이 문서 - 실행 계획 및 체크리스트 | [TODO.md](./TODO.md) |

---

## 🎯 전체 우선순위 (Overview)

```
Priority 0 (최우선) - 2-3주
├─ 1. GitHub Release Auto-Update System
└─ 2. Plan-and-Execute 아키텍처

Priority 1 (중요) - 1-2주
├─ 3. Model Compatibility Layer (gpt-oss-120b/20b)
├─ 4. Docs Search Agent Tool
├─ 5. Tool 사용 내역 UI
├─ 6. 하단 상태바
└─ 7. ASCII 로고 및 Welcome 화면

Priority 2 (보통) - 1주
├─ 8. Tips/Help 섹션
└─ 9. 입력 힌트 및 자동완성

Priority 3 (낮음)
└─ 10. 메시지 타입별 스타일링 강화
```

---

## 🚨 Priority 0: 최우선 과제 (2-3주)

### 1. GitHub Release Auto-Update System

**목표**: `open` 명령어 실행 시 자동으로 새 버전 체크 및 업데이트

**📖 설계 문서**:
- **PROGRESS.md**: [Section 1.8](./PROGRESS.md#18-github-release-auto-update-system-p0--최우선-과제) (Lines 150-891)
- **BLUEPRINT.md**: [Section 0 - Auto-Update UI](./BLUEPRINT.md#0-auto-update-ui-p0---최우선-과제-) (Lines 182-704)

**예상 소요 시간**: 3-5일

#### Phase 1: Version Checking (1일)

- [ ] **1.1 AutoUpdater 클래스 생성** (`src/core/auto-updater.ts`)
  - [ ] GitHub API 통신 (`/repos/{owner}/{repo}/releases/latest`)
  - [ ] 현재 버전 읽기 (package.json)
  - [ ] Semantic versioning 비교 로직
  - [ ] 5초 타임아웃 설정 (오프라인 대응)
  - 📖 구현 가이드: [PROGRESS.md:215-346](./PROGRESS.md#1821-version-checking)

- [ ] **1.2 타입 정의** (`src/types/index.ts`)
  - [ ] `ReleaseInfo` 인터페이스
  - [ ] `UpdateCheckResult` 인터페이스
  - [ ] `AutoUpdateConfig` 인터페이스
  - 📖 타입 정의: [PROGRESS.md:225-249](./PROGRESS.md#1821-version-checking)

- [ ] **1.3 테스트**
  - [ ] GitHub API 정상 호출 확인
  - [ ] 버전 비교 로직 테스트 (1.0.0 vs 1.0.1, 1.0.0 vs 0.9.0)
  - [ ] 타임아웃 테스트 (오프라인 환경)

#### Phase 2: Update Mechanism (2일)

- [ ] **2.1 Git Pull 방식 구현**
  - [ ] `performGitUpdate()` 메서드
  - [ ] Git 상태 확인 (로컬 변경사항 체크)
  - [ ] `git pull origin main` 실행
  - [ ] `npm install` 실행
  - [ ] `npm run build` 실행
  - 📖 구현 가이드: [PROGRESS.md:354-387](./PROGRESS.md#1823-update-mechanism)

- [ ] **2.2 Tarball 다운로드 방식 구현** (선택사항)
  - [ ] 임시 폴더 생성
  - [ ] Tarball 다운로드 (axios stream)
  - [ ] 압축 해제
  - [ ] 파일 교체 (src, dist, package.json 등)
  - 📖 구현 가이드: [PROGRESS.md:390-465](./PROGRESS.md#1823-update-mechanism)

- [ ] **2.3 Backup & Rollback**
  - [ ] BackupManager 클래스 생성 (`src/core/backup-manager.ts`)
  - [ ] 백업 생성 함수
  - [ ] 롤백 함수
  - [ ] 빌드 실패 시 자동 롤백
  - 📖 에러 처리: [PROGRESS.md:578-637](./PROGRESS.md#1825-error-handling--rollback)

#### Phase 3: UI Integration (1일)

- [ ] **3.1 Update UI 컴포넌트** (`src/ui/components/UpdateNotification.tsx`)
  - [ ] `UpdateNotification` 컴포넌트 (알림)
  - [ ] `UpdateProgress` 컴포넌트 (진행 상황)
  - [ ] 스피너 애니메이션 (⣾⣽⣻⢿⡿⣟⣯⣷)
  - [ ] 진행 바 (█░)
  - 📖 UI 가이드: [PROGRESS.md:470-574](./PROGRESS.md#1824-uiux-during-update)
  - 📖 UI 모킹: [BLUEPRINT.md:182-704](./BLUEPRINT.md#0-auto-update-ui-p0---최우선-과제-)

- [ ] **3.2 CLI 시작 시 통합** (`src/cli.ts`)
  - [ ] `checkAndUpdate()` 함수 추가
  - [ ] `--no-update` 플래그 처리
  - [ ] 사용자 입력 처리 (Y/n)
  - [ ] 업데이트 완료 후 재시작
  - 📖 통합 가이드: [PROGRESS.md:641-713](./PROGRESS.md#1826-integration-with-cli-startup)

#### Phase 4: Configuration & Testing (1일)

- [ ] **4.1 설정 추가** (`config-manager.ts`)
  - [ ] `autoUpdate` 섹션 추가
  - [ ] 기본값 설정 (enabled: true, checkOnStartup: true)
  - [ ] 설정 읽기/쓰기 메서드
  - 📖 설정 가이드: [PROGRESS.md:726-749](./PROGRESS.md#1827-configuration-options)

- [ ] **4.2 전체 테스트**
  - [ ] ✅ 정상 업데이트 플로우
  - [ ] ✅ 오프라인 환경 (타임아웃)
  - [ ] ✅ 업데이트 거부
  - [ ] ✅ 업데이트 체크 스킵 (--no-update)
  - [ ] ✅ 빌드 실패 롤백
  - 📖 테스트 시나리오: [PROGRESS.md:753-811](./PROGRESS.md#1828-testing-scenarios)

- [ ] **4.3 문서 업데이트**
  - [ ] README.md에 자동 업데이트 기능 추가
  - [ ] CHANGELOG.md 작성 규칙 정의

**✅ 완료 조건**:
- `open` 명령어 실행 시 자동으로 GitHub Release 체크
- 새 버전 발견 시 사용자에게 알림 및 업데이트 진행
- 실패 시 자동 롤백
- 오프라인 환경에서 조용히 넘어감

---

### 2. Plan-and-Execute 아키텍처

**목표**: User request를 TODO list로 분해하고 순차 실행하는 시스템

**📖 설계 문서**:
- **PROGRESS.md**: [Section 1.9](./PROGRESS.md#19-plan-and-execute-아키텍처-구현-p0-) (Lines 893-1600+)
- **BLUEPRINT.md**: [Section 2 - Plan-and-Execute UI](./BLUEPRINT.md#2-plan-and-execute-ui-phase-25-핵심) (Lines 706+)

**예상 소요 시간**: 5-7일

#### Phase 1: Planning LLM (2일)

- [ ] **1.1 PlanningLLM 클래스** (`src/core/planning-llm.ts`)
  - [ ] `generateTODOList()` 메서드
  - [ ] Planning System Prompt 정의
  - [ ] JSON 파싱 및 TodoItem 생성
  - [ ] 복잡도 판단 (simple/moderate/complex)
  - 📖 구현 가이드: [PROGRESS.md:154-315](./PROGRESS.md#191-planning-llm-구현)

- [ ] **1.2 타입 정의** (`src/types/index.ts`)
  - [ ] `TodoItem` 인터페이스
  - [ ] `PlanningResult` 인터페이스
  - [ ] `TodoStatus` 타입
  - 📖 타입 정의: [PROGRESS.md:174-194](./PROGRESS.md#191-planning-llm-구현)

- [ ] **1.3 테스트**
  - [ ] 간단한 요청 → 2-3개 TODO 생성
  - [ ] 복잡한 요청 → 5-7개 TODO 생성
  - [ ] 의존성 처리 확인

#### Phase 2: TODO Executor (2일)

- [ ] **2.1 TodoExecutor 클래스** (`src/core/todo-executor.ts`)
  - [ ] `executeTodo()` 메서드
  - [ ] Docs Search Agent 선행 실행
  - [ ] Main LLM ReAct 실행 (Tools 포함)
  - [ ] 결과 수집 및 TODO 완료 처리
  - 📖 구현 가이드: [PROGRESS.md:317-500](./PROGRESS.md#192-todo-executor-구현)

- [ ] **2.2 실행 플로우**
  - [ ] TODO 순차 실행 루프
  - [ ] 의존성 체크
  - [ ] 에러 처리 (TODO 실패 시)
  - [ ] 진행 상황 콜백

#### Phase 3: Docs Search Agent Tool (1일)

- [ ] **3.1 Bash Command Tool** (`src/core/bash-command-tool.ts`)
  - [ ] `executeBashCommand()` 함수
  - [ ] Security 검증 (whitelist/blacklist)
  - [ ] ~/.open-cli/docs 제한
  - [ ] 5초 타임아웃
  - 📖 구현 가이드: [PROGRESS.md:775-850](./PROGRESS.md#20-docs-search-agent-tool-p0-)

- [ ] **3.2 Docs Search Agent** (`src/core/docs-search-agent.ts`)
  - [ ] `executeDocsSearchAgent()` 함수
  - [ ] Sub-LLM 실행 (max 10 iterations)
  - [ ] bash 명령어 실행 (find, grep, cat, ls, tree)
  - [ ] 결과 요약 및 반환
  - 📖 구현 가이드: [PROGRESS.md:852-1050](./PROGRESS.md#20-docs-search-agent-tool-p0-)

- [ ] **3.3 FILE_TOOLS 통합**
  - [ ] `search_docs_agent` tool 정의
  - [ ] LLMClient 전달 메커니즘

#### Phase 4: TODO List UI (1일)

- [ ] **4.1 TodoListPanel 컴포넌트** (`src/ui/components/TodoListPanel.tsx`)
  - [ ] TODO 목록 표시
  - [ ] 상태별 아이콘 (☐ → ✓)
  - [ ] 진행 중 애니메이션
  - [ ] 하단 고정 (스크롤 안 됨)
  - 📖 UI 가이드: [PROGRESS.md:502-670](./PROGRESS.md#193-todo-ui-컴포넌트-구현)
  - 📖 UI 모킹: [BLUEPRINT.md:706+](./BLUEPRINT.md#2-plan-and-execute-ui-phase-25-핵심)

- [ ] **4.2 InteractiveApp 통합**
  - [ ] TodoListPanel 추가
  - [ ] Message 영역과 TODO 영역 분리
  - [ ] 레이아웃 조정 (Fixed bottom)

#### Phase 5: Session Integration (1일)

- [ ] **5.1 SessionData 확장** (`src/core/session-manager.ts`)
  - [ ] `todos` 필드 추가
  - [ ] TODO 상태 저장
  - [ ] TODO 상태 복구
  - 📖 구현 가이드: [PROGRESS.md:672-750](./PROGRESS.md#194-session-통합)

- [ ] **5.2 테스트**
  - [ ] TODO 생성 → 실행 → 완료 플로우
  - [ ] 세션 저장 → 불러오기
  - [ ] TODO 복구 확인

**✅ 완료 조건**:
- User request가 자동으로 TODO list로 분해됨
- UI에 TODO list 표시 (하단 고정)
- 각 TODO 실행 전 Docs Search Agent 선행 실행
- TODO 상태가 Session에 저장/복구됨

---

## ⚙️ Priority 1: 중요 과제 (1-2주)

### 3. Model Compatibility Layer (gpt-oss-120b/20b)

**목표**: Harmony 포맷 422 에러 해결 및 모델별 quirks 처리

**📖 설계 문서**:
- **PROGRESS.md**: [Section 1.7](./PROGRESS.md#17-model-compatibility-layer-gpt-oss-120b20b-422-에러-해결-p1) (Lines 150-799)

**예상 소요 시간**: 1-2일 (Simple If-Branch) 또는 3-5일 (Adapter Pattern)

#### 추천: Phase 1 (Simple If-Branch) - 빠른 해결 (1-2시간)

- [ ] **1.1 LLMClient 수정** (`src/core/llm-client.ts`)
  - [ ] `preprocessMessages()` 메서드 추가
  - [ ] gpt-oss-(120b|20b) regex 체크
  - [ ] Assistant 메시지에 content 자동 추가
  - [ ] `chatCompletion()`, `chatCompletionStream()`, `chatCompletionWithTools()`에 적용
  - 📖 구현 가이드: [PROGRESS.md:539-580](./PROGRESS.md#177-alternative-simple-if-branch-approach-빠른-구현)

- [ ] **1.2 테스트**
  - [ ] gpt-oss-120b with tool_calls 테스트
  - [ ] 일반 모델 정상 작동 확인
  - [ ] 422 에러 해결 확인

#### 선택사항: Phase 2 (Adapter Pattern) - 리팩토링 (3-5일)

- [ ] **2.1 Base Adapter** (`src/core/adapters/base-adapter.ts`)
  - [ ] `IModelAdapter` 인터페이스
  - [ ] `BaseModelAdapter` 추상 클래스
  - 📖 구현 가이드: [PROGRESS.md:209-277](./PROGRESS.md#172-implementation-model-adapter-interface)

- [ ] **2.2 Harmony Adapter** (`src/core/adapters/harmony-adapter.ts`)
  - [ ] `preprocessRequest()` 구현
  - [ ] `generateDefaultContent()` 구현
  - [ ] `validateMessages()` 구현
  - 📖 구현 가이드: [PROGRESS.md:281-373](./PROGRESS.md#173-harmony-adapter-implementation)

- [ ] **2.3 OpenAI Adapter** (`src/core/adapters/openai-adapter.ts`)
  - [ ] 기본 pass-through adapter
  - 📖 구현 가이드: [PROGRESS.md:377-401](./PROGRESS.md#174-openai-adapter-default)

- [ ] **2.4 Adapter Factory** (`src/core/adapters/adapter-factory.ts`)
  - [ ] `getAdapter()` 메서드
  - [ ] `registerAdapter()` 메서드
  - 📖 구현 가이드: [PROGRESS.md:405-450](./PROGRESS.md#175-adapter-factory)

- [ ] **2.5 LLMClient 통합**
  - [ ] Adapter 선택 로직
  - [ ] 전처리/후처리 적용
  - 📖 구현 가이드: [PROGRESS.md:454-535](./PROGRESS.md#176-llmclient-통합)

**✅ 완료 조건**:
- gpt-oss-120b/20b에서 422 에러 발생하지 않음
- 일반 OpenAI 호환 모델들 정상 작동
- (Adapter Pattern 선택 시) 새 모델 quirks 쉽게 추가 가능

---

### 4. Docs Search Agent Tool

**목표**: LLM이 ~/.open-cli/docs를 자동으로 검색할 수 있는 Tool

**📖 설계 문서**:
- **PROGRESS.md**: [Section 2.0](./PROGRESS.md#20-docs-search-agent-tool-p0-) (Lines 775-1207)

**예상 소요 시간**: 2-3일

**체크리스트**:
- [ ] Bash Command Tool 구현 (보안 검증 포함)
- [ ] Docs Search Agent Sub-LLM 구현
- [ ] FILE_TOOLS에 통합
- [ ] Multi-iteration 테스트 (max 10)

**참고**: Plan-and-Execute 아키텍처의 일부로 이미 포함됨 (위 섹션 2.3 참조)

---

### 5. Tool 사용 내역 UI 표시

**목표**: Tool 호출을 박스로 표시

**📖 설계 문서**:
- **PROGRESS.md**: [Section 2.1](./PROGRESS.md#21-tool-사용-내역-ui-표시-p0-)
- **BLUEPRINT.md**: [Section 3 - Tool Call Box](./BLUEPRINT.md)

**예상 소요 시간**: 1일

- [ ] **5.1 ToolCallBox 컴포넌트** (`src/ui/components/ToolCallBox.tsx`)
  - [ ] Tool 이름 표시
  - [ ] Arguments 표시 (접기/펼치기)
  - [ ] 실행 결과 표시
  - [ ] 상태 아이콘 (⣾ → ✓/✗)

- [ ] **5.2 MessageList 통합**
  - [ ] Tool call 메시지에 ToolCallBox 표시
  - [ ] Tool result 메시지 처리

**✅ 완료 조건**:
- Tool 호출 시 박스로 명확하게 표시됨
- Arguments와 결과를 쉽게 확인 가능

---

### 6. 하단 상태바 구현

**목표**: 경로, 모델, 컨텍스트 사용률 표시

**📖 설계 문서**:
- **PROGRESS.md**: [Section 2.2](./PROGRESS.md#22-하단-상태바-구현-p1-)
- **BLUEPRINT.md**: [Section 4 - Status Bar](./BLUEPRINT.md)

**예상 소요 시간**: 1일

- [ ] **6.1 StatusBar 컴포넌트** (`src/ui/components/StatusBar.tsx`)
  - [ ] 현재 경로 표시
  - [ ] 모델 정보 표시
  - [ ] 컨텍스트 사용률 (토큰)
  - [ ] 진행 바

- [ ] **6.2 InteractiveApp 통합**
  - [ ] 하단 고정 (TODO Panel 위)

**✅ 완료 조건**:
- 하단에 상태바가 항상 표시됨
- 컨텍스트 사용률이 실시간으로 업데이트됨

---

### 7. ASCII 로고 및 Welcome 화면

**목표**: CLI 시작 시 Welcome 화면 표시

**📖 설계 문서**:
- **PROGRESS.md**: [Section 2.3](./PROGRESS.md#23-ascii-로고-및-welcome-화면-p1-)
- **BLUEPRINT.md**: [Section 1 - Welcome Screen](./BLUEPRINT.md#1-welcome-screen-첫-실행-시)

**예상 소요 시간**: 1일

- [ ] **7.1 WelcomeScreen 컴포넌트** (`src/ui/components/WelcomeScreen.tsx`)
  - [ ] ASCII 아트 로고
  - [ ] 버전 정보
  - [ ] Tips for getting started
  - [ ] Enter로 시작

- [ ] **7.2 InteractiveApp 통합**
  - [ ] 첫 실행 시에만 표시
  - [ ] Session 복구 시에는 표시 안 함

**✅ 완료 조건**:
- CLI 시작 시 Welcome 화면 표시
- 로고와 Tips가 명확히 보임

---

## 📋 Priority 2: 보통 과제 (1주)

### 8. Tips/Help 섹션

**예상 소요 시간**: 1일

- [ ] `/help` 명령어 강화
- [ ] 인터랙티브 튜토리얼
- [ ] 사용 예시 추가

---

### 9. 입력 힌트 및 자동완성

**예상 소요 시간**: 2일

- [ ] `@path/to/file` 자동완성
- [ ] `/` 명령어 자동완성
- [ ] 입력 힌트 표시

---

## 🎨 Priority 3: 낮음 과제

### 10. 메시지 타입별 스타일링 강화

**예상 소요 시간**: 1일

- [ ] User 메시지 스타일
- [ ] Assistant 메시지 스타일
- [ ] System 메시지 스타일
- [ ] Tool 메시지 스타일

---

## 📊 진행 상황 트래킹

### 전체 진행률

```
Phase 1 (완료): 기초 구축 ████████████████████████████████ 100%
Phase 2 (완료): 상호작용 고도화 ████████████████████████████████ 100%
Phase 2.5 (진행 중): Plan-and-Execute + UI/UX ████░░░░░░░░░░░░░░░░░░░░░░░░ 15%

현재 작업: Auto-Update System 설계 완료 ✅
다음 작업: Auto-Update System 구현
```

### 주간 목표 (Week 1)

- [x] Auto-Update System 설계 완료 ✅
- [x] Model Compatibility Layer 설계 완료 ✅
- [ ] Auto-Update System 구현 시작
  - [ ] Phase 1: Version Checking 완료
  - [ ] Phase 2: Update Mechanism 진행 중

---

## 🔗 관련 링크

### 문서
- [README.md](./README.md) - 프로젝트 개요
- [PROGRESS.md](./PROGRESS.md) - 개발 진행 상황 (상세)
- [BLUEPRINT.md](./BLUEPRINT.md) - UI 청사진 (50+ 모킹)
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - 프로젝트 아키텍처

### GitHub
- [Repository](https://github.com/A2G-Dev-Space/Open-Code-CLI)
- [Issues](https://github.com/A2G-Dev-Space/Open-Code-CLI/issues)
- [Releases](https://github.com/A2G-Dev-Space/Open-Code-CLI/releases)

### 주요 커밋
- `0b6de15` - GitHub Release auto-update system 설계
- `3c0adaf` - Model Compatibility Layer 설계

---

## 📝 작업 규칙

### 작업 시작 전
1. 해당 섹션의 설계 문서 읽기 (PROGRESS.md, BLUEPRINT.md)
2. 체크리스트 확인
3. 예상 소요 시간 확인

### 작업 중
1. 체크리스트 항목을 하나씩 완료
2. 각 항목 완료 시 `[x]` 체크
3. 문제 발생 시 PROGRESS.md에 기록

### 작업 완료 후
1. 모든 체크리스트 완료 확인
2. 테스트 실행
3. Git commit & push
4. TODO.md 업데이트 (다음 작업으로 이동)

---

## 🎯 다음 작업 (Next Up)

**즉시 시작 가능한 작업**:

1. **GitHub Release Auto-Update System - Phase 1**
   - 📖 [PROGRESS.md:215-346](./PROGRESS.md#1821-version-checking)
   - ⏱️ 1일
   - 🔧 `src/core/auto-updater.ts` 생성

2. **Model Compatibility Layer - Phase 1 (Simple If-Branch)**
   - 📖 [PROGRESS.md:539-580](./PROGRESS.md#177-alternative-simple-if-branch-approach-빠른-구현)
   - ⏱️ 1-2시간
   - 🔧 `src/core/llm-client.ts` 수정

**추천**: Model Compatibility Layer를 먼저 빠르게 해결 (1-2시간)하고, Auto-Update System을 시작하는 것이 좋습니다. gpt-oss-120b/20b 사용자가 즉시 혜택을 받을 수 있습니다.

---

**Last Updated**: 2025-11-05
**Version**: 0.2.0
