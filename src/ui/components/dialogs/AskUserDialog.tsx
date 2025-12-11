/**
 * Ask User Dialog Component
 *
 * LLM이 사용자에게 질문할 때 표시되는 선택형 UI
 * Phase 2: 승인 모드 / 자율 모드
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import { CustomTextInput } from '../CustomTextInput.js';
import { logger } from '../../../utils/logger.js';
import type { AskUserRequest, AskUserResponse } from '../../../tools/llm/simple/ask-user-tool.js';

export interface AskUserDialogProps {
  request: AskUserRequest;
  onResponse: (response: AskUserResponse) => void;
}

/**
 * Ask User Dialog - 사용자에게 선택지를 제공하는 대화상자
 * - LLM이 제공한 선택지들 (2-4개)
 * - + "Other (직접 입력)" 옵션 (항상 표시)
 */
export const AskUserDialog: React.FC<AskUserDialogProps> = ({ request, onResponse }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOtherMode, setIsOtherMode] = useState(false);
  const [customText, setCustomText] = useState('');

  logger.enter('AskUserDialog', { question: request.question, optionCount: request.options.length });

  // LLM이 제공한 옵션들 + "Other (직접 입력)" 옵션 (항상 추가)
  const allOptions = [...request.options, 'Other (직접 입력)'];

  const handleSelect = useCallback(() => {
    logger.flow('User selected option', { selectedIndex });

    // Check if "Other" was selected (always last option)
    if (selectedIndex === request.options.length) {
      setIsOtherMode(true);
      return;
    }

    const selectedOption = request.options[selectedIndex];
    if (selectedOption) {
      onResponse({
        selectedOption,
        isOther: false,
      });
    }
  }, [selectedIndex, request.options, onResponse]);

  const handleOtherSubmit = useCallback((text: string) => {
    if (!text.trim()) return;

    logger.flow('User submitted custom text', { textLength: text.length });
    onResponse({
      selectedOption: 'Other',
      isOther: true,
      customText: text.trim(),
    });
  }, [onResponse]);

  const handleOtherCancel = useCallback(() => {
    logger.flow('User cancelled other mode');
    setIsOtherMode(false);
    setCustomText('');
  }, []);

  // Keyboard navigation
  useInput((input, key) => {
    if (isOtherMode) {
      if (key.escape) {
        handleOtherCancel();
      }
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : allOptions.length - 1));
    } else if (key.downArrow) {
      setSelectedIndex(prev => (prev < allOptions.length - 1 ? prev + 1 : 0));
    } else if (key.return) {
      handleSelect();
    } else if (input >= '1' && input <= '9') {
      const numIndex = parseInt(input, 10) - 1;
      if (numIndex >= 0 && numIndex < allOptions.length) {
        setSelectedIndex(numIndex);
        // Auto-select after number key
        setTimeout(() => {
          // Last option is always "Other"
          if (numIndex === request.options.length) {
            setIsOtherMode(true);
          } else {
            const option = request.options[numIndex];
            if (option) {
              onResponse({
                selectedOption: option,
                isOther: false,
              });
            }
          }
        }, 100);
      }
    }
  }, { isActive: !isOtherMode });

  // Other mode: text input
  if (isOtherMode) {
    return (
      <Box flexDirection="column" borderStyle="round" borderColor="yellow" paddingX={1} paddingY={0}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>💬 {request.question}</Text>
        </Box>
        <Box>
          <Text color="gray">직접 입력 (ESC: 취소): </Text>
          <CustomTextInput
            value={customText}
            onChange={setCustomText}
            onSubmit={handleOtherSubmit}
            placeholder="응답을 입력하세요..."
            focus={true}
          />
        </Box>
      </Box>
    );
  }

  // Normal mode: option selection
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="yellow" paddingX={1} paddingY={0}>
      <Box marginBottom={1}>
        <Text color="yellow" bold>💬 {request.question}</Text>
      </Box>

      {allOptions.map((option, index) => {
        const isSelected = index === selectedIndex;
        const isOtherOption = index === request.options.length; // Last option is always "Other"

        return (
          <Box key={index}>
            <Text color={isSelected ? 'cyan' : 'gray'}>
              {isSelected ? '▸ ' : '  '}
              [{index + 1}] {option}
              {isOtherOption && <Text color="gray" dimColor> (자유 응답)</Text>}
            </Text>
          </Box>
        );
      })}

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          ↑↓ 이동 | Enter 선택 | 1-{allOptions.length} 번호로 선택
        </Text>
      </Box>
    </Box>
  );
};

export default AskUserDialog;
