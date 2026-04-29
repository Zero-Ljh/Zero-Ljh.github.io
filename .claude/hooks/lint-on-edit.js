#!/usr/bin/env node
/**
 * PostToolUse Hook — Syntax Check on Edit
 *
 * After every Edit/Write, checks modified JS files for syntax errors
 * (node -c) and CSS files for basic validity.
 */
const fs = require('fs');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || data.tool_input?.path || '';
    if (!filePath || !filePath.includes('个人主页')) process.exit(0);

    if (filePath.endsWith('.js')) {
      const { execSync } = require('child_process');
      try {
        execSync(`node -c "${filePath}"`, { stdio: 'pipe', timeout: 5000 });
      } catch (err) {
        console.error('[Hook] JS SYNTAX ERROR in', filePath);
        console.error(err.stderr?.toString() || err.message);
      }
    } else if (filePath.endsWith('.css')) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Basic CSS validation: check for unmatched braces
      const opens = (content.match(/\{/g) || []).length;
      const closes = (content.match(/\}/g) || []).length;
      if (opens !== closes) {
        console.error(`[Hook] CSS BRACE MISMATCH in ${filePath}: ${opens} { vs ${closes} }`);
      }
    }
  } catch (e) {
    // Ignore non-JSON input
  }
  process.exit(0);
});
