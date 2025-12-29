# Advanced Usage

## 세션 관리

```bash
# 세션 목록
nexus sessions list

# 세션 불러오기
nexus sessions load <session-id>

# 세션 삭제
nexus sessions delete <session-id>
```

## 컨텍스트 관리

긴 대화 중 컨텍스트가 80%를 넘으면 자동으로 압축됩니다.

수동 압축:
```
/compact
```

<!-- video placeholder
-->

## 로그 모드

디버깅을 위한 상세 로그:

```bash
# 상세 로그 활성화
nexus --log-level verbose

# LLM 요청/응답 로그
nexus --llm-log
```

## 도구 사용 통계

```
/usage
```

현재 세션의 토큰 사용량과 도구 호출 통계를 확인할 수 있습니다.
