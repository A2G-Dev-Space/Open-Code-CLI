/**
 * Documentation Search Agent
 *
 * Uses a sub-LLM with bash tools to intelligently search documentation
 */

import { LLMClient } from './llm-client.js';
import { Message, ToolDefinition } from '../types/index.js';
import { executeBashCommand, isCommandSafe, sanitizeCommand } from './bash-command-tool.js';
import { detectFrameworkPath, getFrameworkPathsForDocs, FrameworkDetection } from './agent-framework-handler.js';
import path from 'path';
import os from 'os';

/**
 * Configuration constants
 */
const DOCS_SEARCH_MAX_ITERATIONS = 10;
const DOCS_SEARCH_MAX_OUTPUT_LENGTH = 50000;
const DOCS_SEARCH_LLM_TEMPERATURE = 0.3;
const DOCS_SEARCH_LLM_MAX_TOKENS = 4000;

/**
 * Bash command tool definition for LLM
 */
const RUN_BASH_TOOL: ToolDefinition = {
  type: 'function',
  function: {
    name: 'run_bash',
    description: 'Execute bash command to search and read documentation. Commands run in ~/.open-cli/docs directory.',
    parameters: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: 'Bash command to execute (e.g., find, grep, cat, ls, tree)',
        },
      },
      required: ['command'],
    },
  },
};

/**
 * Build framework-specific search hints and instructions
 */
function buildFrameworkHints(frameworkDetection: FrameworkDetection): {
  searchHint: string;
  batchLoadInstruction: string;
} {
  let searchHint = '';
  let batchLoadInstruction = '';
  
  if (frameworkDetection.framework) {
    const frameworkName = frameworkDetection.framework.toUpperCase();
    const categoryInfo = frameworkDetection.category 
      ? ` (category: ${frameworkDetection.category})` 
      : '';
    
    searchHint = `\n\n**FRAMEWORK DETECTED**: ${frameworkName}${categoryInfo}\n**Target Path**: ${frameworkDetection.basePath}`;
    
    if (frameworkDetection.requiresBatchLoad) {
      batchLoadInstruction = `\n\n**BATCH LOAD REQUIRED**: This query requires agent creation/writing. You MUST load ALL markdown files in the "${frameworkDetection.basePath}" directory using: cat $(find ${frameworkDetection.basePath} -name "*.md" -type f | sort)`;
    }
  }
  
  return { searchHint, batchLoadInstruction };
}

/**
 * Build system prompt for documentation search
 */
function buildSystemPrompt(frameworkDetection: FrameworkDetection): string {
  const { searchHint, batchLoadInstruction } = buildFrameworkHints(frameworkDetection);
  
  return `You are a documentation search expert for the ~/.open-cli/docs folder.

**Your Mission**:
Find information requested by the user in the ~/.open-cli/docs folder.${searchHint}${batchLoadInstruction}

**Available Tools**:
- run_bash: Execute bash commands in the docs directory

**Useful Commands**:
- ls: List files and directories (e.g., ls -la agent_framework/agno)
- find: Search for files by name (e.g., find agent_framework/agno -name "*.md" -type f)
- grep: Search file contents (e.g., grep -r "keyword" agent_framework/agno --include="*.md")
- cat: Read FULL file contents (e.g., cat agent_framework/agno/agent/README.md)
- Batch load: cat $(find path -name "*.md" -type f | sort) - Load all MD files in a directory

**Documentation Structure**:
- Documents are organized by functionality: each document covers ONE Class or ONE Function
- Directory structure: agent_framework/{framework}/{category}/

**Search Strategy**:
1. Explore structure: Use ls or find to understand the directory structure
2. Load full documents: Use cat to read COMPLETE files (NO chunking, NO head/tail unless file is >10000 lines)
3. Batch load when required: For agent/workflow construction queries, load ALL files in the target directory

**CRITICAL RULES**:
- ⚠️ NO CHUNKING: ALWAYS load complete original documents - DO NOT use head/tail or truncate unless file is >10000 lines
- ⚠️ NO CONTEXT LOSS: Each document is about one Class/Function - load the full original to preserve complete context
- ⚠️ ORIGINAL DOCUMENTS: Always read the original document content as-is - do not summarize or truncate

**Framework-Specific Paths**:
${getFrameworkPathsForDocs().map(({ name, path }) => `- ${name}: ${path}`).join('\n')}

**Important Rules**:
- Maximum ${DOCS_SEARCH_MAX_ITERATIONS} tool calls to find information
- Return ALL relevant content (don't summarize code examples)
- Include file paths when referencing information
- If information is not found, state "Information not found in documentation"

**Current working directory**: ~/.open-cli/docs`;
}

/**
 * Execute Docs Search Agent
 * Uses sub-LLM with bash tools to search ~/.open-cli/docs
 */
