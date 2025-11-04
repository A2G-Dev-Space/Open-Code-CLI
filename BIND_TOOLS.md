# BIND_TOOLS - LLM에 바인딩된 도구 목록

**마지막 업데이트**: 2025-11-04
**버전**: 0.1.0

---

## 📋 개요

OPEN-CLI의 **모든 대화형 모드** (Ink UI, Classic UI)에서 LLM은 자동으로 FILE_TOOLS에 접근할 수 있습니다.
사용자가 파일 관련 요청을 하면, LLM이 자동으로 적절한 도구를 선택하여 실행합니다.

**바인딩 위치**:
- Classic UI: `src/cli.ts` (line 442-477)
- Ink UI: `src/ui/components/InteractiveApp.tsx` (line 72-109)
- LLMClient: `src/core/llm-client.ts` (chatCompletionWithTools 메서드)

---

## 🛠️ 바인딩된 도구 목록

현재 바인딩된 도구: **4개** (FILE_TOOLS)

### 1. read_file

**기능**: 파일의 내용을 읽습니다.

**Input Parameters**:
```typescript
{
  file_path: string  // 읽을 파일의 절대 경로 또는 상대 경로
}
```

**Output**:
```typescript
{
  success: boolean
  result?: string    // 파일 내용 (성공 시)
  error?: string     // 에러 메시지 (실패 시)
}
```

**사용 예시**:
```typescript
// LLM이 자동으로 호출
User: "package.json 파일을 읽어서 프로젝트 이름을 알려줘"
→ LLM calls: read_file({ file_path: "package.json" })
→ LLM reads file content
→ LLM responds: "프로젝트 이름은 `open-cli` 입니다."
```

**에러 케이스**:
- `ENOENT`: 파일을 찾을 수 없습니다
- `EACCES`: 파일 읽기 권한이 없습니다
- 기타: 파일 읽기 실패

**제약사항**:
- 텍스트 파일만 지원 (UTF-8 인코딩)
- 바이너리 파일은 읽기 불가

---

### 2. write_file

**기능**: 파일에 내용을 씁니다. 기존 파일이 있으면 덮어씁니다.

**Input Parameters**:
```typescript
{
  file_path: string  // 쓸 파일의 절대 경로 또는 상대 경로
  content: string    // 파일에 쓸 내용
}
```

**Output**:
```typescript
{
  success: boolean
  result?: string    // 성공 메시지 (성공 시)
  error?: string     // 에러 메시지 (실패 시)
}
```

**사용 예시**:
```typescript
// LLM이 자동으로 호출
User: "test.txt 파일에 'Hello World'를 써줘"
→ LLM calls: write_file({ file_path: "test.txt", content: "Hello World" })
→ File created/overwritten
→ LLM responds: "네, test.txt 파일에 'Hello World'를 작성했습니다."
```

**특수 기능**:
- 디렉토리가 없으면 자동으로 생성 (`mkdir -p` 동작)
- 기존 파일은 경고 없이 덮어씀 (주의 필요)

**에러 케이스**:
- 파일 쓰기 권한 없음
- 디스크 공간 부족
- 기타 파일 시스템 에러

**제약사항**:
- 텍스트 파일만 지원 (UTF-8 인코딩)
- 백업 없이 덮어씀 (중요한 파일은 주의)

---

### 3. list_files

**기능**: 디렉토리의 파일 및 폴더 목록을 반환합니다.

**Input Parameters**:
```typescript
{
  directory_path?: string  // 목록을 조회할 디렉토리 경로 (기본값: '.')
  recursive?: boolean      // 하위 디렉토리까지 재귀적으로 조회 (기본값: false)
}
```

**Output**:
```typescript
{
  success: boolean
  result?: string    // JSON 형식의 파일 목록 (성공 시)
  error?: string     // 에러 메시지 (실패 시)
}
```

**Output Format** (JSON):
```json
[
  {
    "name": "package.json",
    "type": "file",
    "path": "package.json"
  },
  {
    "name": "src",
    "type": "directory",
    "path": "src"
  }
]
```

**사용 예시**:
```typescript
// LLM이 자동으로 호출
User: "현재 디렉토리에 어떤 파일이 있어?"
→ LLM calls: list_files({ directory_path: ".", recursive: false })
→ LLM receives file list
→ LLM responds: "현재 디렉토리에는 package.json, src/, dist/ 등이 있습니다."
```

**에러 케이스**:
- `ENOENT`: 디렉토리를 찾을 수 없습니다
- 기타: 디렉토리 읽기 실패

**제약사항**:
- 숨김 파일도 포함 (.git, .env 등)
- 심볼릭 링크는 파일/디렉토리로 표시

---

### 4. find_files

**기능**: 파일명 패턴으로 파일을 검색합니다.

**Input Parameters**:
```typescript
{
  pattern: string           // 검색할 파일명 패턴 (예: *.ts, package.json)
  directory_path?: string   // 검색을 시작할 디렉토리 경로 (기본값: '.')
}
```

**Output**:
```typescript
{
  success: boolean
  result?: string    // JSON 형식의 매칭된 파일 목록 (성공 시)
  error?: string     // 에러 메시지 (실패 시)
}
```

**Output Format** (JSON):
```json
[
  {
    "name": "cli.ts",
    "path": "src/cli.ts"
  },
  {
    "name": "llm-client.ts",
    "path": "src/core/llm-client.ts"
  }
]
```

**Glob Pattern 지원**:
- `*` - 0개 이상의 문자 (예: `*.ts` → 모든 .ts 파일)
- `?` - 정확히 1개의 문자 (예: `file?.txt`)
- 재귀 검색 자동 (하위 디렉토리 포함)

