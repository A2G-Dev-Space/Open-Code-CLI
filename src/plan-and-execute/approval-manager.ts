/**
 * Approval Manager
 *
 * Handles user approval requests for risky operations
 * in the Plan & Execute workflow.
 */

import * as readline from 'readline';
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
  private rl: readline.Interface | null = null;
  private approveAllRemaining: boolean = false;
  private rejectAllRemaining: boolean = false;

  constructor() {
    // Will initialize readline when needed
  }

  /**
   * Request approval for the entire plan after planning phase
   */
  async requestPlanApproval(
    request: PlanApprovalRequest
  ): Promise<ApprovalResponse> {
    console.log('\n' + '='.repeat(80));
    console.log('📋 PLAN APPROVAL REQUIRED');
    console.log('='.repeat(80));
    console.log(`\nUser Request: "${request.userRequest}"\n`);
    console.log(`Generated ${request.todos.length} task(s):\n`);

    request.todos.forEach((todo, index) => {
      console.log(`  ${index + 1}. ${todo.title}`);
      if (todo.description) {
        console.log(`     Details: ${todo.description}`);
      }
    });

    console.log('\n' + '-'.repeat(80));
    console.log('\nOptions:');
    console.log('  [a] Approve - Execute this plan');
    console.log('  [r] Reject - Cancel execution');
    console.log('  [s] Stop - Stop and exit');

    const response = await this.prompt('\nYour choice (a/r/s): ');
    const choice = response.toLowerCase().trim();

    switch (choice) {
      case 'a':
      case 'approve':
        return { action: 'approve' };
      case 'r':
      case 'reject':
        return { action: 'reject', reason: 'User rejected the plan' };
      case 's':
      case 'stop':
        return { action: 'stop', reason: 'User stopped execution' };
      default:
        console.log('Invalid choice. Defaulting to reject.');
        return { action: 'reject', reason: 'Invalid choice' };
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

    console.log('\n' + '='.repeat(80));
    console.log('⚠️  APPROVAL REQUIRED - RISKY OPERATION DETECTED');
    console.log('='.repeat(80));
    console.log(`\nTask: ${request.taskDescription}`);
    console.log(`Risk Level: ${this.formatRiskLevel(request.risk.level)}`);
    console.log(`Category: ${this.formatCategory(request.risk.category)}`);
    console.log(`Reason: ${request.risk.reason}`);

    if (request.risk.detectedPatterns.length > 0) {
      console.log(
        `Patterns: ${request.risk.detectedPatterns.slice(0, 3).join(', ')}`
      );
    }

    if (request.context) {
      console.log(`\nContext:\n${request.context}`);
    }

    console.log('\n' + '-'.repeat(80));
    console.log('\nOptions:');
    console.log('  [a] Approve - Execute this task');
    console.log('  [r] Reject - Skip this task');
    console.log('  [A] Approve All - Approve this and all remaining tasks');
    console.log('  [R] Reject All - Reject this and all remaining tasks');
    console.log('  [s] Stop - Stop execution entirely');

    const response = await this.prompt('\nYour choice (a/r/A/R/s): ');
    const choice = response.trim();

    switch (choice.toLowerCase()) {
      case 'a':
      case 'approve':
        return { action: 'approve' };

      case 'r':
      case 'reject':
        return { action: 'reject', reason: 'User rejected this task' };

      case 'approve all':
        this.approveAllRemaining = true;
        return { action: 'approve_all', reason: 'User approved all remaining' };

      case 'reject all':
        this.rejectAllRemaining = true;
        return { action: 'reject_all', reason: 'User rejected all remaining' };

      case 's':
      case 'stop':
        return { action: 'stop', reason: 'User stopped execution' };

      default:
        console.log('Invalid choice. Defaulting to reject this task.');
        return { action: 'reject', reason: 'Invalid choice' };
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
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
    this.reset();
  }

  /**
   * Prompt user for input
   */
  private async prompt(question: string): Promise<string> {
    if (!this.rl) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    }

    return new Promise(resolve => {
      this.rl!.question(question, answer => {
        resolve(answer);
      });
    });
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
