#!/usr/bin/env node
/**
 * ADK (Agent Development Kit) 문서 다운로드 스크립트
 * 
 * Google ADK의 llms.txt 내용을 분석하여 카테고리별로 분류하고
 * ~/.open-cli/docs/agent_framework/adk/ 경로에 저장
 * 
 * ## 실행 방법
 * 
 * ```bash
 * # 기본 실행
 * npx tsx scripts/download-adk-docs.ts
 * 
 * # 또는 직접 실행 (실행 권한이 있는 경우)
 * chmod +x scripts/download-adk-docs.ts
 * ./scripts/download-adk-docs.ts
 * ```
 * 
 * ## 기능
 * 
 * 1. llms.txt 다운로드 및 파싱
 * 2. 문서를 카테고리별로 자동 분류:
 *    - agents: Agent 관련 (LLM Agent, Custom Agent, Workflow Agent 등)
 *    - tools: Tools 관련 (Function Tools, MCP Tools, OpenAPI 등)
 *    - sessions: Session/State/Memory 관련
 *    - deploy: 배포 관련 (Cloud Run, Vertex AI, GKE)
 *    - streaming: 스트리밍 관련
 *    - callbacks: 콜백 관련
 *    - mcp: Model Context Protocol 관련
 *    - observability: 모니터링/관찰성 관련
 *    - get-started: 시작 가이드/퀵스타트
 *    - tutorials: 튜토리얼
 *    - other: 기타
 * 3. 병렬 다운로드 (동시 20개)로 빠른 처리
 * 4. 자동 재시도 (최대 3회)
 * 5. GitHub URL을 raw.githubusercontent.com으로 자동 변환
 * 
 * ## 저장 위치
 * 
 * ~/.open-cli/docs/agent_framework/adk/
 * ├── agents/
 * ├── tools/
 * ├── sessions/
 * ├── deploy/
 * └── ...
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import https from 'https';
import http from 'http';

const LLMS_TXT_URL = 'https://raw.githubusercontent.com/google/adk-python/main/llms.txt';
const DOCS_BASE_DIR = path.join(os.homedir(), '.open-cli', 'docs', 'agent_framework', 'adk');

/**
 * GitHub URL을 raw content URL로 변환
 */
function convertToRawUrl(url: string): string {
  // https://github.com/google/adk-docs/blob/main/docs/... 
  // -> https://raw.githubusercontent.com/google/adk-docs/main/docs/...
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }
  return url;
}

/**
 * 카테고리 분류 매핑
 */
const CATEGORY_MAPPING: Record<string, string> = {
  // Agents 관련
  'docs/agents/custom-agents': 'agents',
  'docs/agents/llm-agents': 'agents',
  'docs/agents/models': 'agents',
  'docs/agents/multi-agents': 'agents',
  'docs/agents/workflow-agents/': 'agents',
  'docs/agents/index': 'agents',
  
  // Tools 관련
  'docs/tools/authentication': 'tools',
  'docs/tools/built-in-tools': 'tools',
  'docs/tools/function-tools': 'tools',
  'docs/tools/google-cloud-tools': 'tools',
  'docs/tools/index': 'tools',
  'docs/tools/mcp-tools': 'tools',
  'docs/tools/openapi-tools': 'tools',
  'docs/tools/third-party-tools': 'tools',
  
  // Sessions/Memory 관련
  'docs/sessions/': 'sessions',
  
  // Deploy 관련
  'docs/deploy/': 'deploy',
  
  // Streaming 관련
  'docs/streaming/': 'streaming',
  
  // Callbacks 관련
  'docs/callbacks/': 'callbacks',
  
  // MCP 관련
  'docs/mcp/': 'mcp',
  
  // Observability 관련
  'docs/observability/': 'observability',
  
  // Get Started 관련
  'docs/get-started/': 'get-started',
  
  // Tutorials 관련
  'docs/tutorials/': 'tutorials',
  
  // Runtime 관련
  'docs/runtime/': 'runtime',
  
  // Events 관련
  'docs/events/': 'events',
  
  // Context 관련
  'docs/context/': 'context',
  
  // Artifacts 관련
  'docs/artifacts/': 'artifacts',
  
  // Evaluate 관련
  'docs/evaluate/': 'evaluate',
  
  // Safety 관련
  'docs/safety/': 'safety',
  
  // API Reference 관련
  'docs/api-reference/': 'api-reference',
  
  // Community 관련
  'docs/community': 'community',
  
  // Contributing 관련
  'docs/contributing': 'community',
};

