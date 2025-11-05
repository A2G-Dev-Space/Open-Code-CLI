/**
 * Update Notification UI Component
 *
 * React component for displaying update notifications in Ink
 */

import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

interface UpdateNotificationProps {
  currentVersion: string;
  latestVersion: string;
  changelog?: string;
  releaseDate?: string;
  isUpdating?: boolean;
  updateProgress?: string;
  error?: string;
}

/**
 * Update Notification Component
 * Shows update availability and progress
 */
export const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  currentVersion,
  latestVersion,
  changelog,
  releaseDate,
  isUpdating = false,
  updateProgress,
  error
}) => {
  if (error) {
    return (
      <Box borderStyle="round" borderColor="red" padding={1} marginY={1}>
        <Box flexDirection="column">
          <Text color="red" bold>❌ Update Failed</Text>
          <Text color="dim">{error}</Text>
        </Box>
      </Box>
    );
  }

  if (isUpdating) {
    return (
      <Box borderStyle="round" borderColor="cyan" padding={1} marginY={1}>
        <Box flexDirection="column">
          <Box>
            <Text color="cyan">
              <Spinner type="dots" /> Updating...
            </Text>
          </Box>
          {updateProgress && (
            <Text color="dim">  {updateProgress}</Text>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box borderStyle="round" borderColor="yellow" padding={1} marginY={1}>
      <Box flexDirection="column">
        <Text color="yellow" bold>
          🚀 New Version Available!
        </Text>

        <Box marginTop={1}>
          <Text>Current Version: </Text>
          <Text color="red">{currentVersion}</Text>
        </Box>

        <Box>
          <Text>Latest Version:  </Text>
          <Text color="green">{latestVersion}</Text>
        </Box>

        {releaseDate && (
          <Box>
            <Text>Released: </Text>
            <Text color="dim">{new Date(releaseDate).toLocaleDateString()}</Text>
          </Box>
        )}

        {changelog && (
          <Box flexDirection="column" marginTop={1}>
            <Text color="cyan" bold>📝 Changelog:</Text>
            <Box paddingLeft={2}>
              <Text color="dim">{changelog.split('\n').slice(0, 3).join('\n')}</Text>
            </Box>
          </Box>
        )}

        <Box marginTop={1}>
          <Text color="dim" italic>
            Press Y to update, N to skip, or S to skip this version
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateNotification;