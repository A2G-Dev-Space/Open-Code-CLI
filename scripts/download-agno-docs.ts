#!/usr/bin/env node
/**
 * AGNO 문서 다운로드 스크립트
 * 
 * llms.txt 내용을 분석하여 카테고리별로 분류하고
 * ~/.open-cli/docs/agent_framework/agno/ 경로에 저장
 * 
 * ## 실행 방법
 * 
 * ```bash
 * # 기본 실행
 * npx tsx scripts/download-agno-docs.ts
 * 
 * # 또는 직접 실행 (실행 권한이 있는 경우)
 * chmod +x scripts/download-agno-docs.ts
 * ./scripts/download-agno-docs.ts
 * ```
 * 
 * ## 기능
 * 
 * 1. llms.txt 다운로드 및 파싱
 * 2. 문서를 카테고리별로 자동 분류:
 *    - agent: AgentOS, Agents 관련
 *    - rag: RAG/Knowledge 관련
 *    - memory: Memory 관련
 *    - models: Models 관련 (LiteLLM 포함)
 *    - workflows: Workflows 관련
 *    - teams: Teams 관련
 *    - database: Database 관련
 *    - vector_db: Vector DB 관련
 *    - tools: Tools 관련
 *    - templates: Templates 관련
 *    - tutorials: Tutorials 관련
 *    - other: 기타
 * 3. 병렬 다운로드 (동시 20개)로 빠른 처리
 * 4. 자동 재시도 (최대 3회)
 * 5. models/{model_name}/* 경로의 파일은 파일명에 모델명 prefix 추가
 *    예: examples/models/gemini/video_input_bytes_content.md 
 *        → gemini_video_input_bytes_content.md
 * 
 * ## 저장 위치
 * 
 * ~/.open-cli/docs/agent_framework/agno/
 * ├── agent/
 * ├── rag/
 * ├── memory/
 * ├── models/
 * └── ...
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import https from 'https';
import http from 'http';

const BASE_URL = 'https://docs.agno.com';
const LLMS_TXT_URL = 'https://docs.agno.com/llms.txt';
const DOCS_BASE_DIR = path.join(os.homedir(), '.open-cli', 'docs', 'agent_framework', 'agno');

/**
 * 카테고리 분류 매핑
 */
const CATEGORY_MAPPING: Record<string, string> = {
  // Agent 관련
  'agent-os/': 'agent',
  'concepts/agents/': 'agent',
  'agent-os/api.md': 'agent',
  'agent-os/introduction.md': 'agent',
  'agent-os/creating-your-first-os.md': 'agent',
  'agent-os/connecting-your-os.md': 'agent',
  'agent-os/control-plane.md': 'agent',
  'agent-os/agent-ui.md': 'agent',
  
  // Memory 관련
  'concepts/agents/memory.md': 'memory',
  'agent-os/features/memories.md': 'memory',
  'concepts/agents/sessions.md': 'memory',
  'agent-os/features/session-tracking.md': 'memory',
  'reference/memory/': 'memory',
  
  // RAG/Knowledge 관련
  'concepts/agents/knowledge.md': 'rag',
  'agent-os/features/knowledge-management.md': 'rag',
  'agent-os/customize/os/manage_knowledge.md': 'rag',
  'reference/knowledge/': 'rag',
  
  // MCP 관련
  'agent-os/mcp/': 'mcp',
  
  // Tools 관련
  'concepts/agents/tools.md': 'tools',
  'reference/tools/': 'tools',
  
  // Database 관련
  'concepts/db/': 'database',
  'reference/storage/': 'database',
  
  // Vector DB 관련
  'reference/vector_db/': 'vector_db',
  
  // Workflows 관련
  'reference/workflows/': 'workflows',
  'concepts/workflows/': 'workflows',
  
  // Models 관련
  'reference/models/': 'models',
  
  // Storage 관련
  'concepts/agents/storage.md': 'storage',
  
  // Teams 관련
  'reference/teams/': 'teams',
  
  // Guardrails 관련
  'concepts/agents/guardrails/': 'guardrails',
  
  // Templates 관련
  'templates/': 'templates',
  
  // Tutorials 관련
  'tutorials/': 'tutorials',
  
  // AgentOS Customize 관련
  'agent-os/customize/': 'agent',
  
  // AgentOS Features 관련
  'agent-os/features/chat-interface.md': 'agent',
  
  // AgentOS Interfaces 관련
  'agent-os/interfaces/': 'agent',
  
  // AgentOS Security 관련
  'agent-os/security.md': 'agent',
};

/**
 * URL에서 카테고리 결정
 */