/**
 * URL에서 카테고리 결정
 */
function getCategory(url: string): string {
  const lowerUrl = url.toLowerCase();
  
  // 1. 경로 기반 카테고리 매핑에서 찾기 (우선순위 높음)
  for (const [pattern, category] of Object.entries(CATEGORY_MAPPING)) {
    if (lowerUrl.includes(pattern.toLowerCase())) {
      return category;
    }
  }
  
  // 2. 키워드 기반 분류
  if (lowerUrl.includes('agent')) {
    return 'agents';
  }
  if (lowerUrl.includes('tool')) {
    return 'tools';
  }
  if (lowerUrl.includes('session') || lowerUrl.includes('memory') || lowerUrl.includes('state')) {
    return 'sessions';
  }
  if (lowerUrl.includes('deploy') || lowerUrl.includes('cloud-run') || lowerUrl.includes('gke') || lowerUrl.includes('vertex')) {
    return 'deploy';
  }
  if (lowerUrl.includes('stream')) {
    return 'streaming';
  }
  if (lowerUrl.includes('callback')) {
    return 'callbacks';
  }
  if (lowerUrl.includes('mcp')) {
    return 'mcp';
  }
  if (lowerUrl.includes('observ') || lowerUrl.includes('phoenix') || lowerUrl.includes('arize')) {
    return 'observability';
  }
  if (lowerUrl.includes('quickstart') || lowerUrl.includes('install') || lowerUrl.includes('get-started')) {
    return 'get-started';
  }
  if (lowerUrl.includes('tutorial')) {
    return 'tutorials';
  }
  
  // 기본값
  return 'other';
}

/**
 * HTTP 요청으로 파일 다운로드
 */
function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const location = res.headers.location;
        if (!location) {
          return reject(new Error(`Redirect response from ${url} is missing the Location header.`));
        }
        // 리다이렉트 처리
        return downloadFile(location).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

/**
 * llms.txt 파싱
 */
interface DocEntry {
  title: string;
  url: string;
  rawUrl: string;
  category: string;
}

async function parseLlmsTxt(content: string): Promise<DocEntry[]> {
  const entries: DocEntry[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Markdown 링크 형식: - [Title](URL) 또는 [Title](URL)
    const match = line.match(/^-?\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const title = match[1];
      const url = match[2];
      
      // GitHub docs 링크만 처리
      if (url.includes('github.com/google/adk-docs') && url.endsWith('.md')) {
        const rawUrl = convertToRawUrl(url);
        const category = getCategory(url);
        
        entries.push({
          title,
          url,
          rawUrl,
          category,
        });
      }
    }
  }
  
  return entries;
}

/**
 * 파일명 생성 (URL에서)
 */
