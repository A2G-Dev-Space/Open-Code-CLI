/**
 * Git-based Auto-Update System
 *
 * Updates the CLI by cloning/pulling from GitHub repository
 * No API rate limits, uses pure git commands
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import ora from 'ora';
import { logger } from '../utils/logger.js';

export class GitAutoUpdater {
  private repoUrl: string = 'https://github.com/A2G-Dev-Space/Open-Code-CLI.git';
  private repoDir: string;
  private enabled: boolean = true;

  constructor(options?: { repoUrl?: string; enabled?: boolean }) {
    this.repoDir = path.join(os.homedir(), '.open-cli', 'repo');

    if (options?.repoUrl) {
      this.repoUrl = options.repoUrl;
    }

    if (options?.enabled !== undefined) {
      this.enabled = options.enabled;
    }
  }

  /**
   * Main entry point - runs on every 'open' command
   */
  async run(options: { noUpdate?: boolean } = {}): Promise<void> {
    if (options.noUpdate || !this.enabled) {
      logger.debug('Git auto-update is disabled');
      return;
    }

    try {
      // Check if repo directory exists
      if (!fs.existsSync(this.repoDir)) {
        // First run: clone and setup
        await this.initialSetup();
      } else {
        // Subsequent runs: pull and update if needed
        await this.pullAndUpdate();
      }
    } catch (error) {
      logger.error('Git auto-update failed', error);
      console.log(chalk.yellow('⚠️  Auto-update failed, continuing with current version...'));
    }
  }

  /**
   * First run: Clone repository and setup npm link
   */
  private async initialSetup(): Promise<void> {
    const spinner = ora('Setting up auto-update (first run)...').start();

    try {
      logger.info('Initial setup started', { repoDir: this.repoDir, repoUrl: this.repoUrl });

      // Create parent directory
      const parentDir = path.dirname(this.repoDir);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
        logger.debug('Created parent directory', { parentDir });
      }

      // Clone repository
      spinner.text = 'Cloning repository...';
      logger.debug('Cloning repository', { repoUrl: this.repoUrl, destination: this.repoDir });

      execSync(`git clone ${this.repoUrl} ${this.repoDir}`, {
        stdio: 'pipe',
        encoding: 'utf-8',
      });

      logger.info('Repository cloned successfully');

      // Install dependencies
      spinner.text = 'Installing dependencies...';
      logger.debug('Running npm install', { cwd: this.repoDir });

      execSync('npm install', {
        cwd: this.repoDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      });

      // Build project
      spinner.text = 'Building project...';
      logger.debug('Running npm run build', { cwd: this.repoDir });

      execSync('npm run build', {
        cwd: this.repoDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      });

      // Create global link
      spinner.text = 'Creating global link...';
      logger.debug('Running npm link', { cwd: this.repoDir });

      execSync('npm link', {
        cwd: this.repoDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      });

      spinner.succeed('Auto-update setup complete!');
      logger.info('Initial setup completed successfully');

      console.log(chalk.green('✨ OPEN-CLI is now linked globally'));
      console.log(chalk.dim('   Future updates will be automatic on each run'));
      console.log();
    } catch (error: any) {
      spinner.fail('Setup failed');
      logger.error('Initial setup failed', error);

      // Log detailed error info
      if (error.stderr) {
        logger.error('Setup error output', { stderr: error.stderr.toString() });
      }

      throw error;
    }
  }

  /**
   * Pull latest changes and rebuild if needed
   */
  private async pullAndUpdate(): Promise<void> {
    logger.debug('Checking for updates', { repoDir: this.repoDir });

    try {
      // Check git status first
      const status = execSync('git status --porcelain', {
        cwd: this.repoDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      if (status.trim() !== '') {
        logger.warn('Local changes detected in repo directory', { status });
        console.log(chalk.yellow('⚠️  Local changes detected in ~/.open-cli/repo'));
        console.log(chalk.dim('   Skipping auto-update to preserve changes'));
        return;
      }

      // Pull latest changes
      logger.debug('Pulling latest changes from main branch');

      const pullOutput = execSync('git pull origin main', {
        cwd: this.repoDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      logger.debug('Git pull output', { output: pullOutput });

      // Check if there were any changes
      if (pullOutput.includes('Already up to date') || pullOutput.includes('Already up-to-date')) {
        logger.debug('Already up to date, no rebuild needed');
        return;
      }

      // Changes detected - rebuild
      logger.info('Changes detected, rebuilding...', { pullOutput });

      const spinner = ora('Updating to latest version...').start();

      try {
        // Install dependencies (in case package.json changed)
        spinner.text = 'Installing dependencies...';
        logger.debug('Running npm install after update');

        execSync('npm install', {
          cwd: this.repoDir,
          stdio: 'pipe',
          encoding: 'utf-8',
        });

        // Rebuild
        spinner.text = 'Building project...';
        logger.debug('Running npm run build after update');

        execSync('npm run build', {
          cwd: this.repoDir,
          stdio: 'pipe',
          encoding: 'utf-8',
        });

        // Re-link (to ensure latest dist is linked)
        spinner.text = 'Updating global link...';
        logger.debug('Running npm link after update');

        execSync('npm link', {
          cwd: this.repoDir,
          stdio: 'pipe',
          encoding: 'utf-8',
        });

        spinner.succeed('Updated to latest version!');
        logger.info('Auto-update completed successfully');

        console.log(chalk.green('✨ CLI updated to latest version'));
        console.log();
      } catch (buildError: any) {
        spinner.fail('Update failed');
        logger.error('Build/link failed after pull', buildError);

        // Try to rollback
        try {
          logger.info('Attempting to rollback');
          execSync('git reset --hard HEAD@{1}', {
            cwd: this.repoDir,
            stdio: 'pipe',
          });
          logger.info('Rollback successful');
          console.log(chalk.yellow('⚠️  Update failed, rolled back to previous version'));
        } catch (rollbackError) {
          logger.error('Rollback failed', rollbackError);
          console.log(chalk.red('❌ Update and rollback failed'));
          console.log(chalk.dim(`   You may need to manually fix: ${this.repoDir}`));
        }
      }
    } catch (error: any) {
      logger.error('Pull and update failed', error);

      if (error.stderr) {
        logger.error('Git error output', { stderr: error.stderr.toString() });
      }

      // Don't throw - just log and continue with current version
      console.log(chalk.yellow('⚠️  Could not check for updates, continuing with current version'));
    }
  }

  /**
   * Get current repository status
   */
  async getStatus(): Promise<{ exists: boolean; hasChanges: boolean; currentCommit?: string }> {
    if (!fs.existsSync(this.repoDir)) {
      return { exists: false, hasChanges: false };
    }

    try {
      const status = execSync('git status --porcelain', {
        cwd: this.repoDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      const commit = execSync('git rev-parse HEAD', {
        cwd: this.repoDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      }).trim();

      return {
        exists: true,
        hasChanges: status.trim() !== '',
        currentCommit: commit,
      };
    } catch (error) {
      logger.error('Failed to get repository status', error);
      return { exists: true, hasChanges: false };
    }
  }
}

export default GitAutoUpdater;
