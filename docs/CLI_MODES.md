# CLI 실행 모드 가이드

OPEN-CLI는 3가지 로깅 모드를 지원합니다.

## 1. Normal Mode (기본)

```bash
open
# 또는
npm start
```

### 특징
- **로그 레벨**: INFO
- **출력**: ERROR, WARN, INFO 메시지만 표시
- **위치 정보**: 표시 안됨
- **용도**: 일반 사용자, 프로덕션 환경

### 출력 예제
```
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ⚠️  WARN: 경고 메시지 테스트
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ℹ️  INFO: 정보 메시지 테스트
```

---

## 2. Verbose Mode (상세 모드)

```bash
open --verbose
```

### 특징
- **로그 레벨**: DEBUG
- **출력**: ERROR, WARN, INFO, DEBUG + 실행 흐름 추적
- **위치 정보**: **표시됨** (파일명:라인:함수명)
- **추가 로그**:
  - `logger.debug()` - 디버그 정보
  - `logger.flow()` - 실행 흐름 추적
  - `logger.vars()` - 변수 값 추적
  - `logger.state()` - 상태 변화 추적
  - `logger.enter/exit()` - 함수 진입/종료
  - `logger.startTimer/endTimer()` - 성능 측정
- **용도**: 개발 환경, 문제 디버깅

### 출력 예제
```
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:17:testFunction] ↓ ENTER: testFunction
  Args: {
    "mode": "VERBOSE"
  }
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:22:testFunction] 🐛 DEBUG: 디버그 메시지 테스트
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:25:testFunction] ➜ FLOW: 실행 흐름 테스트
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:27:testFunction] 📦 VARS:
   variable1="value1" (string)
   variable2=123 (number)
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:33:testFunction] 🔄 STATE: 상태 변경 테스트
  Before: "before"
  After: "after"
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [test-logger-modes.ts:35:testFunction] ⏱️  TIMER START: test-timer
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [test-logger-modes.ts:40:testFunction] ⏱️  TIMER END: test-timer 1ms
```

---

## 3. Debug Mode (최대 디버그 모드)

```bash
open --debug
```

### 특징
- **로그 레벨**: VERBOSE (최대)
- **출력**: **모든 로그** (ERROR, WARN, INFO, DEBUG, VERBOSE + 전체 추적)
- **위치 정보**: **표시됨** (파일명:라인:함수명)
- **추가 로그**:
  - Verbose 모드의 모든 로그
  - `logger.verbose()` - 매우 상세한 로그
  - HTTP 요청/응답 상세 정보
  - Tool 실행 상세 정보
- **용도**: 심층 디버깅, 개발 중 상세 추적

### 출력 예제
```
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [test-logger-modes.ts:23:testFunction] 🔍 VERBOSE: Verbose 메시지 테스트
  Data: {
    "verbose": "data"
  }
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [test-logger-modes.ts:17:testFunction] ↓ ENTER: testFunction
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [http-client.ts:42:request] → HTTP REQUEST: POST https://api.example.com/v1/chat
  Body: {...}
[2025-11-12T06:50:04.550Z] [OPEN-CLI] [http-client.ts:56:request] ← HTTP RESPONSE: 200 OK
  Data: {...}
```

---

## 비교표

| 기능 | Normal | Verbose | Debug |
|------|--------|---------|-------|
| 로그 레벨 | INFO | DEBUG | VERBOSE |
| ERROR | ✅ | ✅ | ✅ |
| WARN | ✅ | ✅ | ✅ |
| INFO | ✅ | ✅ | ✅ |
| DEBUG | ❌ | ✅ | ✅ |
| VERBOSE | ❌ | ❌ | ✅ |
| 위치 정보 | ❌ | ✅ | ✅ |
| 함수 추적 | ❌ | ✅ | ✅ |
| 변수 추적 | ❌ | ✅ | ✅ |
| 상태 추적 | ❌ | ✅ | ✅ |
| 성능 측정 | ❌ | ✅ | ✅ |
| HTTP 상세 | ❌ | ❌ | ✅ |
| Tool 상세 | ❌ | ❌ | ✅ |

---

## 실행 예제

### Normal Mode
```bash
# 일반 사용
open

# 출력 예시
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ℹ️  INFO: 애플리케이션 시작
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ℹ️  INFO: 설정 로드 완료
```

### Verbose Mode
```bash
# 상세 로깅
open --verbose

# 출력 예시
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ℹ️  INFO: 📝 Verbose mode enabled - detailed logging
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [app.ts:10:startApp] ↓ ENTER: startApp
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [app.ts:12:startApp] ➜ FLOW: 설정 파일 로드 중
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [config.ts:23:loadConfig] 📦 VARS:
   configPath="~/.open-cli/config.json" (string)
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [app.ts:15:startApp] ↑ EXIT: startApp
```

### Debug Mode
```bash
# 최대 디버그 로깅
open --debug

# 출력 예시 (모든 로그 + HTTP/Tool 상세)
[2025-11-12T06:50:04.348Z] [OPEN-CLI] ℹ️  INFO: 🔍 Debug mode enabled - maximum logging with location tracking
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [http.ts:42:request] 🔍 VERBOSE: HTTP 요청 준비
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [http.ts:45:request] → HTTP REQUEST: POST https://api.example.com/chat
  Body: { "message": "Hello" }
[2025-11-12T06:50:04.550Z] [OPEN-CLI] [http.ts:67:request] ← HTTP RESPONSE: 200 OK
  Data: { "response": "Hi there!" }
[2025-11-12T06:50:04.551Z] [OPEN-CLI] [tools.ts:89:executeTool] 🔧 TOOL SUCCESS: read_file
  Args: { "path": "README.md" }
  Result: "# OPEN-CLI\n\n..."
```

