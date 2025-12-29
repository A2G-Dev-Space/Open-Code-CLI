# Finding and Fixing Issues

버그의 원인을 찾고 효율적으로 수정하는 방법을 알아봅니다.

## 데모 영상

<video controls width="100%">
  <source src="/videos/issue-fixing.mp4" type="video/mp4">
</video>

## 활용 예시

### 에러 원인 분석

```
> 이 에러 메시지가 왜 발생하는지 분석해줘
> TypeError: Cannot read property 'id' of undefined 원인이 뭐야?
```

### 버그 위치 찾기

```
> 로그인이 안 되는 버그 원인을 찾아줘
> 이 함수가 null을 반환하는 이유가 뭐야?
> 무한 루프가 발생하는 곳을 찾아줘
```

### 버그 수정

```
> 이 버그를 수정해줘
> null 체크를 추가해서 에러를 방지해줘
> 경쟁 상태(race condition)를 해결해줘
```

### 테스트 및 검증

```
> 수정한 코드가 다른 곳에 영향을 주는지 확인해줘
> 이 함수에 대한 테스트 케이스를 작성해줘
```

## 팁

- 에러 메시지나 스택 트레이스를 그대로 붙여넣으세요
- Supervised 모드(`Tab`)로 수정 전 검토할 수 있습니다
- `/compact`로 컨텍스트를 정리하면서 진행하세요
