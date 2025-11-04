/**
 * Interactive App - Ink UI
 *
 * React + Ink 기반 인터랙티브 터미널 UI
 */

import React, { useState } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import { LLMClient } from '../../core/llm-client.js';
import { Message } from '../../types/index.js';

interface InteractiveAppProps {
  llmClient: LLMClient;
  modelInfo: {
    model: string;
    endpoint: string;
  };
}

export const InteractiveApp: React.FC<InteractiveAppProps> = ({ llmClient, modelInfo }) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentThinking, setCurrentThinking] = useState('');

  // 키보드 단축키
  useInput((inputChar: string, key: { ctrl: boolean; shift: boolean; meta: boolean }) => {
    if (key.ctrl && inputChar === 'c') {
      exit();
    }
  });

  const handleSubmit = async (value: string) => {
    if (!value.trim() || isProcessing) {
      return;
    }

    const userMessage = value.trim();
    setInput('');

    // 메타 명령어 처리
    if (userMessage === '/exit' || userMessage === '/quit') {
      exit();
      return;
    }

    if (userMessage === '/clear') {
      setMessages([]);
      return;
    }

    if (userMessage === '/help') {
      // 도움말 표시 (간단히)
      return;
    }

    // LLM 호출
    setIsProcessing(true);
    setCurrentResponse('');
    setCurrentThinking('');

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);

    try {
      // FILE_TOOLS import (dynamic import for ESM)
      const { FILE_TOOLS } = await import('../../tools/file-tools.js');

      // Tool calling과 함께 LLM 호출 (Non-streaming for tool support)
      const result = await llmClient.chatCompletionWithTools(
        newMessages,
        FILE_TOOLS,
        5 // maxIterations
      );

      // Tool 사용 내역이 있으면 표시 (콘솔 로그로 - UI는 나중에 개선 가능)
      if (result.toolCalls.length > 0) {
        // Tool calls가 있었음을 메시지에 표시
        const toolCallsInfo = result.toolCalls.map((call, idx) =>
          `${idx + 1}. ${call.tool}(${JSON.stringify(call.args)})`
        ).join('\n');

        // 나중에 UI 개선 시 별도로 표시 가능
        console.log('🔧 Tools used:\n' + toolCallsInfo);
      }

      // 메시지 히스토리 업데이트 (allMessages에는 tool call/response 포함)
      setMessages(result.allMessages);
      setCurrentResponse('');
      setCurrentThinking('');
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        },
      ]);
      setCurrentThinking('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box borderStyle="double" borderColor="cyan" paddingX={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text bold color="cyan">
            OPEN-CLI Interactive Mode (Ink UI)
          </Text>
          <Text dimColor>
            Model: {modelInfo.model} | Endpoint: {modelInfo.endpoint}
          </Text>
          <Text dimColor>
            Commands: /exit /clear /help | Ctrl+C to quit
          </Text>
        </Box>
      </Box>

      {/* Message History */}
      <Box flexDirection="column" marginBottom={1}>
        {messages.map((msg, index) => (
          <Box key={index} marginBottom={1}>
            <Box marginRight={1}>
              <Text bold color={msg.role === 'user' ? 'green' : 'blue'}>
                {msg.role === 'user' ? '🧑 You:' : '🤖 Assistant:'}
              </Text>
            </Box>
            <Text>{msg.content}</Text>
          </Box>
        ))}

        {/* Current thinking (if any) */}
        {isProcessing && currentThinking && (
          <Box marginBottom={1}>
            <Box marginRight={1}>
              <Text bold color="magenta">
                💭 Thinking:
              </Text>
            </Box>
            <Text dimColor>{currentThinking}</Text>
          </Box>
        )}

        {/* Current streaming response */}
        {isProcessing && currentResponse && (
          <Box marginBottom={1}>
            <Box marginRight={1}>
              <Text bold color="blue">
                🤖 Assistant:
              </Text>
            </Box>
            <Text>{currentResponse}</Text>
          </Box>
        )}
      </Box>

      {/* Input Box */}
      <Box borderStyle="single" borderColor="gray" paddingX={1}>
        {isProcessing ? (
          <Box>
            <Text color="yellow">
              <Spinner type="dots" />
            </Text>
            <Text dimColor> Processing...</Text>
          </Box>
        ) : (
          <Box>
            <Text bold color="green">
              You:{' '}
            </Text>
            <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
