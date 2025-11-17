/**
 * Approval Manager
 *
 * Handles user approval requests for risky operations
 * in the Plan & Execute workflow.
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { RiskAssessment } from './risk-analyzer.js';
import { TodoItem } from '../types/index.js';

export type ApprovalAction =
  | 'approve'
  | 'reject'
  | 'approve_all'
  | 'reject_all'
  | 'stop';

export interface ApprovalRequest {
  taskId: string;
  taskDescription: string;
  risk: RiskAssessment;
  context?: string;
}

export interface ApprovalResponse {
  action: ApprovalAction;
  reason?: string;
}

export interface PlanApprovalRequest {
  todos: TodoItem[];
  userRequest: string;
}

/**
 * Approval Manager Class
 */
export class ApprovalManager {
  private approveAllRemaining: boolean = false;
  private rejectAllRemaining: boolean = false;

  constructor() {
    // No initialization needed with inquirer
  }

  /**
   * Request approval for the entire plan after planning phase
   */
  async requestPlanApproval(
    request: PlanApprovalRequest
  ): Promise<ApprovalResponse> {
    console.log('\n' + chalk.cyan('='.repeat(80)));
    console.log(chalk.cyan.bold('📋 PLAN APPROVAL REQUIRED'));
    console.log(chalk.cyan('='.repeat(80)));
    console.log(chalk.white(`\nUser Request: "${request.userRequest}"\n`));
    console.log(chalk.yellow(`Generated ${request.todos.length} task(s):\n`));

    request.todos.forEach((todo, index) => {
      console.log(chalk.white(`  ${index + 1}. ${todo.title}`));
      if (todo.description) {
        console.log(chalk.dim(`     ${todo.description}`));
      }
    });

    console.log(chalk.cyan('\n' + '-'.repeat(80) + '\n'));

    const answer = await inquirer.prompt<{ choice: string }>([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          {
            name: '✅ Approve - Execute this plan',
            value: 'approve',
          },
          {
            name: '❌ Reject - Cancel execution',
            value: 'reject',
          },
          {
            name: '⏹  Stop - Stop and exit',
            value: 'stop',
          },
        ],
      },
    ]);

    switch (answer.choice) {
      case 'approve':
        return { action: 'approve' };
      case 'reject':
        return { action: 'reject', reason: 'User rejected the plan' };
      case 'stop':
        return { action: 'stop', reason: 'User stopped execution' };
      default:
        return { action: 'reject', reason: 'Unknown choice' };
    }
  }

  /**
   * Request approval for a single risky task
   */
  async requestTaskApproval(
    request: ApprovalRequest
  ): Promise<ApprovalResponse> {
    // Check if user already approved/rejected all
    if (this.approveAllRemaining) {
      return { action: 'approve', reason: 'Auto-approved (approve all)' };
    }

    if (this.rejectAllRemaining) {
      return { action: 'reject', reason: 'Auto-rejected (reject all)' };
    }

    console.log('\n' + chalk.yellow('='.repeat(80)));
    console.log(chalk.yellow.bold('⚠️  APPROVAL REQUIRED - RISKY OPERATION DETECTED'));
    console.log(chalk.yellow('='.repeat(80)));
    console.log(chalk.white(`\nTask: ${request.taskDescription}`));
    console.log(`Risk Level: ${this.formatRiskLevel(request.risk.level)}`);
    console.log(chalk.white(`Category: ${this.formatCategory(request.risk.category)}`));
    console.log(chalk.dim(`Reason: ${request.risk.reason}`));

    if (request.risk.detectedPatterns.length > 0) {
      console.log(
        chalk.dim(`Patterns: ${request.risk.detectedPatterns.slice(0, 3).join(', ')}`)
      );
    }

    if (request.context) {
      console.log(chalk.dim(`\nContext: ${request.context}`));
    }

    console.log(chalk.yellow('\n' + '-'.repeat(80) + '\n'));

    const answer = await inquirer.prompt<{ choice: string }>([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          {
            name: '✅ Approve - Execute this task',
            value: 'approve',
          },
          {
            name: '⏭  Skip - Skip this task',
            value: 'reject',
          },
          {
            name: '✅✅ Approve All - Approve this and all remaining tasks',
            value: 'approve_all',
          },
          {
            name: '⏭⏭ Skip All - Skip this and all remaining tasks',
            value: 'reject_all',
          },
          {
            name: '⏹  Stop - Stop execution entirely',
            value: 'stop',
          },
        ],
      },
    ]);

    switch (answer.choice) {
      case 'approve':
        return { action: 'approve' };

      case 'reject':
        return { action: 'reject', reason: 'User rejected this task' };

      case 'approve_all':
        this.approveAllRemaining = true;
        return { action: 'approve_all', reason: 'User approved all remaining' };

      case 'reject_all':
        this.rejectAllRemaining = true;
        return { action: 'reject_all', reason: 'User rejected all remaining' };

      case 'stop':
        return { action: 'stop', reason: 'User stopped execution' };

      default:
        return { action: 'reject', reason: 'Unknown choice' };
    }
  }

  /**
   * Reset the approve/reject all flags
   */
  reset(): void {
    this.approveAllRemaining = false;
    this.rejectAllRemaining = false;
  }

  /**
   * Cleanup resources
   */
  close(): void {
    this.reset();
  }

  /**
   * Format risk level with colors/symbols
   */
  private formatRiskLevel(level: string): string {
    const formats: Record<string, string> = {
      low: '🟢 LOW',
      medium: '🟡 MEDIUM',
      high: '🟠 HIGH',
      critical: '🔴 CRITICAL',
    };
    return formats[level] || level.toUpperCase();
  }

  /**
   * Format category for display
   */
  private formatCategory(category: string): string {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
