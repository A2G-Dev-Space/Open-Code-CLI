# Configuration

## 설정 파일 위치

```
~/.nexus-coder/
├── config.json      # 메인 설정
├── endpoints.json   # API 엔드포인트
└── sessions/        # 세션 저장
```

## API 엔드포인트 설정

```json
{
  "endpoints": [
    {
      "name": "LiteLLM",
      "baseUrl": "http://localhost:4000/v1",
      "apiKey": "your-api-key"
    }
  ]
}
```

## 모델 설정

```json
{
  "models": [
    {
      "id": "gpt-4",
      "name": "GPT-4",
      "maxTokens": 128000
    }
  ]
}
```

## 환경 변수

| 변수 | 설명 |
|------|------|
| `NEXUS_API_KEY` | API 키 |
| `NEXUS_BASE_URL` | API 기본 URL |
| `NEXUS_MODEL` | 기본 모델 |