function getCategory(url: string): string {
  // URL에서 경로 추출
  const urlPath = url.replace(BASE_URL, '').replace(/^\//, '');
  const lowerPath = urlPath.toLowerCase();
  
  // 1. 경로 기반 카테고리 매핑에서 찾기 (우선순위 높음)
  for (const [pattern, category] of Object.entries(CATEGORY_MAPPING)) {
    if (urlPath.includes(pattern)) {
      return category;
    }
  }
  
  // 2. 파일명 기반 키워드 분류 (경로 매핑에 없는 경우)
  // 파일명 추출 (마지막 경로 부분)
  const filename = urlPath.split('/').pop() || urlPath;
  const lowerFilename = filename.toLowerCase();
  
  // 구체적인 키워드부터 체크 (우선순위 순)
  
  // Vector DB 관련 (vector가 포함된 경우)
  if (lowerFilename.includes('vector') || lowerPath.includes('vector')) {
    return 'vector_db';
  }
  
  // RAG 관련
  if (lowerFilename.includes('rag') || lowerPath.includes('rag')) {
    return 'rag';
  }
  
  // Workflow 관련
  if (lowerFilename.includes('workflow') || lowerPath.includes('workflow')) {
    return 'workflows';
  }
  
  // Team 관련
  if (lowerFilename.includes('team') || lowerPath.includes('team')) {
    return 'teams';
  }
  
  // Memory 관련
  if (lowerFilename.includes('memory') || lowerPath.includes('memory')) {
    return 'memory';
  }
  
  // Tool 관련
  if (lowerFilename.includes('tool') || lowerPath.includes('tool')) {
    return 'tools';
  }
  
  // Database 관련 (vector_db는 이미 처리됨)
  // db로 끝나거나 _db, -db, database 포함 (단, vector_db 제외)
  // 단, 'db'가 포함되어 있으면서 vector가 아닌 경우
  const hasDbPattern = lowerFilename.includes('database') || 
                       lowerFilename.includes('_db') || 
                       lowerFilename.includes('-db') || 
                       lowerFilename.match(/[a-z]+db\.md?$/i) || // mongodb, duckdb 등
                       lowerPath.includes('database');
  const isVectorDb = lowerFilename.includes('vector') || lowerPath.includes('vector');
  
  if (hasDbPattern && !isVectorDb) {
    return 'database';
  }
  
  // Model 관련 (LiteLLM 포함)
  if (lowerFilename.includes('model') || lowerPath.includes('model') || 
      lowerPath.includes('litellm')) {
    return 'models';
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
        // 리다이렉트 처리
        return downloadFile(res.headers.location || url).then(resolve).catch(reject);
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
  category: string;
}

async function parseLlmsTxt(content: string): Promise<DocEntry[]> {
  const entries: DocEntry[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Markdown 링크 형식: [Title](URL)
    const match = line.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const title = match[1];
      const url = match[2];
      const category = getCategory(url);
      
      entries.push({
        title,
        url: url.startsWith('http') ? url : `${BASE_URL}/${url}`,
        category,
      });
    }
  }
  
  return entries;
}

/**
 * 파일명 생성 (URL에서)
 */
function getFilename(url: string, title: string): string {
  // URL에서 파일명 추출
  const urlPath = url.replace(BASE_URL, '').replace(/^\//, '');
  const pathParts = urlPath.split('/');
  const lastPart = pathParts[pathParts.length - 1] || 'index';
  
  // models/{model_name}/* 또는 examples/models/{model_name}/* 형태인 경우 모델명을 prefix로 추가
  const modelsIndex = pathParts.findIndex(part => part === 'models');
  if (modelsIndex !== -1 && modelsIndex < pathParts.length - 2) {
    // models 다음에 모델명이 있는지 확인
    const modelName = pathParts[modelsIndex + 1];
    if (modelName && modelName !== 'models' && modelName !== 'examples') {
      // 파일명에 모델명 prefix 추가
      const baseFilename = lastPart.endsWith('.md') 
        ? lastPart.replace(/\.md$/, '') 
        : lastPart;
      return `${modelName}_${baseFilename}.md`;
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
  console.log('📚 AGNO 문서 다운로드 시작...\n');
  
  try {
    // 1. llms.txt 다운로드
    console.log('1️⃣  llms.txt 다운로드 중...');
    const llmsContent = await downloadFile(LLMS_TXT_URL);
    console.log('   ✅ llms.txt 다운로드 완료\n');
    
    // 2. 문서 목록 파싱
    console.log('2️⃣  문서 목록 파싱 중...');
    const entries = await parseLlmsTxt(llmsContent);
    console.log(`   ✅ ${entries.length}개 문서 발견\n`);
    
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
      
      process.stdout.write(`\r   진행률: ${progress}% (${completedCount}/${entries.length}) - ${message}`);
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
            content = await downloadFile(entry.url);
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

이 디렉토리에는 AGNO의 ${category} 관련 문서들이 포함되어 있습니다.

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
    const mainReadmeContent = `# AGNO 프레임워크 문서

이 디렉토리에는 AGNO 프레임워크의 전체 문서가 카테고리별로 정리되어 있습니다.

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
# 프레임워크 이름: AGNO
# 키워드: AGNO,agno,Agno Framework
# 문서 경로: agent_framework/agno/**/*.md
\`\`\`

## 원본 문서

원본 문서는 [https://docs.agno.com](https://docs.agno.com)에서 확인할 수 있습니다.

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

