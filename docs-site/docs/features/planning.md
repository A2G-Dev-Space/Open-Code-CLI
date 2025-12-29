# Planning Mode

Planning Mode는 복잡한 작업을 체계적으로 수행하는 핵심 기능입니다.

## 동작 방식

1. **요청 분석** - 사용자 요청을 분석
2. **TODO 생성** - 실행 가능한 TODO 리스트로 분해
3. **순차 실행** - 각 TODO를 순서대로 실행
4. **결과 보고** - 완료 후 결과 요약

<!-- 스크린샷 추가 예정 -->

## 예시

```
사용자: 로그인 기능을 추가해줘

📋 Created 4 tasks:
1. [in_progress] 사용자 인증 컴포넌트 구현
2. [pending] 로그인 API 엔드포인트 연동
3. [pending] 세션 관리 로직 추가
4. [pending] 로그인 UI 테스트
```

<!-- video placeholder
-->

## TODO 상태

| 상태 | 의미 |
|------|------|
| `pending` | 대기 중 |
| `in_progress` | 진행 중 |
| `completed` | 완료 |

## 실행 중단

`Ctrl+C`를 누르면 현재 실행을 중단할 수 있습니다.
