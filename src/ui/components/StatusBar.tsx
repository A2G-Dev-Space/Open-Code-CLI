/**
 * Status Bar Component
 *
 * Displays status information at the bottom of the screen
 */

import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';

export interface StatusBarProps {
  model?: string;
  endpoint?: string;
  contextUsage?: {
    current: number;
    max: number;
  };
  status?: 'idle' | 'thinking' | 'executing' | 'error';
  message?: string;
}

const getStatusIndicator = (status: StatusBarProps['status']): string => {
  switch (status) {
    case 'thinking':
      return chalk.yellow('● THINKING');
    case 'executing':
      return chalk.green('● EXECUTING');
    case 'error':
      return chalk.red('● ERROR');
    case 'idle':
    default:
      return chalk.gray('○ IDLE');
  }
};

export const StatusBar: React.FC<StatusBarProps> = ({
  model,
  endpoint,
  contextUsage,
  status = 'idle',
  message,
}) => {
  const contextPercent = contextUsage
    ? Math.round((contextUsage.current / contextUsage.max) * 100)
    : 0;

  const getContextColor = (percent: number) => {
    if (percent >= 90) return chalk.red;
    if (percent >= 70) return chalk.yellow;
    return chalk.green;
  };

  return (
    <Box
      borderStyle="single"
      borderColor="gray"
      paddingX={1}
      flexDirection="row"
      justifyContent="space-between"
    >
      {/* Left side - Status */}
      <Box gap={1}>
        <Text>{getStatusIndicator(status)}</Text>
        {message && (
          <Text dimColor>| {message}</Text>
        )}
      </Box>

      {/* Right side - Info */}
      <Box gap={1}>
        {endpoint && (
          <Text dimColor>
            {chalk.cyan('Endpoint:')} {endpoint}
          </Text>
        )}
        {model && (
          <Text dimColor>
            {chalk.magenta('Model:')} {model}
          </Text>
        )}
        {contextUsage && (
          <Text>
            {chalk.blue('Context:')} {getContextColor(contextPercent)(`${contextPercent}%`)}
            <Text dimColor> ({contextUsage.current}/{contextUsage.max})</Text>
          </Text>
        )}
      </Box>
    </Box>
  );
};
