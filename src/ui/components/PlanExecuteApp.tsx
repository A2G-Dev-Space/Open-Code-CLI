/**
 * Plan & Execute Interactive App
 *
 * Enhanced interactive mode with Plan-and-Execute Architecture
 * Refactored to use modular hooks and components
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import Spinner from 'ink-spinner';
import { CustomTextInput } from './CustomTextInput.js';
import { LLMClient } from '../../core/llm-client.js';
import { Message } from '../../types/index.js';
import { TodoPanel, TodoStatusBar } from '../TodoPanel.js';
import { sessionManager } from '../../core/session-manager.js';
import { initializeDocsDirectory } from '../../core/docs-search-agent.js';
import { FileBrowser } from './FileBrowser.js';
import { SessionBrowser } from './SessionBrowser.js';
import { SettingsBrowser } from './SettingsBrowser.js';
import { LLMSetupWizard } from './LLMSetupWizard.js';
import { ModelSelector } from './ModelSelector.js';
import { PlanApprovalPrompt, TaskApprovalPrompt } from './ApprovalPrompt.js';
import { CommandBrowser } from './CommandBrowser.js';
import { ChatView } from './views/ChatView.js';
import { useFileBrowserState } from '../hooks/useFileBrowserState.js';
import { useCommandBrowserState } from '../hooks/useCommandBrowserState.js';
import { usePlanExecution } from '../hooks/usePlanExecution.js';
import { isValidCommand } from '../hooks/slashCommandProcessor.js';
import {
  executeSlashCommand,
  isSlashCommand,
  type CommandHandlerContext,
  type PlanningMode,
} from '../../core/slash-command-handler.js';
import { closeJsonStreamLogger } from '../../utils/json-stream-logger.js';
import { configManager } from '../../core/config-manager.js';

interface PlanExecuteAppProps {
  llmClient: LLMClient | null;
  modelInfo: {
    model: string;
    endpoint: string;
  };
}

export const PlanExecuteApp: React.FC<PlanExecuteAppProps> = ({ llmClient, modelInfo }) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [planningMode, setPlanningMode] = useState<PlanningMode>('auto');

  // Session browser state
  const [showSessionBrowser, setShowSessionBrowser] = useState(false);

  // Settings browser state
  const [showSettings, setShowSettings] = useState(false);

  // LLM Setup Wizard state
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'unhealthy' | 'unknown'>('checking');

  // Model Selector state
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [currentModelInfo, setCurrentModelInfo] = useState(modelInfo);

  // Use modular hooks
  const fileBrowserState = useFileBrowserState(input, isProcessing);
  const commandBrowserState = useCommandBrowserState(input, isProcessing);
  const planExecutionState = usePlanExecution();

  // Initialize on startup: check LLM configuration and run health check
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize docs directory
        await initializeDocsDirectory().catch(console.warn);

        // Check if endpoints are configured
        if (!configManager.hasEndpoints()) {
          setShowSetupWizard(true);
          setIsInitializing(false);
          setHealthStatus('unknown');
          return;
        }

        // Run health check
        setHealthStatus('checking');
        const healthResults = await LLMClient.healthCheckAll();

        // Check if any model is healthy
        let hasHealthy = false;
        for (const [, modelResults] of healthResults) {
          if (modelResults.some((r) => r.healthy)) {
            hasHealthy = true;
            break;
          }
        }

        setHealthStatus(hasHealthy ? 'healthy' : 'unhealthy');

        // Update health status in config
        await configManager.updateAllHealthStatus(healthResults);
      } catch {
        setHealthStatus('unknown');
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  // Wrapped exit function to ensure cleanup
  const handleExit = useCallback(async () => {
    await closeJsonStreamLogger();
    exit();
  }, [exit]);

  // Keyboard shortcuts
  useInput((inputChar: string, key: { ctrl: boolean; shift: boolean; meta: boolean; escape: boolean }) => {
    if (key.ctrl && inputChar === 'c') {
      handleExit().catch(console.error);
    }
    if (key.ctrl && inputChar === 't') {
      planExecutionState.setShowTodoPanel(!planExecutionState.showTodoPanel);
    }
    if (inputChar === '\t' && !isProcessing) {
      const modes: PlanningMode[] = ['auto', 'no-planning', 'planning'];
      const currentIndex = modes.indexOf(planningMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      setPlanningMode(modes[nextIndex]!);
    }
  });

  // Handle file selection from browser
  const handleFileSelect = useCallback((filePaths: string[]) => {
    const newInput = fileBrowserState.handleFileSelect(filePaths, input);
    setInput(newInput);
  }, [fileBrowserState, input]);

  // Handle command selection from browser
  const handleCommandSelect = useCallback((command: string, shouldSubmit: boolean) => {
    const result = commandBrowserState.handleCommandSelect(command, shouldSubmit, input, handleSubmit);
    if (result !== null) {
      setInput(result);
    }
  }, [commandBrowserState, input]);

  // Handle session selection from browser
  const handleSessionSelect = useCallback(async (sessionId: string) => {
    setShowSessionBrowser(false);

    try {
      const sessionData = await sessionManager.loadSession(sessionId);

      if (!sessionData) {
        const errorMessage = `세션을 찾을 수 없습니다: ${sessionId}`;
        setMessages(prev => [
          ...prev,
          { role: 'assistant' as const, content: errorMessage },
        ]);
        return;
      }

      setMessages(sessionData.messages);
    } catch (error) {
      const errorMessage = `세션 로드 실패: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setMessages(prev => [
        ...prev,
        { role: 'assistant' as const, content: errorMessage },
      ]);
    }
  }, []);

  // Handle settings planning mode change
  const handleSettingsPlanningModeChange = useCallback((mode: PlanningMode) => {
    setPlanningMode(mode);
  }, []);

  // Handle settings close
  const handleSettingsClose = useCallback(() => {
    setShowSettings(false);
  }, []);

  // Handle setup wizard completion
  const handleSetupComplete = useCallback(() => {
    setShowSetupWizard(false);
    // Exit and let user restart
    exit();
  }, [exit]);

  // Handle setup wizard skip
  const handleSetupSkip = useCallback(() => {
    setShowSetupWizard(false);
  }, []);

  // Handle model selection
  const handleModelSelect = useCallback(
    (endpointId: string, modelId: string) => {
      const endpoint = configManager.getAllEndpoints().find((ep) => ep.id === endpointId);
      const model = endpoint?.models.find((m) => m.id === modelId);

      if (endpoint && model) {
        setCurrentModelInfo({
          model: model.name,
          endpoint: endpoint.baseUrl,
        });
      }

      setShowModelSelector(false);

      // Add confirmation message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `모델이 변경되었습니다: ${model?.name || modelId} (${endpoint?.name || endpointId})`,
        },
      ]);
    },
    []
  );

  // Handle model selector cancel
  const handleModelSelectorCancel = useCallback(() => {
    setShowModelSelector(false);
  }, []);

  const handleSubmit = useCallback(async (value: string) => {
    if (!value.trim() || isProcessing || fileBrowserState.showFileBrowser || showSessionBrowser || showSettings || showSetupWizard) {
      return;
    }

    if (!llmClient) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant' as const, content: 'LLM이 설정되지 않았습니다. /settings → LLMs에서 설정해주세요.' },
      ]);
      return;
    }

    if (commandBrowserState.showCommandBrowser && !isValidCommand(value.trim())) {
      return;
    }

    const userMessage = value.trim();

    if (commandBrowserState.showCommandBrowser) {
      commandBrowserState.resetCommandBrowser();
    }

    setInput('');

    if (isSlashCommand(userMessage)) {
      const commandContext: CommandHandlerContext = {
        planningMode,
        messages,
        todos: planExecutionState.todos,
        setPlanningMode,
        setMessages,
        setTodos: planExecutionState.setTodos,
        exit: handleExit,
        onShowSessionBrowser: () => setShowSessionBrowser(true),
        onShowSettings: () => setShowSettings(true),
        onShowModelSelector: () => setShowModelSelector(true),
      };

      const result = await executeSlashCommand(userMessage, commandContext);

      if (result.handled) {
        return;
      }
    }

    setIsProcessing(true);
    setCurrentResponse('');

    try {
      let usePlanning = false;

      if (planningMode === 'planning') {
        usePlanning = true;
      } else if (planningMode === 'auto') {
        const complexKeywords = [
          'create', 'build', 'implement', 'develop', 'make',
          'setup', 'configure', 'install', 'deploy', 'design',
          'refactor', 'optimize', 'debug', 'test', 'analyze',
          'multiple', 'several', 'tasks', 'steps'
        ];

        const lowerMessage = userMessage.toLowerCase();
        usePlanning = complexKeywords.some(keyword => lowerMessage.includes(keyword));
      }

      if (usePlanning) {
        await planExecutionState.executePlanMode(userMessage, llmClient, messages, setMessages);
      } else {
        await planExecutionState.executeDirectMode(userMessage, llmClient, messages, setMessages);
      }

    } finally {
      setIsProcessing(false);
      setCurrentResponse('');
    }
  }, [
    isProcessing,
    fileBrowserState.showFileBrowser,
    showSessionBrowser,
    showSettings,
    showSetupWizard,
    commandBrowserState,
    planningMode,
    messages,
    planExecutionState,
    llmClient,
    handleExit,
  ]);

  // Show loading spinner during initialization
  if (isInitializing) {
    return (
      <Box flexDirection="column" padding={2}>
        <Box>
          <Spinner type="dots" />
          <Text> Initializing OPEN-CLI...</Text>
        </Box>
      </Box>
    );
  }

  // Show setup wizard if no endpoints configured
  if (showSetupWizard) {
    return (
      <Box flexDirection="column" padding={1}>
        <LLMSetupWizard onComplete={handleSetupComplete} onSkip={handleSetupSkip} />
      </Box>
    );
  }

  // Get health status indicator
  const getHealthIndicator = () => {
    switch (healthStatus) {
      case 'checking':
        return <Text color="yellow">⋯</Text>;
      case 'healthy':
        return <Text color="green">✓</Text>;
      case 'unhealthy':
        return <Text color="red">✗</Text>;
      default:
        return <Text color="gray">?</Text>;
    }
  };

  return (
    <Box flexDirection="column" height="100%">
      {/* Header */}
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Box justifyContent="space-between" width="100%">
          <Text bold color="cyan">
            OPEN-CLI Interactive Mode {getHealthIndicator()}
          </Text>
          <Text color="gray">
            Model: {currentModelInfo.model} | Planning: {planningMode}
          </Text>
        </Box>
      </Box>

      {/* Messages Area */}
      <ChatView messages={messages} currentResponse={currentResponse} />

      {/* TODO Panel (if in Plan & Execute mode) */}
      {planExecutionState.showTodoPanel && planExecutionState.todos.length > 0 && (
        <Box marginY={1}>
          <TodoPanel
            todos={planExecutionState.todos}
            currentTodoId={planExecutionState.currentTodoId}
            showDetails={planExecutionState.executionPhase === 'executing'}
          />
        </Box>
      )}

      {/* Input Area */}
      <Box borderStyle="single" borderColor="gray" paddingX={1}>
        <Box>
          <Text color="green" bold>You: </Text>
          <Box flexGrow={1}>
            <CustomTextInput
              value={input}
              onChange={(value) => {
                if (showSessionBrowser || showSettings) {
                  return;
                }
                setInput(value);
              }}
              onSubmit={handleSubmit}
              placeholder={
                isProcessing
                  ? "Processing..."
                  : showSessionBrowser
                  ? "Select a session or press ESC to cancel..."
                  : showSettings
                  ? "Press ESC to close settings..."
                  : "Type your message..."
              }
              focus={!showSessionBrowser && !showSettings && !planExecutionState.planApprovalRequest && !planExecutionState.taskApprovalRequest}
            />
          </Box>
        </Box>
      </Box>

      {/* File Browser (shown when '@' is typed) */}
      {fileBrowserState.showFileBrowser && !isProcessing && (
        <Box marginTop={0}>
          {fileBrowserState.isLoadingFiles ? (
            <Box borderStyle="single" borderColor="yellow" paddingX={1}>
              <Text color="yellow">Loading file list...</Text>
            </Box>
          ) : (
            <FileBrowser
              filter={fileBrowserState.filterText}
              onSelect={handleFileSelect}
              onCancel={fileBrowserState.handleFileBrowserCancel}
              cachedFiles={fileBrowserState.cachedFileList}
            />
          )}
        </Box>
      )}

      {/* Command Browser (shown when '/' is typed at start) */}
      {commandBrowserState.showCommandBrowser && !isProcessing && !fileBrowserState.showFileBrowser && (
        <Box marginTop={0}>
          <CommandBrowser
            partialCommand={commandBrowserState.partialCommand}
            args={commandBrowserState.commandArgs}
            onSelect={handleCommandSelect}
            onCancel={commandBrowserState.handleCommandBrowserCancel}
          />
        </Box>
      )}

      {/* Session Browser (shown when /load command is submitted) */}
      {showSessionBrowser && !isProcessing && (
        <Box marginTop={0}>
          <SessionBrowser
            onSelect={handleSessionSelect}
            onCancel={() => setShowSessionBrowser(false)}
          />
        </Box>
      )}

      {/* Settings Browser (shown when /settings command is submitted) */}
      {showSettings && !isProcessing && (
        <Box marginTop={0}>
          <SettingsBrowser
            currentPlanningMode={planningMode}
            onPlanningModeChange={handleSettingsPlanningModeChange}
            onClose={handleSettingsClose}
          />
        </Box>
      )}

      {/* Model Selector (shown when /model command is submitted) */}
      {showModelSelector && !isProcessing && (
        <Box marginTop={0}>
          <ModelSelector
            onSelect={handleModelSelect}
            onCancel={handleModelSelectorCancel}
          />
        </Box>
      )}

      {/* HITL Plan Approval Prompt */}
      {planExecutionState.planApprovalRequest && (
        <Box marginTop={1}>
          <PlanApprovalPrompt
            userRequest={planExecutionState.planApprovalRequest.userRequest}
            todos={planExecutionState.planApprovalRequest.todos}
            onResponse={planExecutionState.handleApprovalResponse}
          />
        </Box>
      )}

      {/* HITL Task Approval Prompt */}
      {planExecutionState.taskApprovalRequest && (
        <Box marginTop={1}>
          <TaskApprovalPrompt
            taskDescription={planExecutionState.taskApprovalRequest.taskDescription}
            risk={planExecutionState.taskApprovalRequest.risk}
            context={planExecutionState.taskApprovalRequest.context}
            onResponse={planExecutionState.handleApprovalResponse}
          />
        </Box>
      )}

      {/* Status Bar */}
      <Box justifyContent="space-between" paddingX={1}>
        <Box>
          {isProcessing && (
            <Text color="yellow">
              <Spinner type="dots" />
              {planExecutionState.executionPhase === 'planning' ? ' Planning...' :
               planExecutionState.executionPhase === 'executing' ? ' Executing...' : ' Processing...'}
            </Text>
          )}
        </Box>
        <Box>
          {planExecutionState.todos.length > 0 && (
            <TodoStatusBar todos={planExecutionState.todos} />
          )}
        </Box>
        <Text color="gray" dimColor>
          Tab: switch planning mode | Ctrl+T: toggle TODOs | /help: commands
        </Text>
      </Box>
    </Box>
  );
};

export default PlanExecuteApp;
