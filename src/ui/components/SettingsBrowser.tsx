/**
 * Settings Browser Component
 *
 * Displays settings menu for interactive selection
 */

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import { PlanningMode } from '../../core/slash-command-handler.js';
import { configManager } from '../../core/config-manager.js';
import { sessionManager } from '../../core/session-manager.js';

interface SettingsBrowserProps {
  currentPlanningMode: PlanningMode;
  onPlanningModeChange: (mode: PlanningMode) => void;
  onClose: () => void;
}

interface SelectItem {
  label: string;
  value: string;
}

interface SystemStatus {
  version: string;
  sessionId: string;
  workingDir: string;
  endpointUrl: string;
  llmModel: string;
}

type SettingsView = 'main' | 'status' | 'planning-mode';

export const SettingsBrowser: React.FC<SettingsBrowserProps> = ({
  currentPlanningMode,
  onPlanningModeChange,
  onClose,
}) => {
  const [view, setView] = useState<SettingsView>('main');
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  // Load system status when status view is shown
  useEffect(() => {
    if (view === 'status') {
      const loadStatus = async () => {
        const endpoint = configManager.getCurrentEndpoint();
        const model = configManager.getCurrentModel();
        const cwd = process.cwd();

        // Read package.json for version
        let version = '0.1.0';
        try {
          const { readFile } = await import('fs/promises');
          const { fileURLToPath } = await import('url');
          const { dirname, join } = await import('path');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = dirname(__filename);
          const packageJsonPath = join(__dirname, '../../../package.json');
          const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
          version = packageJson.version;
        } catch {
          // Use default version
        }

        setSystemStatus({
          version,
          sessionId: sessionManager.getCurrentSessionId() || 'No active session',
          workingDir: cwd,
          endpointUrl: endpoint?.baseUrl || 'Not configured',
          llmModel: model ? `${model.name} (${model.id})` : 'Not configured',
        });
      };

      loadStatus();
    }
  }, [view]);

  // Custom keyboard handling
  useInput((_inputChar, key) => {
    if (key.escape) {
      if (view === 'planning-mode' || view === 'status') {
        setView('main');
      } else {
        onClose();
      }
      return;
    }
  });

  // Main menu items
  const mainMenuItems: SelectItem[] = [
    {
      label: '0. Status',
      value: 'status',
    },
    {
      label: `1. Planning Mode (current: ${currentPlanningMode})`,
      value: 'planning-mode',
    },
  ];

  // Planning mode options
  const planningModeItems: SelectItem[] = [
    {
      label: `1. planning${currentPlanningMode === 'planning' ? ' ✓' : ''}`,
      value: 'planning',
    },
    {
      label: `2. no-planning${currentPlanningMode === 'no-planning' ? ' ✓' : ''}`,
      value: 'no-planning',
    },
    {
      label: `3. auto${currentPlanningMode === 'auto' ? ' ✓' : ''}`,
      value: 'auto',
    },
  ];

  // Handle main menu selection
  const handleMainSelect = (item: SelectItem) => {
    if (item.value === 'planning-mode') {
      setView('planning-mode');
    } else if (item.value === 'status') {
      setView('status');
    }
  };

  // Handle planning mode selection
  const handlePlanningModeSelect = (item: SelectItem) => {
    const newMode = item.value as PlanningMode;
    onPlanningModeChange(newMode);
    onClose();
  };

  // Main settings menu view
  if (view === 'main') {
    return (
      <Box flexDirection="column">
        {/* Header */}
        <Box borderStyle="single" borderColor="cyan" paddingX={1} marginBottom={1}>
          <Text color="cyan" bold>
            Settings
          </Text>
        </Box>

        {/* Menu List */}
        <Box borderStyle="single" borderColor="gray" paddingX={1}>
          <SelectInput
            items={mainMenuItems}
            onSelect={handleMainSelect}
          />
        </Box>

        {/* Footer */}
        <Box marginTop={1}>
          <Text dimColor>
            ↑↓: move | Enter: select | ESC: close
          </Text>
        </Box>
      </Box>
    );
  }

  // Status view
  if (view === 'status') {
    return (
      <Box flexDirection="column">
        {/* Header */}
        <Box borderStyle="single" borderColor="cyan" paddingX={1} marginBottom={1}>
          <Text color="cyan" bold>
            Settings &gt; Status
          </Text>
        </Box>

        {/* Status Information */}
        <Box borderStyle="single" borderColor="gray" paddingX={1} flexDirection="column">
          {systemStatus ? (
            <>
              <Box>
                <Text color="yellow">Version:      </Text>
                <Text>{systemStatus.version}</Text>
              </Box>
              <Box>
                <Text color="yellow">Session ID:   </Text>
                <Text>{systemStatus.sessionId}</Text>
              </Box>
              <Box>
                <Text color="yellow">Working Dir:  </Text>
                <Text>{systemStatus.workingDir}</Text>
              </Box>
              <Box>
                <Text color="yellow">Endpoint URL: </Text>
                <Text>{systemStatus.endpointUrl}</Text>
              </Box>
              <Box>
                <Text color="yellow">LLM Model:    </Text>
                <Text>{systemStatus.llmModel}</Text>
              </Box>
            </>
          ) : (
            <Text color="gray">Loading status...</Text>
          )}
        </Box>

        {/* Footer */}
        <Box marginTop={1}>
          <Text dimColor>
            ESC: back
          </Text>
        </Box>
      </Box>
    );
  }

  // Planning mode selection view
  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box borderStyle="single" borderColor="cyan" paddingX={1} marginBottom={1}>
        <Text color="cyan" bold>
          Settings &gt; Planning Mode
        </Text>
      </Box>

      {/* Description */}
      <Box paddingX={1} marginBottom={1}>
        <Text color="gray">
          Select the planning mode for task execution:
        </Text>
      </Box>

      {/* Mode descriptions */}
      <Box paddingX={1} marginBottom={1} flexDirection="column">
        <Text color="yellow">• planning: </Text>
        <Text color="gray">  Always create TODO list before execution</Text>
        <Text color="yellow">• no-planning: </Text>
        <Text color="gray">  Execute directly without planning</Text>
        <Text color="yellow">• auto: </Text>
        <Text color="gray">  Automatically decide based on task complexity</Text>
      </Box>

      {/* Options List */}
      <Box borderStyle="single" borderColor="gray" paddingX={1}>
        <SelectInput
          items={planningModeItems}
          onSelect={handlePlanningModeSelect}
        />
      </Box>

      {/* Footer */}
      <Box marginTop={1}>
        <Text dimColor>
          ↑↓: move | Enter: select | ESC: back
        </Text>
      </Box>
    </Box>
  );
};
