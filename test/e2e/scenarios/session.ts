/**
 * Session 관리 테스트 시나리오
 * - 세션 저장
 * - 세션 로드
 * - 세션 목록 조회
 */

import { TestScenario } from '../types.js';

const TEST_SESSION_NAME = `test-session-${Date.now()}`;
let savedSessionId: string = '';

export const sessionScenarios: TestScenario[] = [
  {
    id: 'session-save',
    name: '세션 저장 테스트',
    description: '세션을 저장할 수 있는지 테스트합니다.',
    category: 'session',
    enabled: true,
    timeout: 30000,
    steps: [
      {
        name: '세션 저장',
        action: { type: 'session_save', sessionId: TEST_SESSION_NAME },
        validation: { type: 'not_empty' },
      },
    ],
  },

  {
    id: 'session-load',
    name: '세션 로드 테스트',
    description: '저장된 세션을 로드할 수 있는지 테스트합니다.',
    category: 'session',
    enabled: true,
    timeout: 30000,
    setup: async () => {
      // 먼저 세션을 저장
      const { sessionManager } = await import('../../../src/core/session-manager.js');
      savedSessionId = await sessionManager.saveSession(TEST_SESSION_NAME + '-load', [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
      ]);
    },
    steps: [
      {
        name: '세션 로드',
        action: {
          type: 'custom',
          fn: async () => {
            const { sessionManager } = await import('../../../src/core/session-manager.js');
            return sessionManager.loadSession(savedSessionId);
          },
        },
        validation: {
          type: 'custom',
          fn: async (result: any) => {
            return (
              result !== null &&
              Array.isArray(result.messages) &&
              result.messages.length > 0
            );
          },
        },
      },
    ],
  },

  {
    id: 'session-list',
    name: '세션 목록 조회 테스트',
    description: '저장된 세션 목록을 조회할 수 있는지 테스트합니다.',
    category: 'session',
    enabled: true,
    timeout: 30000,
    setup: async () => {
      // 테스트용 세션 생성
      const { sessionManager } = await import('../../../src/core/session-manager.js');
      await sessionManager.saveSession(`${TEST_SESSION_NAME}-list-1`, [
        { role: 'user', content: 'Test 1' },
      ]);
    },
    steps: [
      {
        name: '세션 목록 조회',
        action: { type: 'session_list' },
        validation: { type: 'is_array', minLength: 1 },
      },
    ],
  },

  {
    id: 'session-persistence',
    name: '세션 영속성 테스트',
    description: '세션 저장 후 로드했을 때 데이터가 유지되는지 테스트합니다.',
    category: 'session',
    enabled: true,
    timeout: 30000,
    steps: [
      {
        name: '세션 저장 (메시지 포함)',
        action: {
          type: 'custom',
          fn: async () => {
            const { sessionManager } = await import('../../../src/core/session-manager.js');
            const sessionId = await sessionManager.saveSession(`${TEST_SESSION_NAME}-persist`, [
              { role: 'user', content: 'Persistence test message' },
              { role: 'assistant', content: 'Response message' },
            ]);
            return sessionId;
          },
        },
        validation: { type: 'not_empty' },
      },
      {
        name: '세션 로드 및 데이터 확인',
        action: {
          type: 'custom',
          fn: async () => {
            const { sessionManager } = await import('../../../src/core/session-manager.js');
            // 먼저 세션 목록을 가져와서 방금 저장한 세션 ID를 찾음
            const sessions = await sessionManager.listSessions();
            const persistSession = sessions.find(s => s.name === `${TEST_SESSION_NAME}-persist`);
            if (!persistSession) return null;
            return sessionManager.loadSession(persistSession.id);
          },
        },
        validation: {
          type: 'custom',
          fn: async (result: any) => {
            return (
              result !== null &&
              result.messages?.length === 2 &&
              result.messages[0].content === 'Persistence test message'
            );
          },
        },
      },
    ],
  },
];
