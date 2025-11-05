/**
 * TODO List View Component
 *
 * Displays TODO items with status indicators
 */

import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import { TodoItem } from '../../types/index.js';

export interface TodoListViewProps {
  todos: TodoItem[];
  title?: string;
  showDescription?: boolean;
}

const getStatusIcon = (status: TodoItem['status']): string => {
  switch (status) {
    case 'completed':
      return chalk.green('✓');
    case 'in_progress':
      return chalk.yellow('⟳');
    case 'failed':
      return chalk.red('✗');
    case 'pending':
    default:
      return chalk.gray('○');
  }
};

const getStatusColor = (status: TodoItem['status']) => {
  switch (status) {
    case 'completed':
      return chalk.green;
    case 'in_progress':
      return chalk.yellow;
    case 'failed':
      return chalk.red;
    case 'pending':
    default:
      return chalk.gray;
  }
};

export const TodoListView: React.FC<TodoListViewProps> = ({
  todos,
  title = 'TODO List',
  showDescription = false,
}) => {
  const completedCount = todos.filter(t => t.status === 'completed').length;
  const totalCount = todos.length;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      {/* Header */}
      <Box marginBottom={1}>
        <Text bold color="cyan">{title}</Text>
        <Text> ({completedCount}/{totalCount} completed)</Text>
      </Box>

      {/* TODO Items */}
      {todos.map((todo, index) => {
        const statusIcon = getStatusIcon(todo.status);
        const statusColor = getStatusColor(todo.status);

        return (
          <Box key={todo.id} flexDirection="column" marginBottom={showDescription ? 1 : 0}>
            <Box>
              <Text>{statusIcon} </Text>
              <Text color={statusColor === chalk.gray ? undefined : 'yellow'}>
                {index + 1}. {todo.title}
              </Text>
              {todo.status === 'in_progress' && (
                <Text color="yellow"> [IN PROGRESS]</Text>
              )}
            </Box>
            {showDescription && todo.description && (
              <Box marginLeft={3}>
                <Text dimColor>{todo.description}</Text>
              </Box>
            )}
            {todo.error && (
              <Box marginLeft={3}>
                <Text color="red">Error: {todo.error}</Text>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
