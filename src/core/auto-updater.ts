/**
 * GitHub Release Auto-Update System
 *
 * Handles automatic version checking and updates from GitHub Releases
 */

import axios from 'axios';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import semver from 'semver';
import { ReleaseInfo, UpdateCheckResult, AutoUpdateConfig } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * AutoUpdater Class
 * Manages version checking and automatic updates from GitHub Releases
 */
export class AutoUpdater {
  private owner: string = 'A2G-Dev-Space';
  private repo: string = 'Open-Code-CLI';
  private currentVersion: string;
  private apiBaseUrl: string = 'https://api.github.com';
  private config: AutoUpdateConfig;
  private packageJsonPath: string;

  constructor(config?: Partial<AutoUpdateConfig>) {
    // Get project root and package.json path
    const projectRoot = path.resolve(__dirname, '../../');
    this.packageJsonPath = path.join(projectRoot, 'package.json');

    // Read current version from package.json
    if (fs.existsSync(this.packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf-8'));
      this.currentVersion = packageJson.version;
    } else {
      this.currentVersion = '0.0.0';
      console.warn(chalk.yellow('⚠️ package.json not found, using default version 0.0.0'));
    }

    // Set default config
    this.config = {
      enabled: true,
      checkOnStartup: true,
      autoInstall: false,
      channel: 'stable',
      ...config
    };
  }

  /**
   * Check for updates from GitHub Releases
   */
  async checkForUpdates(silent: boolean = false): Promise<UpdateCheckResult> {
    if (!this.config.enabled) {
      return {
        hasUpdate: false,
        currentVersion: this.currentVersion
      };
    }

    const spinner = !silent ? ora('Checking for updates...').start() : null;

    try {
      // GitHub API: Get latest release
      const url = `${this.apiBaseUrl}/repos/${this.owner}/${this.repo}/releases/latest`;

      const response = await axios.get(url, {
        timeout: 5000, // 5 second timeout
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'OPEN-CLI',
        },
      });

      const release = response.data;
      const latestVersion = release.tag_name.replace(/^v/, ''); // "v1.0.0" → "1.0.0"

      // Check if this version should be skipped
      if (this.config.skipVersion === latestVersion) {
        spinner?.succeed('Update check complete (version skipped)');
        return {
          hasUpdate: false,
          currentVersion: this.currentVersion,
          latestVersion
        };
      }

      // Compare versions using semver
      if (semver.gt(latestVersion, this.currentVersion)) {
        spinner?.succeed('New version available!');

        const releaseInfo: ReleaseInfo = {
          version: latestVersion,
          releaseDate: release.published_at,
          downloadUrl: release.tarball_url,
          changelog: release.body || 'No changelog available',
          assets: release.assets.map((asset: any) => ({
            name: asset.name,
            url: asset.browser_download_url,
            size: asset.size,
          })),
        };

        return {
          hasUpdate: true,
          currentVersion: this.currentVersion,
          latestVersion,
          releaseInfo
        };
      }

      spinner?.succeed('You are using the latest version');
      return {
        hasUpdate: false,
        currentVersion: this.currentVersion,
        latestVersion,
      };
    } catch (error: any) {
      spinner?.fail('Update check failed');

      if (!silent) {
        // Only show error in verbose mode
        if (this.config.enabled && !silent) {
          console.log(chalk.dim(`  ${error.message}`));
        }
      }

      return {
        hasUpdate: false,
        currentVersion: this.currentVersion,
        error: error.message,
      };
    }
  }

