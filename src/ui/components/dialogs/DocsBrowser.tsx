/**
 * DocsBrowser Component
 *
 * Interactive browser for downloading framework documentation
 * Shows available sources with download status
 */

import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Spinner from 'ink-spinner';
import {
  getAvailableSources,
  getDocsInfo,
  downloadDocsFromSource,
  type DocsSource,
} from '../../../core/docs-manager.js';
import { logger } from '../../../utils/logger.js';

interface DocsBrowserProps {
  onClose: () => void;
  onDownloadComplete?: (sourceId: string, success: boolean) => void;
}

interface SourceStatus {
  source: DocsSource;
  installed: boolean;
}

export const DocsBrowser: React.FC<DocsBrowserProps> = ({
  onClose,
  onDownloadComplete,
}) => {
  const [sources, setSources] = useState<SourceStatus[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingSourceId, setDownloadingSourceId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Load sources and their status
  useEffect(() => {
    const loadSources = async () => {
      logger.enter('DocsBrowser.loadSources');
      try {
        const availableSources = getAvailableSources();
        const docsInfo = await getDocsInfo();

        const sourcesWithStatus: SourceStatus[] = availableSources.map((source) => ({
          source,
          installed: docsInfo.installedSources.includes(source.id),
        }));

        setSources(sourcesWithStatus);
        logger.exit('DocsBrowser.loadSources', { count: sourcesWithStatus.length });
      } catch (error) {
        logger.error('Failed to load sources', error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSources();
  }, []);

  // Handle download
  const handleDownload = async (sourceId: string) => {
    logger.enter('DocsBrowser.handleDownload', { sourceId });
    setIsDownloading(true);
    setDownloadingSourceId(sourceId);
    setMessage(null);

    try {
      const result = await downloadDocsFromSource(sourceId);

      if (result.success) {
        setMessage(`✅ ${result.message} (${result.downloadedFiles}개 파일)`);
        // Update installed status
        setSources((prev) =>
          prev.map((s) =>
            s.source.id === sourceId ? { ...s, installed: true } : s
          )
        );
      } else {
        setMessage(`❌ ${result.message}`);
      }

      onDownloadComplete?.(sourceId, result.success);
      logger.exit('DocsBrowser.handleDownload', { success: result.success });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`❌ 다운로드 실패: ${errorMsg}`);
      logger.error('Download failed', error as Error);
    } finally {
      setIsDownloading(false);
      setDownloadingSourceId(null);
    }
  };

  // Keyboard navigation
  useInput((input, key) => {
    if (isDownloading) return;

    if (key.escape) {
      onClose();
      return;
    }

    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
      setMessage(null);
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(sources.length - 1, prev + 1));
      setMessage(null);
    } else if (key.return) {
      const selected = sources[selectedIndex];
      if (selected) {
        handleDownload(selected.source.id);
      }
    }

    // Number key shortcuts (1-9)
    const num = parseInt(input);
    if (!isNaN(num) && num >= 1 && num <= sources.length) {
      setSelectedIndex(num - 1);
      const selected = sources[num - 1];
      if (selected) {
        handleDownload(selected.source.id);
      }
    }
  });

  if (isLoading) {
    return (
      <Box borderStyle="single" borderColor="cyan" paddingX={1} paddingY={0}>
        <Spinner type="dots" />
        <Text color="cyan"> 문서 소스 로딩 중...</Text>
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      borderStyle="single"
      borderColor="cyan"
      paddingX={1}
      paddingY={0}
    >
      {/* Header */}
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          📚 문서 다운로드
        </Text>
        <Text color="gray"> (↑↓ 이동, Enter 다운로드, ESC 닫기)</Text>
      </Box>

      {/* Source list */}
      {sources.map((item, index) => {
        const isSelected = index === selectedIndex;
        const isCurrentlyDownloading = downloadingSourceId === item.source.id;

        return (
          <Box key={item.source.id}>
            {/* Selection indicator */}
            <Text color={isSelected ? 'cyan' : 'gray'}>
              {isSelected ? '❯ ' : '  '}
            </Text>

            {/* Number */}
            <Text color="gray">{index + 1}. </Text>

            {/* Status icon */}
            {isCurrentlyDownloading ? (
              <Text color="yellow">
                <Spinner type="dots" />{' '}
              </Text>
            ) : item.installed ? (
              <Text color="green">✅ </Text>
            ) : (
              <Text color="gray">⬜ </Text>
            )}

            {/* Source name */}
            <Text color={isSelected ? 'white' : 'gray'} bold={isSelected}>
              {item.source.name}
            </Text>

            {/* Description */}
            <Text color="gray"> - {item.source.description}</Text>

            {/* Status text */}
            {item.installed && !isCurrentlyDownloading && (
              <Text color="green" dimColor>
                {' '}
                (설치됨)
              </Text>
            )}
            {isCurrentlyDownloading && (
              <Text color="yellow"> 다운로드 중...</Text>
            )}
          </Box>
        );
      })}

      {/* Message */}
      {message && (
        <Box marginTop={1}>
          <Text>{message}</Text>
        </Box>
      )}

      {/* Footer hint */}
      <Box marginTop={1}>
        <Text color="gray" dimColor>
          설치된 문서는 AI가 자동으로 검색하여 참조합니다.
        </Text>
      </Box>
    </Box>
  );
};

export default DocsBrowser;
