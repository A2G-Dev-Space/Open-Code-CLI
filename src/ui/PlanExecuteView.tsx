/**
 * Plan-Execute View
 *
 * Main UI for Plan-and-Execute workflow with real-time progress
 */

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { TodoItem, ProgressUpdate } from '../types/index.js';
import {
  TodoListView,
  AgentLoopProgress,
  StatusBar,
  ProgressBar,
} from './components/index.js';

export interface PlanExecuteViewProps {
  todos: TodoItem[];
  currentTodo?: TodoItem;
  update?: ProgressUpdate;
  model?: string;
  endpoint?: string;
  onExit?: () => void;
}

export const PlanExecuteView: React.FC<PlanExecuteViewProps> = ({
  todos,
  currentTodo,
  update,
  model,
  endpoint,
}) => {
  const [recentActions, setRecentActions] = useState<string[]>([]);

  // Update recent actions when new update arrives
  useEffect(() => {
    if (update?.action) {
      setRecentActions(prev => [...prev, update.action].slice(-10));
    }
  }, [update]);

  const completedTodos = todos.filter(t => t.status === 'completed').length;
  const totalTodos = todos.length;

  const getAgentStatus = (): 'gathering' | 'acting' | 'verifying' | 'completed' | 'failed' => {
    if (!currentTodo) return 'completed';
    if (currentTodo.status === 'failed') return 'failed';
    if (currentTodo.status === 'completed') return 'completed';

    // Infer current phase from update
    if (update?.action.toLowerCase().includes('gather')) return 'gathering';
    if (update?.action.toLowerCase().includes('verify')) return 'verifying';
    return 'acting';
  };

  return (
    <Box flexDirection="column" padding={1}>
      {/* Title */}
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">
          ╔════════════════════════════════════════╗
        </Text>
      </Box>
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">
          ║   OPEN-CLI Plan-and-Execute Mode      ║
        </Text>
      </Box>
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">
          ╚════════════════════════════════════════╝
        </Text>
      </Box>

      {/* Overall Progress */}
      <Box marginBottom={1}>
        <ProgressBar
          current={completedTodos}
          total={totalTodos}
          label="Overall Progress"
          width={50}
          showPercentage
        />
      </Box>

      {/* Two Column Layout */}
      <Box gap={2}>
        {/* Left Column - TODO List */}
        <Box width="50%">
          <TodoListView
            todos={todos}
            title="Task List"
            showDescription={false}
          />
        </Box>

        {/* Right Column - Agent Loop Progress */}
        <Box width="50%">
          {currentTodo ? (
            <AgentLoopProgress
              currentTodo={currentTodo.title}
              iteration={update?.iteration || 1}
              maxIterations={10}
              currentAction={update?.action}
              recentActions={recentActions}
              status={getAgentStatus()}
              update={update}
            />
          ) : (
            <Box
              borderStyle="round"
              borderColor="green"
              padding={1}
              justifyContent="center"
              alignItems="center"
            >
              <Text bold color="green">
                ✓ All tasks completed!
              </Text>
            </Box>
          )}
        </Box>
      </Box>

      {/* Status Bar */}
      <Box marginTop={1}>
        <StatusBar
          model={model}
          endpoint={endpoint}
          status={currentTodo ? (currentTodo.status === 'in_progress' ? 'executing' : 'idle') : 'idle'}
          message={currentTodo ? `Working on: ${currentTodo.title}` : 'All tasks complete'}
        />
      </Box>

      {/* Instructions */}
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
};