  /**
   * Show update notification to user
   */
  async showUpdateNotification(releaseInfo: ReleaseInfo): Promise<boolean> {
    console.log();
    console.log(chalk.cyan('┌─────────────────────────────────────────────────────────────────┐'));
    console.log(chalk.cyan('│') + chalk.bold.yellow('  🚀 New Version Available!                                      ') + chalk.cyan('│'));
    console.log(chalk.cyan('├─────────────────────────────────────────────────────────────────┤'));
    console.log(chalk.cyan('│') + `  Current Version: ${chalk.red(this.currentVersion)}                                            ${chalk.cyan('│')}`);
    console.log(chalk.cyan('│') + `  Latest Version:  ${chalk.green(releaseInfo.version)}                                            ${chalk.cyan('│')}`);
    console.log(chalk.cyan('│') + `  Released:        ${new Date(releaseInfo.releaseDate).toLocaleDateString()}                                  ${chalk.cyan('│')}`);
    console.log(chalk.cyan('├─────────────────────────────────────────────────────────────────┤'));
    console.log(chalk.cyan('│') + chalk.bold('  📝 Changelog:                                                  ') + chalk.cyan('│'));

    // Display changelog (truncate if too long)
    const changelogLines = releaseInfo.changelog.split('\n').slice(0, 5);
    changelogLines.forEach(line => {
      const truncated = line.length > 60 ? line.substring(0, 57) + '...' : line;
      const padded = truncated.padEnd(63);
      console.log(chalk.cyan('│') + `  ${padded} ${chalk.cyan('│')}`);
    });

    console.log(chalk.cyan('│                                                                 │'));
    console.log(chalk.cyan('│') + `  ${chalk.dim('⏱️  Estimated time: 2-3 minutes')}                                  ${chalk.cyan('│')}`);
    console.log(chalk.cyan('└─────────────────────────────────────────────────────────────────┘'));
    console.log();

    if (this.config.autoInstall) {
      console.log(chalk.yellow('  Auto-install is enabled. Starting update...'));
      return true;
    }

    // Ask user for confirmation
    const { shouldUpdate, skipVersion } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldUpdate',
        message: 'Would you like to update now?',
        default: true
      },
      {
        type: 'confirm',
        name: 'skipVersion',
        message: 'Skip this version in the future?',
        default: false,
        when: (answers) => !answers.shouldUpdate
      }
    ]);

    if (skipVersion) {
      // Save skip version to config
      this.config.skipVersion = releaseInfo.version;
      this.saveConfig();
    }

    return shouldUpdate;
  }

  /**
   * Perform the update
   */
  async performUpdate(releaseInfo: ReleaseInfo): Promise<{ success: boolean; error?: string }> {
    // Check if we're in a git repository
    const isGitRepo = fs.existsSync(path.join(process.cwd(), '.git'));

    if (isGitRepo) {
      return await this.performGitUpdate();
    } else {
      return await this.performTarballUpdate(releaseInfo);
    }
  }

  /**
   * Git-based update (for development)
   */
  private async performGitUpdate(): Promise<{ success: boolean; error?: string }> {
    const spinner = ora('Updating via Git...').start();

    try {
      // Check for uncommitted changes
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });

      if (gitStatus.trim() !== '') {
        spinner.fail('Update failed: Local changes detected');
        return {
          success: false,
          error: 'Please commit or stash your changes before updating.',
        };
      }

      // Pull latest changes
      spinner.text = 'Pulling latest changes...';
      execSync('git pull origin main', { stdio: 'pipe' });

      // Update dependencies
      spinner.text = 'Installing dependencies...';
      execSync('npm install', { stdio: 'pipe' });

      // Build the project
      spinner.text = 'Building project...';
      execSync('npm run build', { stdio: 'pipe' });

      spinner.succeed('Update completed successfully!');
      return { success: true };
    } catch (error: any) {
      spinner.fail('Update failed');
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Tarball-based update (for production)
   */
  private async performTarballUpdate(releaseInfo: ReleaseInfo): Promise<{ success: boolean; error?: string }> {
    const spinner = ora('Downloading update...').start();
    const tempDir = path.join(os.tmpdir(), `open-cli-update-${Date.now()}`);
    const currentDir = process.cwd();
    const backupDir = path.join(currentDir, '..', `open-cli-backup-${Date.now()}`);

    try {
      // Create temp directory
      fs.mkdirSync(tempDir, { recursive: true });

      // Download tarball
      spinner.text = 'Downloading release...';
      const tarballPath = path.join(tempDir, 'update.tar.gz');
      const response = await axios.get(releaseInfo.downloadUrl, {
        responseType: 'stream',
        timeout: 60000, // 60 seconds
        headers: {
          'User-Agent': 'OPEN-CLI'
        }
      });

      // Save to file
      const writer = fs.createWriteStream(tarballPath);
      response.data.pipe(writer);

      await new Promise<void>((resolve, reject) => {
        writer.on('finish', () => resolve());
        writer.on('error', reject);
      });

      // Extract tarball
      spinner.text = 'Extracting files...';
      execSync(`tar -xzf "${tarballPath}" -C "${tempDir}"`, { stdio: 'pipe' });

      // Find extracted directory
      const extractedDirs = fs.readdirSync(tempDir).filter(dir =>
        dir !== 'update.tar.gz' && fs.statSync(path.join(tempDir, dir)).isDirectory()
      );

      if (extractedDirs.length === 0) {
        throw new Error('No directory found in tarball');
      }

      const sourcePath = path.join(tempDir, extractedDirs[0]!);

      // Create backup
      spinner.text = 'Creating backup...';
      fs.cpSync(currentDir, backupDir, {
        recursive: true,
        filter: (src) => !src.includes('node_modules') && !src.includes('.git')
      });

      // Update files (preserve user config)
      spinner.text = 'Updating files...';
      const filesToUpdate = ['src', 'dist', 'package.json', 'package-lock.json', 'tsconfig.json'];
      // Note: config files like '.open-cli', 'open-cli.config.json', 'OPEN_CLI.md' are preserved

      for (const file of filesToUpdate) {
        const srcPath = path.join(sourcePath, file);
        const destPath = path.join(currentDir, file);

        if (fs.existsSync(srcPath)) {
          // Remove old version
          if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
          }
          // Copy new version
          fs.cpSync(srcPath, destPath, { recursive: true });
        }
      }

      // Install dependencies
      spinner.text = 'Installing dependencies...';
      execSync('npm install', { cwd: currentDir, stdio: 'pipe' });

      // Build project
      spinner.text = 'Building project...';
      execSync('npm run build', { cwd: currentDir, stdio: 'pipe' });

      // Cleanup temp files
      fs.rmSync(tempDir, { recursive: true, force: true });

      spinner.succeed('Update completed successfully!');
      console.log(chalk.dim(`  Backup saved at: ${backupDir}`));

      return { success: true };
    } catch (error: any) {
      spinner.fail('Update failed');

      // Attempt rollback
      if (fs.existsSync(backupDir)) {
        try {
          spinner.start('Rolling back to previous version...');

          // Restore from backup
          const filesToRestore = ['src', 'dist', 'package.json', 'package-lock.json', 'tsconfig.json'];
          for (const file of filesToRestore) {
            const backupPath = path.join(backupDir, file);
            const destPath = path.join(currentDir, file);

            if (fs.existsSync(backupPath)) {
              if (fs.existsSync(destPath)) {
                fs.rmSync(destPath, { recursive: true, force: true });
              }
              fs.cpSync(backupPath, destPath, { recursive: true });
            }
          }

          execSync('npm install', { cwd: currentDir, stdio: 'pipe' });
          spinner.succeed('Rollback completed');
        } catch (rollbackError) {
          spinner.fail('Rollback failed');
          console.error(chalk.red('  Manual intervention may be required'));
          console.error(chalk.dim(`  Backup location: ${backupDir}`));
        }
      }

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }

      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Save configuration
   */
  private saveConfig(): void {
    // Save to config file
    const configPath = path.join(os.homedir(), '.open-cli', 'config.json');

    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      config.settings = config.settings || {};
      config.settings.autoUpdate = this.config;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
  }

  /**
   * Run the complete update flow
   */
  async run(options: { noUpdate?: boolean; silent?: boolean } = {}): Promise<void> {
    if (options.noUpdate || !this.config.checkOnStartup) {
      return;
    }

    const checkResult = await this.checkForUpdates(options.silent || false);

    if (checkResult.hasUpdate && checkResult.releaseInfo) {
      const shouldUpdate = await this.showUpdateNotification(checkResult.releaseInfo);

      if (shouldUpdate) {
        const updateResult = await this.performUpdate(checkResult.releaseInfo);

        if (updateResult.success) {
          console.log();
          console.log(chalk.green('✨ Update completed successfully!'));
          console.log(chalk.cyan('Please restart the CLI to use the new version.'));
          process.exit(0);
        } else {
          console.error(chalk.red(`\n❌ Update failed: ${updateResult.error}`));
          console.log(chalk.yellow('You can continue using the current version.'));
        }
      }
    }
  }
}

// Export for use in CLI
export default AutoUpdater;