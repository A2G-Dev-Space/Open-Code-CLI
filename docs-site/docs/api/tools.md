# Tools API Reference

## File Tools

### read_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | ✅ | 파일 경로 |
| `offset` | number | ❌ | 시작 라인 |
| `limit` | number | ❌ | 읽을 라인 수 |

### create_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | ✅ | 생성할 파일 경로 |
| `content` | string | ✅ | 파일 내용 |

### edit_file

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | ✅ | 파일 경로 |
| `old_string` | string | ✅ | 찾을 텍스트 |
| `new_string` | string | ✅ | 교체할 텍스트 |
| `replace_all` | boolean | ❌ | 전체 교체 여부 |

## Search Tools

### find_files

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | ✅ | glob 패턴 |
| `path` | string | ❌ | 검색 경로 |

### search_code

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | ✅ | 검색 패턴 (정규식) |
| `path` | string | ❌ | 검색 경로 |
| `include` | string | ❌ | 포함할 파일 패턴 |

## Execution Tools

### bash

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | string | ✅ | 실행할 명령어 |
| `timeout` | number | ❌ | 타임아웃 (ms) |
