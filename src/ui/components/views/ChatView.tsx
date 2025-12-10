/**
 * ChatView Component
 *
 * Renders the chat message history in the interactive mode
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Message } from '../../../types/index.js';

interface ChatViewProps {
  messages: Message[];
  currentResponse?: string;
  maxDisplayMessages?: number;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  currentResponse,
  maxDisplayMessages = 10,
}) => {
  return (
    <Box flexDirection="column" flexGrow={1} paddingX={1} paddingY={1}>
      {messages.slice(-maxDisplayMessages).map((msg, idx) => (
        <Box key={idx} marginBottom={1}>
          {msg.role === 'user' ? (
            <Text color="green">
              <Text bold>You: </Text>{msg.content}
            </Text>
          ) : msg.role === 'assistant' ? (
            <Text color="cyan">
              <Text bold>AI: </Text>{msg.content}
            </Text>
          ) : null}
        </Box>
      ))}

      {currentResponse && (
        <Box>
          <Text color="cyan">
            <Text bold>AI: </Text>{currentResponse}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatView;
