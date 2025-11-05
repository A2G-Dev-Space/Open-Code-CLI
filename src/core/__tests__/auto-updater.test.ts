/**
 * Auto-updater tests
 */

import { AutoUpdater } from '../auto-updater';
import axios from 'axios';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Mock dependencies
jest.mock('axios');
jest.mock('child_process');
jest.mock('fs');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedExecSync = execSync as jest.Mock;
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('AutoUpdater', () => {
  let autoUpdater: AutoUpdater;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock package.json reading
    mockedFs.existsSync = jest.fn().mockReturnValue(true);
    mockedFs.readFileSync = jest.fn().mockReturnValue(JSON.stringify({
      version: '1.0.0'
    }));

    autoUpdater = new AutoUpdater({
      enabled: true,
      checkOnStartup: true,
      autoInstall: false,
      channel: 'stable'
    });
  });

  describe('checkForUpdates', () => {
    it('should detect newer version', async () => {
      // Mock GitHub API response
      mockedAxios.get.mockResolvedValue({
        data: {
          tag_name: 'v1.1.0',
          published_at: '2024-01-01T00:00:00Z',
          body: 'New features',
          tarball_url: 'https://api.github.com/repos/test/test/tarball/v1.1.0',
          assets: []
        }
      });

      const result = await autoUpdater.checkForUpdates(true);

      expect(result.hasUpdate).toBe(true);
      expect(result.currentVersion).toBe('1.0.0');
      expect(result.latestVersion).toBe('1.1.0');
      expect(result.releaseInfo).toBeDefined();
    });

    it('should handle same version', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          tag_name: 'v1.0.0',
          published_at: '2024-01-01T00:00:00Z',
          body: 'Current version',
          tarball_url: 'https://api.github.com/repos/test/test/tarball/v1.0.0',
          assets: []
        }
      });

      const result = await autoUpdater.checkForUpdates(true);

      expect(result.hasUpdate).toBe(false);
      expect(result.currentVersion).toBe('1.0.0');
      expect(result.latestVersion).toBe('1.0.0');
    });

    it('should handle older version on server', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          tag_name: 'v0.9.0',
          published_at: '2024-01-01T00:00:00Z',
          body: 'Old version',
          tarball_url: 'https://api.github.com/repos/test/test/tarball/v0.9.0',
          assets: []
        }
      });

      const result = await autoUpdater.checkForUpdates(true);

      expect(result.hasUpdate).toBe(false);
      expect(result.currentVersion).toBe('1.0.0');
      expect(result.latestVersion).toBe('0.9.0');
    });

    it('should handle network errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await autoUpdater.checkForUpdates(true);

      expect(result.hasUpdate).toBe(false);
      expect(result.error).toBe('Network error');
    });

    it('should respect timeout', async () => {
      mockedAxios.get.mockImplementation(() =>
        new Promise((resolve) => setTimeout(resolve, 10000))
      );

      const result = await autoUpdater.checkForUpdates(true);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          timeout: 5000
        })
      );
    });
  });

  describe('version comparison', () => {
    const testCases = [
      { current: '1.0.0', latest: '1.0.1', expected: true },
      { current: '1.0.0', latest: '1.1.0', expected: true },
      { current: '1.0.0', latest: '2.0.0', expected: true },
      { current: '1.0.0', latest: '1.0.0', expected: false },
      { current: '1.0.1', latest: '1.0.0', expected: false },
      { current: '2.0.0', latest: '1.9.9', expected: false },
      { current: '1.2.3', latest: '1.2.4', expected: true },
      { current: '1.2.3', latest: '1.3.0', expected: true },
    ];

    testCases.forEach(({ current, latest, expected }) => {
      it(`should compare ${current} vs ${latest} correctly`, async () => {
        // Override current version
        mockedFs.readFileSync = jest.fn().mockReturnValue(JSON.stringify({
          version: current
        }));

        autoUpdater = new AutoUpdater();

        mockedAxios.get.mockResolvedValue({
          data: {
            tag_name: `v${latest}`,
            published_at: '2024-01-01T00:00:00Z',
            body: 'Test',
            tarball_url: 'https://test.com',
            assets: []
          }
        });

        const result = await autoUpdater.checkForUpdates(true);
        expect(result.hasUpdate).toBe(expected);
      });
    });
  });

  describe('performGitUpdate', () => {
    it('should perform git update successfully', async () => {
      // Mock git operations
      mockedFs.existsSync.mockReturnValue(true);
      mockedExecSync.mockReturnValue('');

      const result = await autoUpdater['performGitUpdate']();

      expect(result.success).toBe(true);
      expect(mockedExecSync).toHaveBeenCalledWith('git status --porcelain', expect.any(Object));
      expect(mockedExecSync).toHaveBeenCalledWith('git pull origin main', expect.any(Object));
      expect(mockedExecSync).toHaveBeenCalledWith('npm install', expect.any(Object));
      expect(mockedExecSync).toHaveBeenCalledWith('npm run build', expect.any(Object));
    });

    it('should fail if uncommitted changes exist', async () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedExecSync.mockReturnValue('M src/test.ts');

      const result = await autoUpdater['performGitUpdate']();

      expect(result.success).toBe(false);
      expect(result.error).toContain('commit or stash');
    });

    it('should handle git errors', async () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedExecSync
        .mockReturnValueOnce('') // git status
        .mockImplementationOnce(() => {
          throw new Error('Git pull failed');
        });

      const result = await autoUpdater['performGitUpdate']();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Git pull failed');
    });
  });

  describe('configuration', () => {
    it('should respect disabled auto-update', async () => {
      autoUpdater = new AutoUpdater({
        enabled: false
      });

      const result = await autoUpdater.checkForUpdates();

      expect(result.hasUpdate).toBe(false);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should skip specified version', async () => {
      autoUpdater = new AutoUpdater({
        enabled: true,
        skipVersion: '1.1.0'
      });

      mockedAxios.get.mockResolvedValue({
        data: {
          tag_name: 'v1.1.0',
          published_at: '2024-01-01T00:00:00Z',
          body: 'Skipped version',
          tarball_url: 'https://test.com',
          assets: []
        }
      });

      const result = await autoUpdater.checkForUpdates();

      expect(result.hasUpdate).toBe(false);
    });
  });
});