function getFilename(url: string, title: string): string {
  // URL에서 파일명 추출
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1] || 'index';
  
  // 경로에서 서브 디렉토리 정보 추출 (workflow-agents 등)
  const docsIndex = parts.findIndex(part => part === 'docs');
  if (docsIndex !== -1 && docsIndex < parts.length - 2) {
    // docs 다음 경로가 있는 경우 prefix로 활용
    const subPath = parts.slice(docsIndex + 1, -1);
    
    // workflow-agents 같은 서브 디렉토리의 경우 prefix 추가
    if (subPath.length > 1) {
      const prefix = subPath.slice(1).join('_');
      const baseFilename = lastPart.endsWith('.md') 
        ? lastPart.replace(/\.md$/, '') 
        : lastPart;
      
      // index 파일의 경우 디렉토리명으로 저장
      if (baseFilename === 'index') {
        return `${prefix}.md`;
      }
      
      return `${prefix}_${baseFilename}.md`;
    }
  }
  
  // .md 확장자가 없으면 추가
  if (!lastPart.endsWith('.md')) {
    return `${lastPart}.md`;
  }
  
  return lastPart;
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('📚 ADK (Agent Development Kit) 문서 다운로드 시작...\n');
  
  try {
    // 1. llms.txt 다운로드
    console.log('1️⃣  llms.txt 다운로드 중...');
    const llmsContent = await downloadFile(LLMS_TXT_URL);
    console.log('   ✅ llms.txt 다운로드 완료\n');
    
    // 2. 문서 목록 파싱
    console.log('2️⃣  문서 목록 파싱 중...');
    const entries = await parseLlmsTxt(llmsContent);
    console.log(`   ✅ ${entries.length}개 문서 발견\n`);
    
    if (entries.length === 0) {
      console.log('⚠️  파싱된 문서가 없습니다. llms.txt 형식을 확인해주세요.');
      console.log('\n📄 llms.txt 내용 미리보기:\n');
      console.log(llmsContent.slice(0, 2000));
      return;
    }
    
    // 3. 카테고리별 통계
    const categoryStats: Record<string, number> = {};
    for (const entry of entries) {
      categoryStats[entry.category] = (categoryStats[entry.category] || 0) + 1;
    }
    
    console.log('📊 카테고리별 문서 수:');
    for (const [category, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
      console.log(`   - ${category}: ${count}개`);
    }
    console.log();
    
    // 4. 디렉토리 생성
    console.log('3️⃣  디렉토리 생성 중...');
    const categories = new Set(entries.map(e => e.category));
    for (const category of categories) {
      const dir = path.join(DOCS_BASE_DIR, category);
      await fs.mkdir(dir, { recursive: true });
      console.log(`   ✅ ${category}/ 디렉토리 생성`);
    }
    console.log();
    
    // 5. 문서 다운로드 (병렬 처리)
    console.log('4️⃣  문서 다운로드 중...');
    console.log(`   동시 다운로드 수: 20개 (병렬 처리로 속도 향상)\n`);
    
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;
    let completedCount = 0;
    const CONCURRENT_DOWNLOADS = 20; // 동시 다운로드 수
    
    // 진행률 업데이트 함수 (동기화)
    const updateProgress = (status: 'success' | 'fail' | 'skip', category: string, filename: string, error?: string) => {
      if (status === 'success') successCount++;
      else if (status === 'fail') failCount++;
      else if (status === 'skip') skipCount++;
      
      completedCount++;
      const progress = (completedCount / entries.length * 100).toFixed(1);
      const statusIcon = status === 'success' ? '✅' : status === 'fail' ? '❌' : '⏭️ ';
      const message = status === 'fail' && error 
        ? `${statusIcon} ${category}/${filename}: ${error}`
        : status === 'skip'
        ? `${statusIcon} ${category}/${filename} (이미 존재)`
        : `${statusIcon} ${category}/${filename}`;
      
      process.stdout.write(`\r   진행률: ${progress}% (${completedCount}/${entries.length}) - ${message.padEnd(80)}`);
    };
    
    // 병렬 다운로드를 위한 큐 관리
    const activeDownloads = new Set<Promise<void>>();
    
    // 단일 파일 다운로드 함수
    const downloadSingleFile = async (entry: DocEntry): Promise<void> => {
      const category = entry.category;
      const filename = getFilename(entry.url, entry.title);
      const filePath = path.join(DOCS_BASE_DIR, category, filename);
      
      try {
        // 파일이 이미 존재하면 스킵
        try {
          await fs.access(filePath);
          updateProgress('skip', category, filename);
          return;
        } catch {
          // 파일이 없으면 다운로드 진행
        }
        
        // 다운로드 시도 (최대 3회 재시도)
        let retries = 3;
        let content: string | null = null;
        
        while (retries > 0) {
          try {
            content = await downloadFile(entry.rawUrl);
            break;
          } catch (error) {
            retries--;
            if (retries > 0) {
              // 재시도 전 짧은 대기
              await new Promise(resolve => setTimeout(resolve, 500));
            } else {
              throw error;
            }
          }
        }
        
        if (!content) {
          throw new Error('Failed to download after retries');
        }
        
        // Markdown 메타데이터 추가
        const markdownContent = `# ${entry.title}

> Original Document: [${entry.title}](${entry.url})
> Category: ${category}
> Downloaded: ${new Date().toISOString()}

---

${content}`;
        
        await fs.writeFile(filePath, markdownContent, 'utf-8');
        updateProgress('success', category, filename);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        updateProgress('fail', category, filename, errorMessage);
      }
    };
    
    // 병렬 다운로드 실행
    let currentIndex = 0;
    
    // 초기 배치 시작
    while (currentIndex < entries.length) {
      // 동시 다운로드 수만큼 작업 시작
      while (activeDownloads.size < CONCURRENT_DOWNLOADS && currentIndex < entries.length) {
        const entry = entries[currentIndex]!;
        currentIndex++;
        
        const downloadPromise = downloadSingleFile(entry).finally(() => {
          activeDownloads.delete(downloadPromise);
        });
        
        activeDownloads.add(downloadPromise);
      }
      
      // 하나라도 완료될 때까지 대기
      if (activeDownloads.size > 0) {
        await Promise.race(activeDownloads);
      }
    }
    
    // 남은 모든 다운로드 완료 대기
    await Promise.all(activeDownloads);
    
    console.log('\n'); // 진행률 표시 후 줄바꿈
    
    console.log('📊 다운로드 결과:');
    console.log(`   ✅ 성공: ${successCount}개`);
    console.log(`   ⏭️  스킵: ${skipCount}개 (이미 존재)`);
    console.log(`   ❌ 실패: ${failCount}개`);
    console.log(`   📈 총 처리: ${successCount + skipCount + failCount}/${entries.length}개`);
    console.log();
    
    // 6. 카테고리별 README 생성
    console.log('5️⃣  카테고리별 README 생성 중...');
    for (const category of categories) {
      const categoryEntries = entries.filter(e => e.category === category);
      const readmePath = path.join(DOCS_BASE_DIR, category, 'README.md');
      
      const readmeContent = `# ${category.toUpperCase()} 관련 문서

이 디렉토리에는 Google ADK (Agent Development Kit)의 ${category} 관련 문서들이 포함되어 있습니다.

## 문서 목록

${categoryEntries.map((e, idx) => `### ${idx + 1}. ${e.title}

- [${e.title}](${getFilename(e.url, e.title)})
- 원본: [${e.url}](${e.url})

`).join('\n')}

## 총 문서 수

${categoryEntries.length}개 문서

---

> 자동 생성됨: ${new Date().toISOString()}
`;
      
      await fs.writeFile(readmePath, readmeContent, 'utf-8');
      console.log(`   ✅ ${category}/README.md 생성`);
    }
    console.log();
    
    // 7. 메인 README 생성
    console.log('6️⃣  메인 README 생성 중...');
    const mainReadmePath = path.join(DOCS_BASE_DIR, 'README.md');
    const mainReadmeContent = `# ADK (Agent Development Kit) 프레임워크 문서

이 디렉토리에는 Google ADK 프레임워크의 전체 문서가 카테고리별로 정리되어 있습니다.

## ADK 소개

Agent Development Kit (ADK)는 Google에서 개발한 오픈소스, 코드 우선(code-first) Python 툴킷으로,
AI 에이전트를 빌드, 평가, 배포하기 위한 유연하고 모듈식 프레임워크입니다.

### 주요 특징

- **Rich Tool Ecosystem**: 사전 빌드된 도구, 커스텀 함수, OpenAPI 스펙 활용
- **Code-First Development**: Python으로 에이전트 로직 직접 정의
- **Modular Multi-Agent Systems**: 여러 전문 에이전트를 유연한 계층 구조로 구성
- **Deploy Anywhere**: Cloud Run, Vertex AI Agent Engine 등에 배포 가능

## 카테고리 목록

${Array.from(categories).sort().map(category => {
  const count = entries.filter(e => e.category === category).length;
  return `### ${category.toUpperCase()}

- 경로: [${category}/](./${category}/)
- 문서 수: ${count}개
- [README](./${category}/README.md)`;
}).join('\n\n')}

## 통계

- 총 문서 수: ${entries.length}개
- 카테고리 수: ${categories.size}개

## 사용 방법

이 문서들은 OPEN-CLI의 프레임워크 문서 자동 참조 시스템에서 사용됩니다.

프레임워크 매핑 설정:
\`\`\`bash
open docs framework --add
# 프레임워크 이름: ADK
# 키워드: ADK,adk,Agent Development Kit,google-adk
# 문서 경로: agent_framework/adk/**/*.md
\`\`\`

## 설치 방법

\`\`\`bash
# 안정 버전 (권장)
pip install google-adk

# 개발 버전
pip install git+https://github.com/google/adk-python.git@main
\`\`\`

## 원본 문서

- GitHub Repository: [https://github.com/google/adk-python](https://github.com/google/adk-python)
- 문서 Repository: [https://github.com/google/adk-docs](https://github.com/google/adk-docs)

---

> 자동 생성됨: ${new Date().toISOString()}
`;
    
    await fs.writeFile(mainReadmePath, mainReadmeContent, 'utf-8');
    console.log('   ✅ README.md 생성 완료\n');
    
    console.log('✅ 모든 작업 완료!');
    console.log(`📁 문서 위치: ${DOCS_BASE_DIR}\n`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

// 실행
main().catch(console.error);




