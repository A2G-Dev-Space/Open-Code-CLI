# Getting Started

Nexus Coder를 시작하는 방법을 안내합니다.

## 요구 사항

- **OS**: Linux (x64)
- **네트워크**: 사내망 접속 가능
- **기타**: Node.js 설치 불필요 (단일 바이너리 실행)

## 설치

### 1. 바이너리 다운로드

```bash
# 다운로드 폴더 생성
mkdir -p ~/nexus-download && cd ~/nexus-download

# nexus.gz 다운로드 (39MB)
wget https://github.samsungds.net/syngha-han/nexus-coder/raw/main/nexus.gz --no-check-certificate

# yoga.wasm 다운로드 (87KB)
wget https://github.samsungds.net/syngha-han/nexus-coder/raw/main/yoga.wasm --no-check-certificate
```

### 2. 압축 해제 및 실행

```bash
# 압축 해제
gunzip nexus.gz

# 실행 권한 부여
chmod +x nexus

# 첫 실행 (자동 설치 진행)
./nexus
```

::: tip
첫 실행 시 자동으로 `~/.local/bin/`에 설치되고 PATH가 설정됩니다.
:::

### 3. 셸 리로드

```bash
source ~/.bashrc   # 또는 source ~/.zshrc
```

자세한 설치 방법은 [Installation](/guide/installation)을 참조하세요.

## 첫 실행

```bash
nexus
```

첫 실행 시:
1. SSO 로그인 페이지가 브라우저에서 열립니다
2. Samsung 계정으로 로그인합니다
3. 로그인 완료 후 CLI로 돌아갑니다

## 기본 사용법

### 대화형 모드

```bash
nexus
```

프롬프트가 표시되면 자연어로 요청을 입력합니다:

```
> src 폴더의 구조를 알려줘
> package.json에서 버전을 확인해줘
> index.ts 파일을 읽고 분석해줘
```

### 주요 단축키

| 키 | 기능 |
|----|------|
| `Tab` | Auto ↔ Supervised 모드 전환 |
| `@` | 파일 브라우저 |
| `/` | 명령어 자동완성 |
| `ESC` | 현재 작업 중단 |
| `Ctrl+C` | 종료 |

## 다음 단계

- [기본 사용법](/guide/basic-usage) 알아보기
- [고급 사용법](/guide/advanced-usage) 알아보기
