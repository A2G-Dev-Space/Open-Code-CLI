# Logger 사용 가이드 (한글)

## 목차
1. [기본 사용법](#기본-사용법)
2. [로그 레벨 이해하기](#로그-레벨-이해하기)
3. [실행 흐름 추적하기](#실행-흐름-추적하기)
4. [변수 값 확인하기](#변수-값-확인하기)
5. [함수 진입/종료 추적하기](#함수-진입종료-추적하기)
6. [상태 변화 추적하기](#상태-변화-추적하기)
7. [성능 측정하기](#성능-측정하기)
8. [HTTP 요청/응답 로깅](#http-요청응답-로깅)
9. [에러 로깅](#에러-로깅)
10. [실전 예제](#실전-예제)

---

## 기본 사용법

### 1단계: Logger 임포트하기

```typescript
// 파일 상단에 추가
import { logger } from '@/utils/logger';
```

### 2단계: 로그 찍기

```typescript
// 정보 메시지
logger.info('서버가 시작되었습니다');

// 데이터와 함께 로그
logger.info('사용자 로그인', { userId: '123', email: 'user@example.com' });
```

**이게 전부입니다!** 기본 로깅은 이렇게 간단합니다.

---

## 로그 레벨 이해하기

### 언제 어떤 레벨을 사용할까요?

#### ❌ `logger.error()` - 에러가 발생했을 때
```typescript
// 사용 예시: 시스템이 정상 동작할 수 없는 문제
logger.error('데이터베이스 연결 실패', error);
logger.error('파일을 읽을 수 없습니다', new Error('File not found'));
```
**Normal, Verbose, Debug 모드 모두에서 표시됨**

#### ⚠️ `logger.warn()` - 주의가 필요한 상황
```typescript
// 사용 예시: 문제는 아니지만 주의해야 할 상황
logger.warn('API 응답이 느립니다', { responseTime: '5초' });
logger.warn('디스크 용량이 부족합니다', { available: '10%' });
```
**Normal, Verbose, Debug 모드 모두에서 표시됨**

#### ℹ️ `logger.info()` - 중요한 정보
```typescript
// 사용 예시: 사용자가 알아야 할 중요한 정보
logger.info('서버 시작됨', { port: 3000 });
logger.info('업데이트 완료', { version: '1.2.3' });
```
**Normal, Verbose, Debug 모드 모두에서 표시됨**

#### 🐛 `logger.debug()` - 개발자를 위한 디버그 정보
```typescript
// 사용 예시: 개발자가 문제를 진단하는데 필요한 정보
logger.debug('캐시 조회', { key: 'user:123', hit: true });
logger.debug('쿼리 실행', { sql: 'SELECT * FROM users' });
```
**Verbose, Debug 모드에서만 표시됨** (--verbose 또는 --debug)

#### 🔍 `logger.verbose()` - 매우 상세한 정보
```typescript
// 사용 예시: 아주 자세한 추적이 필요할 때
logger.verbose('HTTP 요청 헤더', { headers: request.headers });
logger.verbose('전체 응답 데이터', { response: fullData });
```
**Debug 모드에서만 표시됨** (--debug)

---

## 실행 흐름 추적하기

### `logger.flow()` - 코드가 어디를 지나가는지 확인

#### 왜 필요한가요?
프로그램이 어떤 경로로 실행되는지 알고 싶을 때 사용합니다.

#### 사용 방법
```typescript
function processOrder(orderId: string) {
  logger.flow('주문 처리 시작');

  if (orderId.startsWith('VIP')) {
    logger.flow('VIP 주문 처리 경로');
    // VIP 처리 로직
  } else {
    logger.flow('일반 주문 처리 경로');
    // 일반 처리 로직
  }

  logger.flow('주문 처리 완료');
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [order.ts:23:processOrder] ➜ FLOW: 주문 처리 시작
[2025-11-12T10:30:00.125Z] [OPEN-CLI] [order.ts:26:processOrder] ➜ FLOW: VIP 주문 처리 경로
[2025-11-12T10:30:00.130Z] [OPEN-CLI] [order.ts:33:processOrder] ➜ FLOW: 주문 처리 완료
```

**팁**: if문, switch문, 중요한 분기점마다 flow를 찍으면 좋습니다!

---

## 변수 값 확인하기

### `logger.vars()` - 변수 값을 한눈에 보기

#### 왜 필요한가요?
계산 결과나 중요한 변수의 값을 확인하고 싶을 때 사용합니다.

#### 사용 방법
```typescript
function calculateTotal(price: number, quantity: number, discount: number) {
  const subtotal = price * quantity;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  // 변수 값들을 한번에 확인
  logger.vars(
    { name: 'price', value: price },
    { name: 'quantity', value: quantity },
    { name: 'subtotal', value: subtotal },
    { name: 'discountAmount', value: discountAmount },
    { name: 'total', value: total }
  );

  return total;
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [calc.ts:15:calculateTotal] 📦 VARS:
   price=10000 (number)
   quantity=3 (number)
   subtotal=30000 (number)
   discountAmount=3000 (number)
   total=27000 (number)
```

**팁**: 복잡한 계산 후에 중간 결과를 확인하고 싶을 때 아주 유용합니다!

---

## 함수 진입/종료 추적하기

### `logger.enter()` / `logger.exit()` - 함수의 시작과 끝 표시

#### 왜 필요한가요?
어떤 함수가 호출되었고 어떤 값을 반환했는지 명확히 알 수 있습니다.

#### 사용 방법
```typescript
async function getUserInfo(userId: string) {
  // 함수 시작 - 인자(arguments) 표시
  logger.enter('getUserInfo', { userId });

  try {
    // 함수 로직
    const user = await database.findUser(userId);
    const profile = await database.getProfile(userId);

    const result = { user, profile };

    // 함수 종료 - 반환 값 표시
    logger.exit('getUserInfo', result);
    return result;

  } catch (error) {
    logger.error('getUserInfo 실패', error);
    throw error;
  }
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [user.ts:42:getUserInfo] ↓ ENTER: getUserInfo
  Args: {
    "userId": "user-123"
  }

[2025-11-12T10:30:00.250Z] [OPEN-CLI] [user.ts:50:getUserInfo] ↑ EXIT: getUserInfo
  Result: {"user":{...},"profile":{...}}
```

**팁**:
- 모든 public 함수에 enter/exit를 붙이면 실행 흐름이 명확해집니다
- try-catch와 함께 사용하면 에러가 어디서 났는지 쉽게 찾을 수 있습니다

---

## 상태 변화 추적하기

### `logger.state()` - 변경 전후 비교

#### 왜 필요한가요?
무언가가 변경되었을 때 "이전 값"과 "변경된 값"을 비교하고 싶을 때 사용합니다.

#### 사용 방법
```typescript
function updateOrderStatus(order: Order, newStatus: string) {
  const oldStatus = order.status;

  // 상태 변경 전후를 명확히 표시
  logger.state('주문 상태 변경', oldStatus, newStatus);

  order.status = newStatus;
  saveOrder(order);
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [order.ts:67:updateOrderStatus] 🔄 STATE: 주문 상태 변경
  Before: "pending"
  After: "completed"
```

**팁**:
- 상태 머신(State Machine)을 사용할 때 아주 유용합니다
- 버그 찾을 때 "언제 상태가 바뀌었나?" 추적 가능

---

## 성능 측정하기

### `logger.startTimer()` / `logger.endTimer()` - 실행 시간 측정

#### 왜 필요한가요?
어떤 작업이 얼마나 오래 걸리는지 측정하고 싶을 때 사용합니다.

#### 사용 방법
```typescript
async function loadBigData() {
  // 타이머 시작
  logger.startTimer('data-loading');

  const data = await database.query('SELECT * FROM big_table');

  // 타이머 종료 (자동으로 경과 시간 표시)
  const elapsed = logger.endTimer('data-loading');

  // 너무 오래 걸리면 경고
  if (elapsed > 1000) {
    logger.warn('데이터 로드가 느립니다', { elapsed });
  }

  return data;
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [data.ts:23:loadBigData] ⏱️  TIMER START: data-loading
[2025-11-12T10:30:01.456Z] [OPEN-CLI] [data.ts:27:loadBigData] ⏱️  TIMER END: data-loading 1333ms
[2025-11-12T10:30:01.456Z] [OPEN-CLI] [data.ts:30:loadBigData] ⚠️  WARN: 데이터 로드가 느립니다
  Data: {
    "elapsed": 1333
  }
```

**팁**:
- API 호출, 데이터베이스 쿼리, 파일 읽기 등 시간이 걸리는 작업에 사용
- 성능 병목 지점을 찾을 때 아주 유용

---

## HTTP 요청/응답 로깅

### `logger.httpRequest()` / `logger.httpResponse()` - API 호출 추적

#### 사용 방법
```typescript
async function callExternalAPI(url: string, data: any) {
  // HTTP 요청 로깅
  logger.httpRequest('POST', url, data);

  try {
    const response = await axios.post(url, data);

    // HTTP 응답 로깅
    logger.httpResponse(response.status, response.statusText, response.data);

    return response.data;
  } catch (error) {
    logger.error('API 호출 실패', error);
    throw error;
  }
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [api.ts:45:callExternalAPI] → HTTP REQUEST: POST https://api.example.com/users
  Body: {
    "name": "John",
    "email": "john@example.com"
  }

[2025-11-12T10:30:00.456Z] [OPEN-CLI] [api.ts:50:callExternalAPI] ← HTTP RESPONSE: 200 OK
  Data: {
    "id": "user-123",
    "created": true
  }
```

**팁**: API 디버깅할 때 요청/응답을 한눈에 볼 수 있어 편리합니다!

---

## 에러 로깅

### `logger.error()` - 에러 상세 정보 남기기

#### 사용 방법
```typescript
async function processPayment(orderId: string) {
  try {
    // 결제 로직
    const result = await paymentService.charge(orderId);
    return result;

  } catch (error) {
    // 에러와 컨텍스트 정보를 함께 로깅
    logger.error('결제 처리 실패', error as Error, {
      orderId,
      timestamp: new Date().toISOString(),
      service: 'payment'
    });

    throw error;
  }
}
```

#### 출력 예시
```
[2025-11-12T10:30:00.123Z] [OPEN-CLI] [payment.ts:67:processPayment] ❌ ERROR: 결제 처리 실패
  Message: Network timeout
  Stack:
Error: Network timeout
    at processPayment (/app/payment.ts:67:30)
    at handleOrder (/app/order.ts:123:15)
    ...
```

---

## 실전 예제

### 예제 1: 사용자 등록 함수

```typescript
import { logger, generateTraceId } from '@/utils/logger';

async function registerUser(email: string, password: string) {
  // 1. 함수 진입
  logger.enter('registerUser', { email });

  // 2. Trace ID 생성 (전체 요청 추적)
  const traceId = generateTraceId();
  logger.setTraceId(traceId);

  try {
    // 3. 실행 흐름 표시
    logger.flow('이메일 중복 확인 시작');

    // 4. 타이머 시작
    logger.startTimer('email-check');

    const exists = await checkEmailExists(email);

    logger.endTimer('email-check');

    // 5. 분기 처리
    if (exists) {
      logger.flow('이메일 중복 발견 - 에러 반환');
      throw new Error('Email already exists');
    }

    logger.flow('신규 사용자 생성 시작');

    // 6. 비밀번호 해시
    logger.startTimer('password-hash');
    const hashedPassword = await bcrypt.hash(password, 10);
    logger.endTimer('password-hash');

    // 7. 변수 확인
    logger.vars(
      { name: 'email', value: email },
      { name: 'hashedPassword', value: hashedPassword.substring(0, 20) + '...' }
    );

    // 8. 데이터베이스 저장
    logger.flow('데이터베이스에 사용자 저장');
    logger.startTimer('db-insert');

    const user = await database.createUser({
      email,
      password: hashedPassword
    });

    logger.endTimer('db-insert');

    // 9. 상태 로깅
    logger.info('사용자 등록 완료', {
      userId: user.id,
      email: user.email
    });

    // 10. 함수 종료
    logger.exit('registerUser', { userId: user.id });

    return user;

  } catch (error) {
    // 11. 에러 로깅
    logger.error('사용자 등록 실패', error as Error, { email });
    throw error;

  } finally {
    // 12. Trace ID 정리
    logger.clearTraceId();
  }
}
```

### 예제 2: 주문 처리 함수

```typescript
async function processOrder(orderId: string) {
  logger.enter('processOrder', { orderId });

  try {
    // 주문 조회
    logger.flow('주문 정보 조회');
    const order = await getOrder(orderId);

    logger.vars(
      { name: 'orderId', value: order.id },
      { name: 'status', value: order.status },
      { name: 'amount', value: order.amount }
    );

    // 상태 확인
    if (order.status !== 'pending') {
      logger.warn('이미 처리된 주문', { orderId, status: order.status });
      return;
    }

    // 재고 확인
    logger.flow('재고 확인 중');
    logger.startTimer('inventory-check');

    const available = await checkInventory(order.items);

    logger.endTimer('inventory-check');

    if (!available) {
      logger.flow('재고 부족 - 주문 취소');
      logger.state('주문 상태 변경', order.status, 'cancelled');

      order.status = 'cancelled';
      await saveOrder(order);

      throw new Error('Insufficient inventory');
    }

    // 결제 처리
    logger.flow('결제 처리 시작');
    logger.startTimer('payment-process');

    const payment = await processPayment(order);

    logger.endTimer('payment-process');

    // 주문 완료
    logger.state('주문 상태 변경', order.status, 'completed');

    order.status = 'completed';
    await saveOrder(order);

    logger.info('주문 처리 완료', {
      orderId,
      amount: order.amount,
      paymentId: payment.id
    });

    logger.exit('processOrder', { success: true });

  } catch (error) {
    logger.error('주문 처리 실패', error as Error, { orderId });
    throw error;
  }
}
```

### 예제 3: API 엔드포인트

```typescript
async function handleGetUserAPI(req: Request, res: Response) {
  const userId = req.params.userId;

  // Trace ID로 전체 요청 추적
  const traceId = generateTraceId();
  logger.setTraceId(traceId);

  logger.enter('handleGetUserAPI', { userId, method: req.method, path: req.path });

  try {
    logger.flow('사용자 정보 조회 시작');
    logger.startTimer('api-get-user');

    // 캐시 확인
    logger.flow('캐시 확인');
    const cached = await cache.get(`user:${userId}`);

    if (cached) {
      logger.debug('캐시 히트', { userId });
      logger.endTimer('api-get-user');
      logger.exit('handleGetUserAPI', { source: 'cache' });

      return res.json(cached);
    }

    logger.debug('캐시 미스 - DB 조회', { userId });

    // DB 조회
    logger.flow('데이터베이스 조회');
    const user = await database.findUser(userId);

    if (!user) {
      logger.warn('사용자를 찾을 수 없음', { userId });
      logger.exit('handleGetUserAPI', { found: false });

      return res.status(404).json({ error: 'User not found' });
    }

    // 캐시 저장
    logger.flow('캐시에 저장');
    await cache.set(`user:${userId}`, user, 300); // 5분

    logger.endTimer('api-get-user');

    logger.info('사용자 조회 성공', { userId });
    logger.exit('handleGetUserAPI', { found: true });

    res.json(user);

  } catch (error) {
    logger.error('API 처리 중 에러', error as Error, { userId });
    res.status(500).json({ error: 'Internal server error' });

  } finally {
    logger.clearTraceId();
  }
}
```

---

## 빠른 참조 (Cheat Sheet)

### 기본 로깅
```typescript
logger.error('에러 메시지', error);           // ❌ 에러
logger.warn('경고 메시지', data);              // ⚠️ 경고
logger.info('정보 메시지', data);              // ℹ️ 정보
logger.debug('디버그 메시지', data);           // 🐛 디버그 (--verbose)
logger.verbose('상세 메시지', data);           // 🔍 Verbose (--debug)
```

### 추적 로깅
```typescript
logger.flow('실행 경로 표시');                                    // ➜ 흐름
logger.vars({ name: 'var1', value: val1 });                    // 📦 변수
logger.enter('functionName', args);                            // ↓ 진입
logger.exit('functionName', result);                           // ↑ 종료
logger.state('설명', beforeValue, afterValue);                 // 🔄 상태
logger.startTimer('label');                                    // ⏱️ 타이머 시작
logger.endTimer('label');                                      // ⏱️ 타이머 종료
```

### HTTP 로깅
```typescript
logger.httpRequest('POST', url, body);                         // → 요청
logger.httpResponse(status, statusText, data);                 // ← 응답
```

### Trace ID (요청 추적)
```typescript
const traceId = generateTraceId();
logger.setTraceId(traceId);
// ... 로깅 ...
logger.clearTraceId();
```

---

## 모드별 출력 요약

| 명령어 | 레벨 | 출력되는 로그 |
|--------|------|---------------|
| `open` | INFO | error, warn, info만 |
| `open --verbose` | DEBUG | error, warn, info, debug, flow, vars, enter/exit, state, timer |
| `open --debug` | VERBOSE | 위 + verbose, HTTP 상세, Tool 상세 |

---

## 마무리

이 가이드를 참고하여 코드에 로깅을 추가하면:
- ✅ 버그를 더 쉽게 찾을 수 있습니다
- ✅ 프로그램의 실행 흐름을 명확히 이해할 수 있습니다
- ✅ 성능 병목 지점을 쉽게 발견할 수 있습니다
- ✅ 팀원들이 코드를 이해하기 쉬워집니다

**핵심 원칙**:
1. **모든 public 함수**에 `enter()/exit()` 추가
2. **중요한 분기점**마다 `flow()` 추가
3. **복잡한 계산 후** `vars()`로 결과 확인
4. **상태가 변경**되면 `state()` 기록
5. **시간이 걸리는 작업**에 타이머 추가

행복한 코딩 되세요! 🚀
