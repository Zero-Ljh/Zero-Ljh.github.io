#!/usr/bin/env node
const fs = require('fs');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || '';
    if (!filePath.endsWith('.js')) process.exit(0);
    if (!filePath.includes('个人主页')) process.exit(0);

    const { execSync } = require('child_process');
    try {
      execSync(`node -c "${filePath}"`, { stdio: 'pipe', timeout: 5000 });
    } catch (err) {
      console.error('[Hook] JS SYNTAX ERROR in', filePath);
      console.error(err.stderr?.toString() || err.message);
    }
  } catch (e) { /* ignore non-JSON input */ }
  process.exit(0);
});
