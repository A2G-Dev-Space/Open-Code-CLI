#!/usr/bin/env node

/**
 * OPEN-CLI
 * 오프라인 기업 환경을 위한 완전한 로컬 LLM CLI 플랫폼
 *
 * Entry Point: CLI 애플리케이션의 진입점
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import React from 'react';
import { render } from 'ink';
import { configManager } from './core/config-manager.js';
import { createLLMClient, LLMClient } from './core/llm-client.js';
import { EndpointConfig } from './types/index.js';
import { PlanExecuteApp } from './ui/components/PlanExecuteApp.js';
import { setupLogging } from './utils/logger.js';

const program = new Command();

/**
 * CLI 프로그램 설정
 */
program.name('open').description('OPEN-CLI - 오프라인 기업용 AI 코딩 어시스턴트').version('0.1.0');

/**
 * 기본 명령어: 대화형 모드 시작
 */
program
  .option('--verbose', 'Enable verbose logging (shows detailed error messages, HTTP requests, tool execution)')
  .option('--debug', 'Enable debug logging (shows all debug information)')
  .action(async (options: { verbose?: boolean; debug?: boolean }) => {
  let cleanup: (() => Promise<void>) | null = null;
  try {
    // Setup logging (log level, JSON stream logger, exit handlers)
    const loggingSetup = await setupLogging({
      verbose: options.verbose,
      debug: options.debug,
    });
    cleanup = loggingSetup.cleanup;

    // ConfigManager 초기화 확인
    const isInitialized = await configManager.isInitialized();
    if (!isInitialized) {
      console.log(chalk.cyan.bold('\n╔════════════════════════════════════════════════════════════╗'));
      console.log(chalk.cyan.bold('║                     OPEN-CLI v0.1.0                        ║'));
      console.log(chalk.cyan.bold('║              오프라인 기업용 AI 코딩 어시스턴트              ║'));
      console.log(chalk.cyan.bold('╚════════════════════════════════════════════════════════════╝\n'));

      console.log(chalk.yellow('⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
      console.log(chalk.white('먼저 초기화를 진행해주세요:\n'));
      console.log(chalk.green('  $ open config init\n'));
      return;
    }

    await configManager.initialize();

    // LLMClient 생성
    const llmClient = createLLMClient();
    const modelInfo = llmClient.getModelInfo();

    // Ink UI 시작
    console.log(chalk.cyan('🚀 Starting Ink UI...\n'));

    // Ink UI를 같은 프로세스에서 직접 렌더링 (stdin raw mode 유지)
    try {
      // Use PlanExecuteApp for enhanced functionality
      const AppComponent = PlanExecuteApp; // Always use PlanExecuteApp now
      const { waitUntilExit } = render(React.createElement(AppComponent, { llmClient, modelInfo }));

      // Wait until the UI exits before cleanup
      await waitUntilExit();
    } catch (error) {
      console.log(chalk.yellow('\n⚠️  Ink UI를 시작할 수 없습니다.\n'));
      console.log(chalk.dim(`Error: ${error instanceof Error ? error.message : String(error)}\n`));
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\n❌ 에러 발생:'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    console.log();
    process.exit(1);
  } finally {
    // JSON Stream Logger 정리
    if (cleanup) {
      await cleanup();
    }
  }
});

/**
 * config 명령어
 */
const configCommand = program.command('config').description('설정 관리');

/**
 * config init - OPEN-CLI 초기화
 */
configCommand
  .command('init')
  .description('OPEN-CLI 초기화 (엔드포인트 설정 및 연결 확인)')
  .action(async () => {
    try {
      console.log(chalk.cyan.bold('\n🚀 OPEN-CLI 초기화\n'));

      // 1. 디렉토리 초기화
      const isInitialized = await configManager.isInitialized();

      if (isInitialized) {
        // 이미 초기화되어 있으면 엔드포인트 추가 여부 확인
        await configManager.initialize();

        if (configManager.hasEndpoints()) {
          console.log(chalk.yellow('⚠️  이미 초기화되어 있습니다.'));
          console.log(chalk.white('설정 확인: open config show'));
          console.log(chalk.white('설정 초기화: open config reset\n'));
          return;
        }
      } else {
        // 디렉토리 생성
        await configManager.initialize();
        console.log(chalk.green('✅ 디렉토리 생성 완료\n'));
      }

      // 2. 사용자 입력 받기
      console.log(chalk.white('엔드포인트 정보를 입력해주세요:\n'));

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '엔드포인트 이름:',
          default: 'My LLM Endpoint',
          validate: (input: string) =>
            input.trim().length > 0 || '이름을 입력해주세요.',
        },
        {
          type: 'input',
          name: 'baseUrl',
          message: 'Base URL (HTTP/HTTPS):',
          default: 'https://generativelanguage.googleapis.com/v1beta/openai/',
          validate: (input: string) => {
            const trimmed = input.trim();
            if (!trimmed) return 'URL을 입력해주세요.';
            if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
              return 'URL은 http:// 또는 https://로 시작해야 합니다.';
            }
            return true;
          },
        },
        {
          type: 'password',
          name: 'apiKey',
          message: 'API Key (선택사항, Enter 키 입력 시 스킵):',
          mask: '*',
        },
        {
          type: 'input',
          name: 'modelId',
          message: 'Model ID:',
          default: 'gemini-2.0-flash',
          validate: (input: string) =>
            input.trim().length > 0 || 'Model ID를 입력해주세요.',
        },
        {
          type: 'input',
          name: 'modelName',
          message: 'Model 이름 (표시용):',
          default: 'Gemini 2.0 Flash',
        },
        {
          type: 'input',
          name: 'maxTokens',
          message: 'Max Tokens:',
          default: '1048576',
          validate: (input: string) => {
            const num = parseInt(input);
            return !isNaN(num) && num > 0 || 'Max Tokens는 양수여야 합니다.';
          },
        },
      ]);

      // 3. 연결 테스트
      console.log(chalk.cyan('\n🔍 엔드포인트 연결 테스트 중...\n'));

      const spinner = ora('연결 확인 중...').start();

      const testResult = await LLMClient.testConnection(
        answers.baseUrl.trim(),
        answers.apiKey?.trim() || '',
        answers.modelId.trim()
      );

      if (!testResult.success) {
        spinner.fail('연결 실패');
        console.log(chalk.red('\n❌ ' + testResult.error + '\n'));
        console.log(chalk.yellow('설정을 확인하고 다시 시도해주세요.\n'));
        process.exit(1);
      }

      spinner.succeed('연결 성공!');

      // 4. 설정 저장
      const endpointId = 'ep-' + Date.now();
      const endpoint: EndpointConfig = {
        id: endpointId,
        name: answers.name.trim(),
        baseUrl: answers.baseUrl.trim(),
        apiKey: answers.apiKey?.trim() || undefined,
        models: [
          {
            id: answers.modelId.trim(),
            name: answers.modelName.trim(),
            maxTokens: parseInt(answers.maxTokens),
            enabled: true,
            healthStatus: 'healthy',
            lastHealthCheck: new Date(),
          },
        ],
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await configManager.createInitialEndpoint(endpoint);

      console.log(chalk.green('\n✅ 초기화 완료!\n'));

      console.log(chalk.white('생성된 디렉토리:'));
      console.log(chalk.dim('  ~/.open-cli/'));
      console.log(chalk.dim('  ~/.open-cli/config.json'));
      console.log(chalk.dim('  ~/.open-cli/docs/'));
      console.log(chalk.dim('  ~/.open-cli/backups/'));
      console.log(chalk.dim('  ~/.open-cli/projects/\n'));

      console.log(chalk.green('📡 등록된 엔드포인트:'));
      console.log(chalk.white('  이름: ' + endpoint.name));
      console.log(chalk.white('  URL: ' + endpoint.baseUrl));
      console.log(chalk.white('  모델: ' + (endpoint.models[0]?.name || '') + ' (' + (endpoint.models[0]?.id || '') + ')'));
      console.log(chalk.white('  상태: 🟢 연결 확인됨\n'));

      console.log(chalk.cyan('다음 단계:'));
      console.log(chalk.white('  open  - 대화형 모드 시작\n'));
    } catch (error) {
      console.error(chalk.red('\n❌ 초기화 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      console.log();
      process.exit(1);
    }
  });

/**
 * config show - 현재 설정 표시
 */
configCommand
  .command('show')
  .description('현재 설정 표시')
  .action(async () => {
    try {
      const isInitialized = await configManager.isInitialized();

      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        console.log(chalk.white('초기화: open config init\n'));
        return;
      }

      await configManager.initialize();

      const config = configManager.getConfig();
      const endpoint = configManager.getCurrentEndpoint();
      const model = configManager.getCurrentModel();

      console.log(chalk.cyan.bold('\n📋 OPEN-CLI 설정\n'));

      console.log(chalk.yellow('현재 엔드포인트:'));
      if (endpoint) {
        console.log(chalk.white('  ID: ' + endpoint.id));
        console.log(chalk.white('  이름: ' + endpoint.name));
        console.log(chalk.white('  URL: ' + endpoint.baseUrl));
        console.log(chalk.white('  API Key: ' + (endpoint.apiKey ? '********' : '(없음)')));
        console.log(chalk.white('  우선순위: ' + (endpoint.priority || 'N/A') + '\n'));
      } else {
        console.log(chalk.red('  (설정되지 않음)\n'));
      }

      console.log(chalk.yellow('현재 모델:'));
      if (model) {
        console.log(chalk.white('  ID: ' + model.id));
        console.log(chalk.white('  이름: ' + model.name));
        console.log(chalk.white('  최대 토큰: ' + model.maxTokens.toLocaleString()));
        console.log(chalk.white('  상태: ' + (model.enabled ? '✅ 활성' : '❌ 비활성')));
        console.log(
          chalk.white(
            '  헬스: ' + (model.healthStatus === 'healthy' ? '🟢 정상' : model.healthStatus === 'degraded' ? '🟡 저하됨' : '🔴 비정상') + '\n'
          )
        );
      } else {
        console.log(chalk.red('  (설정되지 않음)\n'));
      }

      console.log(chalk.yellow('전체 설정:'));
      console.log(chalk.white('  버전: ' + config.version));
      console.log(chalk.white('  등록된 엔드포인트: ' + config.endpoints.length + '개'));
      console.log(chalk.white('  자동 승인: ' + (config.settings.autoApprove ? '✅ ON' : '❌ OFF')));
      console.log(chalk.white('  디버그 모드: ' + (config.settings.debugMode ? '✅ ON' : '❌ OFF')));
      console.log(
        chalk.white('  스트리밍 응답: ' + (config.settings.streamResponse ? '✅ ON' : '❌ OFF'))
      );
      console.log(chalk.white('  자동 저장: ' + (config.settings.autoSave ? '✅ ON' : '❌ OFF') + '\n'));
    } catch (error) {
      console.error(chalk.red('❌ 설정 조회 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      process.exit(1);
    }
  });

/**
 * config reset - 설정 초기화
 */
configCommand
  .command('reset')
  .description('설정 초기화 (공장 초기화)')
  .action(async () => {
    try {
      const isInitialized = await configManager.isInitialized();

      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        console.log(chalk.white('초기화: open config init\n'));
        return;
      }

      console.log(chalk.yellow('\n⚠️  경고: 모든 설정이 초기화됩니다.'));
      console.log(chalk.white('세션 및 백업은 유지됩니다.\n'));

      // 실제 프로덕션에서는 inquirer로 확인 받기
      await configManager.initialize();
      await configManager.reset();

      console.log(chalk.green('✅ 설정이 초기화되었습니다.\n'));
    } catch (error) {
      console.error(chalk.red('❌ 설정 초기화 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      process.exit(1);
    }
  });

/**
 * config endpoints - 엔드포인트 목록 보기
 */
configCommand
  .command('endpoints')
  .description('모든 엔드포인트 목록 보기')
  .action(async () => {
    try {
      const isInitialized = await configManager.isInitialized();
      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        console.log(chalk.white('초기화: open config init\n'));
        return;
      }

      await configManager.initialize();

      const endpoints = configManager.getAllEndpoints();
      const currentEndpoint = configManager.getCurrentEndpoint();

      if (endpoints.length === 0) {
        console.log(chalk.yellow('\n등록된 엔드포인트가 없습니다.'));
        console.log(chalk.white('엔드포인트 추가: open config endpoint add\n'));
        return;
      }

      console.log(chalk.cyan.bold('\n📡 등록된 엔드포인트 목록\n'));

      endpoints.forEach((endpoint, index) => {
        const isCurrent = endpoint.id === currentEndpoint?.id;
        const marker = isCurrent ? chalk.green('●') : chalk.dim('○');

        console.log(marker + ' ' + chalk.bold(endpoint.name) + ' ' + (isCurrent ? chalk.green('(현재)') : ''));
        console.log(chalk.dim('   ID: ' + endpoint.id));
        console.log(chalk.dim('   URL: ' + endpoint.baseUrl));
        console.log(chalk.dim('   모델: ' + endpoint.models.length + '개'));

        endpoint.models.forEach((model) => {
          const modelMarker = model.enabled ? '✓' : '✗';
          console.log(chalk.dim('     ' + modelMarker + ' ' + model.name + ' (' + model.id + ')'));
        });

        if (index < endpoints.length - 1) {
          console.log();
        }
      });

      console.log();
    } catch (error) {
      console.error(chalk.red('\n❌ 엔드포인트 목록 조회 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      console.log();
      process.exit(1);
    }
  });

/**
 * config endpoint add - 새 엔드포인트 추가
 */
configCommand
  .command('endpoint add')
  .alias('endpoint-add')
  .description('새 엔드포인트 추가')
  .action(async () => {
    try {
      const isInitialized = await configManager.isInitialized();
      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        console.log(chalk.white('초기화: open config init\n'));
        return;
      }

      await configManager.initialize();

      console.log(chalk.cyan.bold('\n➕ 새 엔드포인트 추가\n'));
      console.log(chalk.white('엔드포인트 정보를 입력해주세요:\n'));

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '엔드포인트 이름:',
          validate: (input: string) => input.trim().length > 0 || '이름을 입력해주세요.',
        },
        {
          type: 'input',
          name: 'baseUrl',
          message: 'Base URL (HTTP/HTTPS):',
          validate: (input: string) => {
            const trimmed = input.trim();
            if (!trimmed) return 'URL을 입력해주세요.';
            if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
              return 'URL은 http:// 또는 https://로 시작해야 합니다.';
            }
            return true;
          },
        },
        {
          type: 'password',
          name: 'apiKey',
          message: 'API Key (선택사항, Enter로 스킵):',
          mask: '*',
        },
        {
          type: 'input',
          name: 'modelId',
          message: 'Model ID:',
          validate: (input: string) => input.trim().length > 0 || 'Model ID를 입력해주세요.',
        },
        {
          type: 'input',
          name: 'modelName',
          message: 'Model 이름 (표시용):',
        },
        {
          type: 'input',
          name: 'maxTokens',
          message: 'Max Tokens:',
          default: '100000',
          validate: (input: string) => {
            const num = parseInt(input);
            return (!isNaN(num) && num > 0) || 'Max Tokens는 양수여야 합니다.';
          },
        },
      ]);

      // 연결 테스트
      console.log(chalk.cyan('\n🔍 엔드포인트 연결 테스트 중...\n'));

      const spinner = ora('연결 확인 중...').start();

      const testResult = await LLMClient.testConnection(
        answers.baseUrl.trim(),
        answers.apiKey?.trim() || '',
        answers.modelId.trim()
      );

      if (!testResult.success) {
        spinner.fail('연결 실패');
        console.log(chalk.red('\n❌ ' + testResult.error + '\n'));
        console.log(chalk.yellow('설정을 확인하고 다시 시도해주세요.\n'));
        return;
      }

      spinner.succeed('연결 성공!');

      // 엔드포인트 추가
      const endpointId = 'ep-' + Date.now();
      const endpoint: EndpointConfig = {
        id: endpointId,
        name: answers.name.trim(),
        baseUrl: answers.baseUrl.trim(),
        apiKey: answers.apiKey?.trim() || undefined,
        models: [
          {
            id: answers.modelId.trim(),
            name: answers.modelName.trim() || answers.modelId.trim(),
            maxTokens: parseInt(answers.maxTokens),
            enabled: true,
            healthStatus: 'healthy',
            lastHealthCheck: new Date(),
          },
        ],
        priority: configManager.getAllEndpoints().length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await configManager.addEndpoint(endpoint);

      console.log(chalk.green('\n엔드포인트가 추가되었습니다!\n'));
      console.log(chalk.white('  이름: ' + endpoint.name));
      console.log(chalk.white('  ID: ' + endpoint.id));
      console.log(chalk.white('  URL: ' + endpoint.baseUrl));
      console.log(chalk.white('  모델: ' + (endpoint.models[0]?.name || '') + '\n'));

      // 현재 엔드포인트로 전환할지 물어보기
      const switchAnswer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'switch',
          message: '이 엔드포인트를 현재 엔드포인트로 설정하시겠습니까?',
          default: false,
        },
      ]);

      if (switchAnswer.switch) {
        await configManager.setCurrentEndpoint(endpointId);
        console.log(chalk.green('✅ 현재 엔드포인트가 변경되었습니다.\n'));
      }
    } catch (error) {
      console.error(chalk.red('\n❌ 엔드포인트 추가 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      console.log();
      process.exit(1);
    }
  });

