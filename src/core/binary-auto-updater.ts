/**
 * Binary Auto-Update System
 *
 * Updates the standalone binary (pkg-built) by downloading from release server
 *
 * Flow:
 * 1. Check current version vs latest version
 * 2. Download new binary to temp location
 * 3. Replace old binary (after exit on Windows)
 * 4. Restart with new binary
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import https from 'https';
import http from 'http';
import { spawn } from 'child_process';
import { logger } from '../utils/logger.js';
import { ADMIN_SERVER_URL, APP_VERSION } from '../constants.js';

/**
 * Update status for UI display
 */
export type BinaryUpdateStatus =
  | { type: 'checking' }
  | { type: 'no_update'; currentVersion: string }
  | { type: 'downloading'; progress: number; version: string }
  | { type: 'installing'; version: string }
  | { type: 'complete'; version: string; needsRestart: boolean }
  | { type: 'error'; message: string }
  | { type: 'not_binary' };  // Running in Node.js mode, not pkg

export type StatusCallback = (status: BinaryUpdateStatus) => void;

/**
 * Check if running as a compiled binary (pkg or Bun)
 */
export function isRunningAsBinary(): boolean {
  // pkg sets process.pkg when running as binary
  if ((process as NodeJS.Process & { pkg?: unknown }).pkg) {
    return true;
  }

  // Bun compiled binary: execPath contains the binary name, not 'node' or 'bun'
  const execName = path.basename(process.execPath);
  if (execName === 'nexus' || execName.startsWith('nexus-')) {
    return true;
  }

  return false;
}

/**
 * Get the path to the current executable
 */
function getExecutablePath(): string {
  return process.execPath;
}

/**
 * Get platform identifier for binary naming
 */
function getPlatformId(): string {
  const platform = os.platform();
  const arch = os.arch();

  if (platform === 'win32') return 'win-x64';
  if (platform === 'darwin') return arch === 'arm64' ? 'macos-arm64' : 'macos-x64';
  return 'linux-x64';
}

/**
 * Binary Auto Updater
 */
export class BinaryAutoUpdater {
  private releaseUrl: string;
  private onStatus: StatusCallback | null = null;
  private currentVersion: string;

  constructor(options?: { releaseUrl?: string; onStatus?: StatusCallback }) {
    // Default to admin server for release binaries
    this.releaseUrl = options?.releaseUrl || `${ADMIN_SERVER_URL}/releases/nexus-coder`;
    this.onStatus = options?.onStatus || null;
    this.currentVersion = APP_VERSION;
  }

  setStatusCallback(callback: StatusCallback): void {
    this.onStatus = callback;
  }

  private emitStatus(status: BinaryUpdateStatus): void {
    if (this.onStatus) {
      this.onStatus(status);
    }
  }

  /**
   * Main entry point - check and update if needed
   */
  async run(): Promise<boolean> {
    logger.enter('BinaryAutoUpdater.run');

    // Check if running as binary
    if (!isRunningAsBinary()) {
      logger.debug('Not running as binary, skipping binary update');
      this.emitStatus({ type: 'not_binary' });
      return false;
    }

    this.emitStatus({ type: 'checking' });

    try {
      // Check for latest version
      const latestVersion = await this.getLatestVersion();

      if (!latestVersion) {
        logger.debug('Could not fetch latest version');
        this.emitStatus({ type: 'no_update', currentVersion: this.currentVersion });
        return false;
      }

      if (!this.isNewerVersion(latestVersion)) {
        logger.debug('Already on latest version', { current: this.currentVersion, latest: latestVersion });
        this.emitStatus({ type: 'no_update', currentVersion: this.currentVersion });
        return false;
      }

      logger.info('New version available', { current: this.currentVersion, latest: latestVersion });

      // Download new binary
      const tempPath = await this.downloadBinary(latestVersion);
      if (!tempPath) {
        this.emitStatus({ type: 'error', message: 'Failed to download update' });
        return false;
      }

      // Install (replace binary)
      this.emitStatus({ type: 'installing', version: latestVersion });
      const success = await this.installBinary(tempPath);

      if (success) {
        this.emitStatus({ type: 'complete', version: latestVersion, needsRestart: true });
        return true;
      } else {
        this.emitStatus({ type: 'error', message: 'Failed to install update' });
        return false;
      }

    } catch (error) {
      logger.error('Binary auto-update failed', error as Error);
      this.emitStatus({ type: 'error', message: (error as Error).message });
      return false;
    }
  }

  /**
   * Get latest version from release server
   */
  private async getLatestVersion(): Promise<string | null> {
    try {
      const response = await this.httpGet(`${this.releaseUrl}/latest.json`);
      const data = JSON.parse(response);
      return data.version || null;
    } catch (error) {
      logger.error('Failed to fetch latest version', error as Error);
      return null;
    }
  }

  /**
   * Compare versions (semver-like)
   */
  private isNewerVersion(latest: string): boolean {
    const current = this.currentVersion.split('.').map(Number);
    const newer = latest.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      if ((newer[i] || 0) > (current[i] || 0)) return true;
      if ((newer[i] || 0) < (current[i] || 0)) return false;
    }
    return false;
  }

  /**
   * Download new binary to temp location
   */
  private async downloadBinary(version: string): Promise<string | null> {
    const platformId = getPlatformId();
    const binaryName = platformId.startsWith('win') ? 'nexus.exe' : 'nexus';
    const downloadUrl = `${this.releaseUrl}/${version}/${platformId}/${binaryName}`;

    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, `nexus-update-${version}${platformId.startsWith('win') ? '.exe' : ''}`);

    logger.debug('Downloading binary', { url: downloadUrl, tempPath });

    try {
      await this.downloadFile(downloadUrl, tempPath, (progress) => {
        this.emitStatus({ type: 'downloading', progress, version });
      });

      // Make executable on Unix
      if (os.platform() !== 'win32') {
        fs.chmodSync(tempPath, 0o755);
      }

      return tempPath;
    } catch (error) {
      logger.error('Failed to download binary', error as Error);
      return null;
    }
  }

  /**
   * Install new binary (replace current executable)
   */
  private async installBinary(tempPath: string): Promise<boolean> {
    const currentPath = getExecutablePath();
    const backupPath = currentPath + '.backup';

    try {
      // On Windows, we can't replace a running executable
      // So we create a batch script to do it after exit
      if (os.platform() === 'win32') {
        return this.installBinaryWindows(tempPath, currentPath);
      }

      // On Unix, we can replace the file while it's running
      // The running process keeps the old file descriptor

      // Backup current binary
      if (fs.existsSync(backupPath)) {
        fs.unlinkSync(backupPath);
      }
      fs.copyFileSync(currentPath, backupPath);

      // Replace with new binary
      fs.copyFileSync(tempPath, currentPath);
      fs.chmodSync(currentPath, 0o755);

      // Clean up temp file
      fs.unlinkSync(tempPath);

      logger.info('Binary updated successfully');
      return true;

    } catch (error) {
      logger.error('Failed to install binary', error as Error);

      // Try to restore backup
      if (fs.existsSync(backupPath)) {
        try {
          fs.copyFileSync(backupPath, currentPath);
        } catch {
          // Ignore restore errors
        }
      }
      return false;
    }
  }

  /**
   * Windows-specific installation (creates update script)
   */
  private installBinaryWindows(tempPath: string, currentPath: string): boolean {
    const updateScript = path.join(os.tmpdir(), 'nexus-update.bat');

    // Create batch script that:
    // 1. Waits for current process to exit
    // 2. Replaces the binary
    // 3. Starts the new binary
    const script = `
@echo off
:wait
timeout /t 1 /nobreak >nul
tasklist /FI "PID eq ${process.pid}" | find "${process.pid}" >nul
if not errorlevel 1 goto wait
copy /Y "${tempPath}" "${currentPath}"
del "${tempPath}"
del "%~f0"
start "" "${currentPath}"
`;

    try {
      fs.writeFileSync(updateScript, script);

      // Start the update script detached
      spawn('cmd.exe', ['/c', updateScript], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      }).unref();

      logger.info('Windows update script created, will execute after exit');
      return true;
    } catch (error) {
      logger.error('Failed to create Windows update script', error as Error);
      return false;
    }
  }

  /**
   * HTTP GET request
   */
  private httpGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;

      protocol.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve(data));
        res.on('error', reject);
      }).on('error', reject);
    });
  }

  /**
   * Download file with progress
   */
  private downloadFile(
    url: string,
    destPath: string,
    onProgress: (progress: number) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(destPath);

      protocol.get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(destPath);
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const totalSize = parseInt(res.headers['content-length'] || '0', 10);
        let downloadedSize = 0;

        res.on('data', (chunk: Buffer) => {
          downloadedSize += chunk.length;
          if (totalSize > 0) {
            onProgress(Math.round((downloadedSize / totalSize) * 100));
          }
        });

        res.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve();
        });

        file.on('error', (err) => {
          file.close();
          fs.unlinkSync(destPath);
          reject(err);
        });
      }).on('error', (err) => {
        file.close();
        fs.unlinkSync(destPath);
        reject(err);
      });
    });
  }
}

export default BinaryAutoUpdater;
