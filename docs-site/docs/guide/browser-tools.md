# Browser Tools

Chrome DevTools Protocol (CDP)를 사용한 브라우저 자동화 도구입니다.

::: info 완벽한 End-to-End 자동화
개발 서버 실행 → 브라우저 접속 → 스크린샷으로 현재 상태 파악 → 코드 수정 → 결과 확인 → 배포까지, 전체 개발 워크플로우를 AI가 자동으로 수행합니다. 더 이상 수동으로 브라우저를 열고 확인할 필요가 없습니다.
:::

::: tip 활성화 방법
`/tool` 입력 후 Browser Automation을 선택하여 활성화합니다.
활성화 상태는 재시작해도 유지됩니다.
:::

## browser_launch
Chrome 브라우저를 실행합니다.

```
- headless: false (기본값) - 브라우저 창이 보임
- headless: true - 백그라운드 실행
```

## browser_navigate
지정된 URL로 이동합니다.

```bash
# 예: 로컬 개발 서버
http://localhost:3000
```

## browser_screenshot
현재 페이지의 스크린샷을 캡처합니다.

```
- full_page: true - 전체 페이지 캡처
- full_page: false - 현재 뷰포트만 캡처
```

## browser_click
CSS 셀렉터로 요소를 클릭합니다.

```css
/* 예시 */
button[type="submit"]
#login-btn
.nav-link
```

## browser_fill
입력 필드에 텍스트를 입력합니다.

```css
/* 셀렉터 예시 */
input[name="email"]
#password
textarea.comment
```

## browser_get_text
요소의 텍스트 내용을 가져옵니다.

```css
/* 에러 메시지 확인 등 */
.error-message
#result
```

## browser_close
브라우저를 종료합니다.

---

## 사용 예시

### 웹 테스트 워크플로우

```
1. bash_background로 개발 서버 시작
   > npm run dev

2. /tool로 Browser Automation 활성화

3. browser_launch로 브라우저 실행

4. browser_navigate로 localhost:3000 이동

5. browser_screenshot으로 페이지 확인

6. browser_fill, browser_click으로 폼 테스트

7. browser_close로 브라우저 종료

8. bash_background_kill로 서버 종료
```