---

## 권장 사용 시나리오

### Normal Mode (open)
- ✅ 일반 사용자
- ✅ 프로덕션 환경
- ✅ 깔끔한 출력이 필요할 때

### Verbose Mode (open --verbose)
- ✅ 개발 중
- ✅ 버그 디버깅
- ✅ 실행 흐름 확인 필요
- ✅ 변수 값 추적 필요
- ✅ 성능 분석 필요

### Debug Mode (open --debug)
- ✅ 심각한 버그 디버깅
- ✅ HTTP 통신 문제 진단
- ✅ Tool 실행 문제 진단
- ✅ 전체 실행 과정 상세 분석
- ✅ 새로운 기능 개발 중

---

## 프로그래밍에서 사용

코드에서 각 레벨의 로그를 사용하는 가이드:

```typescript
import { logger } from '@/utils/logger';

function processUserRequest(userId: string) {
  // 함수 진입 (DEBUG 이상에서 표시)
  logger.enter('processUserRequest', { userId });

  try {
    // 실행 흐름 (DEBUG 이상에서 표시)
    logger.flow('사용자 정보 조회 중');

    const user = getUserById(userId);

    // 변수 추적 (DEBUG 이상에서 표시)
    logger.vars(
      { name: 'user.id', value: user.id },
      { name: 'user.name', value: user.name }
    );

    // 정보 (INFO 이상 - 항상 표시)
    logger.info('사용자 요청 처리 시작', { userId });

    // 디버그 정보 (DEBUG 이상에서 표시)
    logger.debug('캐시 확인', { cacheKey: `user:${userId}` });

    // Verbose 상세 정보 (VERBOSE에서만 표시)
    logger.verbose('상세 HTTP 헤더', { headers: request.headers });

    // 경고 (WARN 이상 - 항상 표시)
    if (user.status === 'inactive') {
      logger.warn('비활성 사용자 접근', { userId });
    }

    // 함수 종료 (DEBUG 이상에서 표시)
    logger.exit('processUserRequest', { success: true });

  } catch (error) {
    // 에러 (ERROR - 항상 표시)
    logger.error('사용자 요청 처리 실패', error);
    throw error;
  }
}
```

---

## Trace ID를 사용한 요청 추적

여러 함수에 걸친 전체 흐름을 추적할 때:

```typescript
import { logger, generateTraceId } from '@/utils/logger';

async function handleApiRequest(req: Request) {
  // 고유 Trace ID 생성
  const traceId = generateTraceId();
  logger.setTraceId(traceId);

  try {
    logger.info('API 요청 시작', { method: req.method, path: req.path });

    // 모든 하위 함수 호출에서 같은 Trace ID 표시됨
    await authenticateUser(req);  // [Trace:abc12345] ...
    await processRequest(req);     // [Trace:abc12345] ...
    await saveToDatabase(result);  // [Trace:abc12345] ...

    logger.info('API 요청 완료');
  } finally {
    logger.clearTraceId();
  }
}
```

출력:
```
[2025-11-12T06:50:04.348Z] [OPEN-CLI] [Trace:abc12345] ℹ️  INFO: API 요청 시작
[2025-11-12T06:50:04.349Z] [OPEN-CLI] [Trace:abc12345] [auth.ts:23:authenticateUser] ➜ FLOW: 토큰 검증
[2025-11-12T06:50:04.350Z] [OPEN-CLI] [Trace:abc12345] [process.ts:45:processRequest] ➜ FLOW: 요청 처리
[2025-11-12T06:50:04.351Z] [OPEN-CLI] [Trace:abc12345] [db.ts:67:saveToDatabase] ➜ FLOW: DB 저장
[2025-11-12T06:50:04.352Z] [OPEN-CLI] [Trace:abc12345] ℹ️  INFO: API 요청 완료
```

---

## 문제 해결

### Q: 로그가 너무 많아요
A: Normal mode (`open`)로 실행하세요.

### Q: 어디서 에러가 발생했는지 모르겠어요
A: Verbose mode (`open --verbose`)로 실행해서 위치 정보를 확인하세요.

### Q: HTTP 요청이 실패하는데 원인을 모르겠어요
A: Debug mode (`open --debug`)로 실행해서 HTTP 상세 정보를 확인하세요.

### Q: 성능이 느린 부분을 찾고 싶어요
A: Verbose mode에서 타이머 로그를 확인하세요:
```typescript
logger.startTimer('slow-operation');
// 작업 수행
logger.endTimer('slow-operation'); // "⏱️  TIMER END: slow-operation 1234ms" 출력
```

---

## 추가 자료

- [Logger 사용 가이드](./LOGGER_GUIDE.md) - 상세한 Logger API 문서
- [Logger 데모](../examples/logger-demo.ts) - 실제 사용 예제
- [테스트 스크립트](../test-logger-modes.ts) - 모드별 출력 테스트
