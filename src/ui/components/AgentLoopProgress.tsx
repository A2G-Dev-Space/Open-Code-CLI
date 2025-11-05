/**
 * Agent Loop Progress Component
 *
 * Shows real-time progress of agent loop execution
 */

import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import chalk from 'chalk';
import { ProgressUpdate } from '../../types/index.js';

export interface AgentLoopProgressProps {
  currentTodo: string;
  iteration: number;
  maxIterations: number;
  currentAction?: string;
  recentActions?: string[];
  status: 'gathering' | 'acting' | 'verifying' | 'completed' | 'failed';
  update?: ProgressUpdate;
}

const getPhaseIcon = (status: AgentLoopProgressProps['status']): React.ReactElement => {
  switch (status) {
    case 'gathering':
      return (
        <>
          <Spinner type="dots" />
          <Text color="cyan"> Gathering Context...</Text>
        </>
      );
    case 'acting':
      return (
        <>
          <Spinner type="dots" />
          <Text color="yellow"> Executing Action...</Text>
        </>
      );
    case 'verifying':
      return (
        <>
          <Spinner type="dots" />
          <Text color="blue"> Verifying Work...</Text>
        </>
      );
    case 'completed':
      return <Text color="green">✓ Completed</Text>;
    case 'failed':
      return <Text color="red">✗ Failed</Text>;
  }
};

export const AgentLoopProgress: React.FC<AgentLoopProgressProps> = ({
  currentTodo,
  iteration,
  maxIterations,
  currentAction,
  recentActions = [],
  status,
  update,
}) => {
  const progressPercent = Math.round((iteration / maxIterations) * 100);

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="yellow" padding={1}>
      {/* Header */}
      <Box marginBottom={1}>
        <Text bold color="yellow">Agent Loop Execution</Text>
      </Box>

      {/* Current TODO */}
      <Box marginBottom={1}>
        <Text bold>TODO: </Text>
        <Text>{currentTodo}</Text>
      </Box>

      {/* Iteration Info */}
      <Box marginBottom={1}>
        <Text>
          {chalk.cyan('Iteration:')} {iteration}/{maxIterations}
          <Text dimColor> ({progressPercent}%)</Text>
        </Text>
      </Box>

      {/* Current Phase */}
      <Box marginBottom={1}>
        {getPhaseIcon(status)}
      </Box>

      {/* Current Action */}
      {currentAction && (
        <Box marginBottom={1}>
          <Text bold color="magenta">Action: </Text>
          <Text>{currentAction}</Text>
        </Box>
      )}

      {/* Verification Result */}
      {update?.verification && (
        <Box flexDirection="column" marginBottom={1}>
          <Text bold color="blue">Verification:</Text>
          <Box marginLeft={2}>
            <Text color={update.verification.isComplete ? 'green' : 'yellow'}>
              {update.verification.isComplete ? '✓ Complete' : '⚠ Incomplete'}
            </Text>
          </Box>
          {update.verification.feedback && update.verification.feedback.length > 0 && (
            <Box marginLeft={2} flexDirection="column">
              {update.verification.feedback.slice(0, 3).map((fb, idx) => (
                <Text key={idx} dimColor>
                  • {fb.message}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      )}

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Box flexDirection="column">
          <Text bold dimColor>Recent Actions:</Text>
          {recentActions.slice(-5).map((action, idx) => (
            <Box key={idx} marginLeft={2}>
              <Text dimColor>• {action}</Text>
            </Box>
          ))}
        </Box>
      )}

      {/* Will Retry Indicator */}
      {update?.willRetry && (
        <Box marginTop={1}>
          <Text color="yellow">⟳ Will retry in next iteration...</Text>
        </Box>
      )}
    </Box>
  );
};
