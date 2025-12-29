# Installation

## NPM을 통한 설치

```bash
npm install -g nexus-coder
```

## 바이너리 설치 (폐쇄망)

폐쇄망 환경에서는 사전 빌드된 바이너리를 사용할 수 있습니다.

```bash
# 바이너리 압축 해제
gunzip nexus.gz

# 실행 권한 부여
chmod +x nexus

# PATH에 추가 또는 직접 실행
./nexus
```

## 소스에서 빌드

```bash
git clone <repository>
cd nexus-coder
npm install
npm run build
```