/**
 * config endpoint remove - 엔드포인트 삭제
 */
configCommand
  .command('endpoint remove <id>')
  .alias('endpoint-remove')
  .description('엔드포인트 삭제')
  .action(async (id: string) => {
    try {
      const isInitialized = await configManager.isInitialized();
      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        return;
      }

      await configManager.initialize();

      const endpoints = configManager.getAllEndpoints();
      const endpoint = endpoints.find((ep) => ep.id === id);

      if (!endpoint) {
        console.log(chalk.red('\n엔드포인트를 찾을 수 없습니다: ' + id + '\n'));
        console.log(chalk.white('엔드포인트 목록: open config endpoints\n'));
        return;
      }

      console.log(chalk.yellow('\n다음 엔드포인트를 삭제하시겠습니까?\n'));
      console.log(chalk.white('  이름: ' + endpoint.name));
      console.log(chalk.white('  ID: ' + endpoint.id));
      console.log(chalk.white('  URL: ' + endpoint.baseUrl + '\n'));

      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: '정말 삭제하시겠습니까?',
          default: false,
        },
      ]);

      if (!answer.confirm) {
        console.log(chalk.yellow('취소되었습니다.\n'));
        return;
      }

      await configManager.removeEndpoint(id);
      console.log(chalk.green('✅ 엔드포인트가 삭제되었습니다.\n'));
    } catch (error) {
      console.error(chalk.red('\n❌ 엔드포인트 삭제 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      console.log();
      process.exit(1);
    }
  });

