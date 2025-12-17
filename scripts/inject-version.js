#!/usr/bin/env node
/**
 * 버전 자동 주입 스크립트
 *
 * package.json의 버전을 constants.ts에 자동으로 주입합니다.
 * bun:build 전에 실행됩니다.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '../package.json');
const constantsPath = join(__dirname, '../src/constants.ts');

async function injectVersion() {
  try {
    // package.json에서 버전 읽기
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
    const version = packageJson.version;

    // constants.ts 읽기
    let content = await readFile(constantsPath, 'utf-8');

    // APP_VERSION 교체
    const versionRegex = /export const APP_VERSION = '[^']+';/;
    if (versionRegex.test(content)) {
      content = content.replace(versionRegex, `export const APP_VERSION = '${version}';`);
      await writeFile(constantsPath, content, 'utf-8');
      console.log(`Version injected: ${version}`);
    } else {
      console.error('Could not find APP_VERSION in constants.ts');
      process.exit(1);
    }

  } catch (error) {
    console.error('Failed to inject version:', error.message);
    process.exit(1);
  }
}

injectVersion();
