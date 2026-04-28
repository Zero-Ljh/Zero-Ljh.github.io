#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const jsDir = path.join(__dirname, '..', '..', 'js');
if (!fs.existsSync(jsDir)) process.exit(0);

const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
let errors = 0;
jsFiles.forEach(file => {
  const fp = path.join(jsDir, file);
  try {
    execSync(`node -c "${fp}"`, { stdio: 'pipe', timeout: 5000 });
  } catch (err) {
    console.error('[Stop Hook] SYNTAX ERROR:', file);
    errors++;
  }
});
if (errors === 0) console.log(`[Stop Hook] All ${jsFiles.length} JS files OK`);
process.exit(0);
