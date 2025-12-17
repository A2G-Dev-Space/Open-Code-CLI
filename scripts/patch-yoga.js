#!/usr/bin/env node
/**
 * yoga-wasm-web 패치 스크립트
 *
 * Bun 바이너리에서 yoga.wasm을 찾을 수 있도록 node.js 로더를 패치합니다.
 * process.execPath 기준으로 yoga.wasm을 찾도록 수정합니다.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const nodeJsPath = join(__dirname, '../node_modules/yoga-wasm-web/dist/node.js');

async function patchYoga() {
  try {
    let content = await readFile(nodeJsPath, 'utf-8');

    // 이미 패치되었으면 원본으로 복원 후 다시 패치
    if (content.includes('YOGA_PATCHED')) {
      console.log('Removing old patch and re-applying...');
      // 이전 패치를 제거 (YOGA_PATCHED 부터 Yoga= 정의까지)
      content = content.replace(/\/\* YOGA_PATCHED \*\/[\s\S]*?let Yoga=await a\(await E\([^)]+\)\);/, 'let Yoga=await a(await E(_(import.meta.url).resolve("./yoga.wasm")));');
    }

    // 기존 코드:
    // let Yoga=await a(await E(_(import.meta.url).resolve("./yoga.wasm")));

    // 패치된 코드:
    // 바이너리 모드(process.pkg 또는 Bun 컴파일)면 process.execPath 기준으로 찾음
    const originalLine = 'let Yoga=await a(await E(_(import.meta.url).resolve("./yoga.wasm")));';

    const patchedCode = `
/* YOGA_PATCHED */
import{dirname as __dirname_patch,join as __join_patch,basename as __basename_patch}from"node:path";
let __yogaWasmPath;
const __execName=__basename_patch(process.execPath);
const __isBinary=process.pkg||__execName==="nexus"||__execName.startsWith("nexus-")||!__execName.includes("node")&&!__execName.includes("bun");
if(__isBinary){
  __yogaWasmPath=__join_patch(__dirname_patch(process.execPath),"yoga.wasm");
}else{
  __yogaWasmPath=_(import.meta.url).resolve("./yoga.wasm");
}
let Yoga=await a(await E(__yogaWasmPath));`;

    if (!content.includes(originalLine)) {
      console.log('Warning: Original yoga-wasm-web code not found, trying alternative patch...');

      // 대안: 마지막 export 전에 패치 삽입
      // 기존 Yoga 변수 선언을 찾아서 교체
      const yogaVarMatch = content.match(/let Yoga=await a\(await E\([^)]+\)\);/);
      if (yogaVarMatch) {
        content = content.replace(
          yogaVarMatch[0],
          patchedCode
        );
      } else {
        console.error('Could not find Yoga initialization code to patch');
        process.exit(1);
      }
    } else {
      content = content.replace(originalLine, patchedCode);
    }

    await writeFile(nodeJsPath, content, 'utf-8');
    console.log('yoga-wasm-web patched successfully');

  } catch (error) {
    console.error('Failed to patch yoga-wasm-web:', error.message);
    process.exit(1);
  }
}

patchYoga();