/**
 * config endpoint switch - 엔드포인트 전환
 */
configCommand
  .command('endpoint switch <id>')
  .alias('endpoint-switch')
  .description('현재 엔드포인트 전환')
  .action(async (id: string) => {
    try {
      const isInitialized = await configManager.isInitialized();
      if (!isInitialized) {
        console.log(chalk.yellow('\n⚠️  OPEN-CLI가 초기화되지 않았습니다.'));
        return;
      }

      await configManager.initialize();

      const endpoints = configManager.getAllEndpoints();
      const endpoint = endpoints.find((ep) => ep.id === id);

      if (!endpoint) {
        console.log(chalk.red('\n엔드포인트를 찾을 수 없습니다: ' + id + '\n'));
        console.log(chalk.white('엔드포인트 목록: open config endpoints\n'));
        return;
      }

      await configManager.setCurrentEndpoint(id);

      console.log(chalk.green('\n엔드포인트가 변경되었습니다!\n'));
      console.log(chalk.white('  이름: ' + endpoint.name));
      console.log(chalk.white('  URL: ' + endpoint.baseUrl));
      console.log(chalk.white('  모델: ' + (endpoint.models.find((m) => m.enabled)?.name || '') + '\n'));
    } catch (error) {
      console.error(chalk.red('\n❌ 엔드포인트 전환 실패:'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      console.log();
      process.exit(1);
    }
  });

/**
 * 에러 핸들링
 */
program.on('command:*', () => {
  console.error(chalk.red('⚠️  알 수 없는 명령어입니다.'));
  console.log(chalk.white('사용법: open [--verbose] [--debug]\n'));
  console.log(chalk.white('설정:'));
  console.log(chalk.white('  open config init     - 초기 설정'));
  console.log(chalk.white('  open config show     - 설정 확인'));
  console.log(chalk.white('  open config reset    - 설정 초기화\n'));
  process.exit(1);
});

/**
 * CLI 프로그램 실행
 */
program.parse(process.argv);

// 명령어가 없으면 기본 동작 실행
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
