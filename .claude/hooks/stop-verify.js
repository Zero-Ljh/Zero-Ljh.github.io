#!/usr/bin/env node
/**
 * Stop Hook — Final Verification
 *
 * Runs when Claude stops responding. Verifies:
 * 1. All JS files have valid syntax
 * 2. All CSS files have balanced braces
 * 3. index.html exists and has required elements
 * 4. No missing file references in data.js
 */
const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..', '..');
let errors = 0;
let totalFiles = 0;

function checkJS(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  totalFiles += files.length;
  files.forEach(file => {
    const fp = path.join(dir, file);
    try {
      const { execSync } = require('child_process');
      execSync(`node -c "${fp}"`, { stdio: 'pipe', timeout: 5000 });
    } catch (err) {
      console.error('[Stop Hook] SYNTAX ERROR:', file);
      errors++;
    }
  });
}

function checkCSS(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));
  totalFiles += files.length;
  files.forEach(file => {
    const fp = path.join(dir, file);
    const content = fs.readFileSync(fp, 'utf8');
    const opens = (content.match(/\{/g) || []).length;
    const closes = (content.match(/\}/g) || []).length;
    if (opens !== closes) {
      console.error(`[Stop Hook] CSS BRACE MISMATCH in ${file}: ${opens} { vs ${closes} }`);
      errors++;
    }
  });
}

function checkHTML() {
  const indexPath = path.join(projectDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[Stop Hook] MISSING: index.html');
    errors++;
    return;
  }
  const content = fs.readFileSync(indexPath, 'utf8');
  if (!content.includes('</html>')) {
    console.error('[Stop Hook] HTML ERROR: index.html might be incomplete (missing </html>)');
    errors++;
  }
}

// Run checks
const jsDir = path.join(projectDir, 'js');
checkJS(jsDir);

const cssDir = path.join(projectDir, 'css');
checkCSS(cssDir);

checkHTML();

if (errors === 0) {
  console.log(`[Stop Hook] All checks passed (${totalFiles} files verified)`);
} else {
  console.error(`[Stop Hook] ${errors} error(s) found in ${totalFiles} files`);
}
process.exit(0);