export async function executeDocsSearchAgent(
  llmClient: LLMClient,
  query: string
): Promise<{ success: boolean; result?: string; error?: string }> {
  try {
    // Detect framework-specific path and requirements
    const frameworkDetection = detectFrameworkPath(query);
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(frameworkDetection);

    // Initial messages
    const messages: Message[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: `Find this information in the documentation:\n\n${query}`,
      },
    ];

    // Multi-iteration loop (max 10)
    const maxIterations = DOCS_SEARCH_MAX_ITERATIONS;
    let iteration = 0;
    let finalResult = '';

    while (iteration < maxIterations) {
      iteration++;

      // Call LLM with bash tool
      const response = await llmClient.chatCompletion({
        messages,
        tools: [RUN_BASH_TOOL],
        temperature: DOCS_SEARCH_LLM_TEMPERATURE, // Lower temperature for more focused search
        max_tokens: DOCS_SEARCH_LLM_MAX_TOKENS, // Increased for comprehensive documentation synthesis
      });

      const assistantMessage = response.choices[0]?.message;
      if (!assistantMessage) {
        throw new Error('No response from LLM');
      }

      messages.push(assistantMessage);

      // Execute tool calls if present
      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        for (const toolCall of assistantMessage.tool_calls) {
          if (toolCall.function.name === 'run_bash') {
            let args: { command: string };
            try {
              args = JSON.parse(toolCall.function.arguments);
            } catch {
              messages.push({
                role: 'tool',
                content: 'Error: Invalid tool arguments',
                tool_call_id: toolCall.id,
              });
              continue;
            }

            // Sanitize and validate command
            const sanitized = sanitizeCommand(args.command);
            if (!isCommandSafe(sanitized)) {
              messages.push({
                role: 'tool',
                content: `Error: Command not allowed for security reasons: ${sanitized}`,
                tool_call_id: toolCall.id,
              });
              continue;
            }

            // Execute bash command
            const result = await executeBashCommand(sanitized);

            // Add tool result to messages
            let toolResult: string;
            if (result.success) {
              toolResult = result.result || 'Command executed successfully (no output)';
              // Increased truncation limit for batch loading complete documents
              // Supports loading multiple complete markdown files without context loss
              // 50000 characters should be enough for ~10-15 typical documentation files
              if (toolResult.length > DOCS_SEARCH_MAX_OUTPUT_LENGTH) {
                toolResult = toolResult.substring(0, DOCS_SEARCH_MAX_OUTPUT_LENGTH - 100) + '\n... (output truncated - too many files, consider loading specific subset)';
              }
            } else {
              toolResult = `Error: ${result.error}`;
            }

            messages.push({
              role: 'tool',
              content: toolResult,
              tool_call_id: toolCall.id,
            });
          }
        }
      } else {
        // No tool call → LLM provided final response
        finalResult = assistantMessage.content || '';
        break;
      }
    }

    // Check if we got a result
    if (!finalResult) {
      // Reached max iterations, ask for summary
      messages.push({
        role: 'user',
        content: 'Please summarize what you found so far.',
      });

      const summaryResponse = await llmClient.chatCompletion({
        messages,
        temperature: 0.3,
        max_tokens: 1000,
      });

      finalResult = summaryResponse.choices[0]?.message.content ||
                   `Search completed but exceeded maximum iterations (${maxIterations}).`;
    }

    return {
      success: true,
      result: finalResult,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error in docs search',
    };
  }
}

/**
 * Initialize docs directory with sample documentation
 */
export async function initializeDocsDirectory(): Promise<void> {
  const fs = await import('fs/promises');
  const docsPath = path.join(os.homedir(), '.open-cli', 'docs');

  try {
    // Create docs directory if it doesn't exist
    await fs.mkdir(docsPath, { recursive: true });

    // Check if README exists
    const readmePath = path.join(docsPath, 'README.md');
    try {
      await fs.access(readmePath);
    } catch {
      // Create a sample README
      const sampleReadme = `# OPEN-CLI Documentation

Welcome to the OPEN-CLI documentation directory!

## Overview

This directory contains local documentation that can be searched by the AI assistant.

## Adding Documentation

Simply place your markdown (.md) files in this directory. The AI will be able to search and reference them.

## Supported File Types

- Markdown files (.md)
- Text files (.txt)
- JSON files (.json)
- YAML files (.yaml, .yml)

## Organization Tips

- Use descriptive filenames
- Organize files in subdirectories by topic
- Include a table of contents in longer documents
- Use consistent formatting

## Example Structure

\`\`\`
~/.open-cli/docs/
├── README.md
├── api/
│   ├── authentication.md
│   └── endpoints.md
├── guides/
│   ├── getting-started.md
│   └── advanced-usage.md
└── reference/
    ├── configuration.md
    └── troubleshooting.md
\`\`\`
`;

      await fs.writeFile(readmePath, sampleReadme, 'utf-8');
      console.log('📚 Created sample documentation in ~/.open-cli/docs/');
    }
  } catch (error) {
    console.warn('Warning: Could not initialize docs directory:', error);
  }
}

/**
 * Add documentation file to the docs directory
 */
export async function addDocumentationFile(
  filename: string,
  content: string
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const fs = await import('fs/promises');
    const docsPath = path.join(os.homedir(), '.open-cli', 'docs');

    // Ensure docs directory exists
    await fs.mkdir(docsPath, { recursive: true });

    // Sanitize filename
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(docsPath, sanitizedFilename);

    // Write file
    await fs.writeFile(filePath, content, 'utf-8');

    return {
      success: true,
      path: filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add documentation',
    };
  }
}

export default executeDocsSearchAgent;