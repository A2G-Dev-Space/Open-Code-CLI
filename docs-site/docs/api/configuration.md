# Configuration API

## Config File Schema

### config.json

```json
{
  "currentEndpoint": "string",
  "currentModel": "string",
  "theme": "dark" | "light",
  "autoCompactThreshold": 80
}
```

### endpoints.json

```json
{
  "endpoints": [
    {
      "name": "string",
      "baseUrl": "string",
      "apiKey": "string"
    }
  ]
}
```

### models.json

```json
{
  "models": [
    {
      "id": "string",
      "name": "string",
      "maxTokens": 128000,
      "endpoint": "string"
    }
  ]
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXUS_CONFIG_DIR` | 설정 디렉토리 경로 | `~/.nexus-coder` |
| `NEXUS_API_KEY` | API 키 | - |
| `NEXUS_BASE_URL` | API 기본 URL | - |
| `NEXUS_MODEL` | 기본 모델 ID | - |
| `NEXUS_LOG_LEVEL` | 로그 레벨 | `info` |

## CLI Options

```bash
nexus [options] [message]

Options:
  --config, -c    설정 명령
  --model, -m     모델 선택
  --log-level     로그 레벨 (debug, verbose, info, warn, error)
  --llm-log       LLM 요청/응답 로깅
  --version, -v   버전 표시
  --help, -h      도움말 표시
```
