# Tools

Nexus Coder가 제공하는 도구들입니다.

## 파일 도구

### read_file
파일 내용을 읽습니다.

```
파일 경로와 읽을 범위를 지정할 수 있습니다.
```

### create_file
새 파일을 생성합니다.

### edit_file
기존 파일을 수정합니다.

```
old_string → new_string 방식으로 정확한 위치를 찾아 교체합니다.
```

## 검색 도구

### find_files
파일 이름 패턴으로 검색합니다.

```bash
# 예: 모든 TypeScript 파일 찾기
**/*.ts
```

### search_code
코드 내용으로 검색합니다 (grep 기반).

## 실행 도구

### bash
셸 명령어를 실행합니다.

```bash
# 예: 테스트 실행
npm test
```

## TODO 도구

### write_todos
TODO 리스트를 업데이트합니다.

## 문서 검색

### call_docs_search_agent
로컬 문서를 검색합니다.

<!-- 스크린샷 추가 예정 -->
