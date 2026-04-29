#!/usr/bin/env node
/**
 * Audit Log — PostToolUse Hook
 *
 * Logs tool executions to .claude/audit.log after they complete.
 * Runs async so it never slows down the session.
 *
 * INSTALL: Add to settings.json PostToolUse with "async": true.
 */
const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const toolName = data.tool_name || 'unknown';
    const timestamp = new Date().toISOString();
    const projectDir = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..');
    const logDir = path.join(projectDir, '.claude');
    const logFile = path.join(logDir, 'audit.log');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    let logLine = `${timestamp} [${toolName}]`;

    switch (toolName) {
      case 'Bash': {
        const cmd = (data.tool_input && data.tool_input.command) || '';
        logLine += ` ${cmd.substring(0, 200)}`;
        break;
      }
      case 'Edit':
      case 'MultiEdit':
      case 'Write': {
        const file = (data.tool_input && (
          data.tool_input.file_path ||
          data.tool_input.path ||
          ''
        )) || '';
        logLine += ` ${file}`;
        break;
      }
      case 'WebFetch': {
        const url = (data.tool_input && data.tool_input.url) || '';
        logLine += ` ${url.substring(0, 200)}`;
        break;
      }
    }

    fs.appendFileSync(logFile, logLine + '\n');
  } catch (e) {
    // Silently ignore - audit failures should not block anything
  }
  process.exit(0);
});