**사용 예시**:
```typescript
// LLM이 자동으로 호출
User: "TypeScript 파일들을 찾아줘"
→ LLM calls: find_files({ pattern: "*.ts", directory_path: "." })
→ LLM receives matched files
→ LLM responds: "총 45개의 TypeScript 파일을 찾았습니다: cli.ts, llm-client.ts, ..."
```

**에러 케이스**:
- 파일 검색 실패
- 잘못된 패턴

**제약사항**:
- 간단한 glob 패턴만 지원 (복잡한 정규식 미지원)
- 대소문자 구분 (case-sensitive)

---

## 🔄 Tool Calling 플로우

### 1. 사용자 요청
```
User: "package.json을 읽어서 dependencies를 알려줘"
```

### 2. LLM이 적절한 도구 선택
```typescript
LLM decides to use: read_file
Arguments: { file_path: "package.json" }
```

### 3. Tool 실행
```typescript
executeFileTool("read_file", { file_path: "package.json" })
→ Returns: { success: true, result: "{ \"name\": \"open-cli\", ... }" }
```

### 4. LLM이 결과 해석
```typescript
LLM receives tool result
LLM analyzes the JSON content
```

### 5. 최종 응답 생성
```
Assistant: "package.json의 dependencies는 다음과 같습니다:
- axios: ^1.7.9
- chalk: ^5.4.1
- commander: ^12.1.0
..."
```

---

## 🔧 Tool Calling 제어

### Max Iterations
- **기본값**: 5회
- **의미**: LLM이 연속으로 도구를 호출할 수 있는 최대 횟수
- **초과 시**: "최대 반복 횟수에 도달했습니다" 메시지

**예시 시나리오**:
```
Iteration 1: read_file("package.json")
Iteration 2: find_files("*.ts")
Iteration 3: read_file("src/cli.ts")
Iteration 4: write_file("summary.txt", "...")
Iteration 5: read_file("summary.txt")
→ 5회 초과 시 중단
```

### Tool Call History
모든 도구 호출은 기록되며, Classic UI에서 표시됩니다:

```
🔧 사용된 도구:

  1. read_file
     Args: {"file_path":"package.json"}
     Result: { "name": "open-cli", ... }

  2. find_files
     Args: {"pattern":"*.ts","directory_path":"src"}
     Result: [{"name":"cli.ts","path":"src/cli.ts"}, ...]
```

---

## 📊 도구 사용 통계 (테스트 결과)

### 테스트 1: read_file
- **요청**: "package.json 파일을 읽어서 프로젝트 이름을 알려줘"
- **Tool Called**: `read_file`
- **Result**: ✅ 성공
- **Output**: "프로젝트 이름은 `open-cli` 입니다."

### 테스트 2: write_file
- **요청**: "test.txt 파일에 'Hello from OPEN-CLI'라고 써줘"
- **Tool Called**: `write_file`
- **Result**: ✅ 성공
- **File Created**: `test.txt` with content "Hello from OPEN-CLI"
- **Output**: "네, 알겠습니다. test.txt 파일에 'Hello from OPEN-CLI'라고 쓰겠습니다."

---

## 🔒 보안 및 권한

### 현재 구현
- ✅ 파일 읽기/쓰기: **자동 승인** (제한 없음)
- ✅ 파일 검색/목록: **자동 승인** (제한 없음)

### 주의사항
⚠️ **현재 LLM은 모든 파일에 무제한 접근 가능합니다!**
- 중요한 파일이 있는 디렉토리에서 실행 시 주의
- `.env`, `credentials.json` 등 민감한 파일 주의
- `write_file`은 경고 없이 덮어씀

---

## 🛠️ 개발자 가이드

### 새 도구 추가하기

1. **Tool Definition 작성** (`src/tools/`):
```typescript
export const MY_TOOL: ToolDefinition = {
  type: 'function',
  function: {
    name: 'my_tool',
    description: '도구 설명',
    parameters: {
      type: 'object',
      properties: {
        param1: {
          type: 'string',
          description: '파라미터 설명',
        },
      },
      required: ['param1'],
    },
  },
};
```

2. **Tool Execution 함수 작성**:
```typescript
export async function executeMyTool(
  param1: string
): Promise<ToolExecutionResult> {
  try {
    // 도구 로직 구현
    return { success: true, result: "..." };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

3. **executeFileTool에 추가**:
```typescript
export async function executeFileTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<ToolExecutionResult> {
  switch (toolName) {
    // ...
    case 'my_tool':
      return executeMyTool(args['param1'] as string);
    // ...
  }
}
```

4. **FILE_TOOLS 배열에 추가**:
```typescript
export const FILE_TOOLS: ToolDefinition[] = [
  READ_FILE_TOOL,
  WRITE_FILE_TOOL,
  LIST_FILES_TOOL,
  FIND_FILES_TOOL,
  MY_TOOL, // 추가
];
```

5. **BIND_TOOLS.md 업데이트** (이 문서)

---

## 📝 변경 이력

### 2025-11-04
- ✅ FILE_TOOLS 4개 자동 바인딩 구현
- ✅ Classic UI에 tool calling 통합
- ✅ Ink UI에 tool calling 통합
- ✅ LLMClient.chatCompletionWithTools() 메서드 추가
- ✅ 테스트 완료 (read_file, write_file)

---

**문의**: gkstmdgk2731@naver.com
**Repository**: https://github.com/HanSyngha/open-cli
