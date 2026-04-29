#!/usr/bin/env node
/**
 * File Guard — PreToolUse Hook
 *
 * Blocks Read/Edit/Write on sensitive files. Defense-in-depth because
 * settings.json deny rules can be inconsistent.
 *
 * INSTALL: Add to settings.json PreToolUse matcher for "Read|Edit|Write|MultiEdit".
 *   exit 2 = block; exit 0 = allow.
 */
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = (data.tool_input && (
      data.tool_input.file_path ||
      data.tool_input.path ||
      data.tool_input.filePath ||
      ''
    )).replace(/\\/g, '/');
    const toolName = data.tool_name || 'Access';

    if (!filePath) process.exit(0);

    const lower = filePath.toLowerCase();

    const patterns = [
      /\.env$/,
      /\.env\./,
      /\.pem$/,
      /\.key$/,
      /\.p12$/,
      /\.pfx$/,
      /\.jks$/,
      /\/\.ssh\//,
      /\/\.aws\//,
      /\/\.gnupg\//,
      /\/\.anthropic/,
      /\/\.openai/,
      /\/\.config\/gh\//,
      /\/\.npmrc$/,
      /\/\.pypirc$/,
      /credentials/,
      /service\.account/,
      /google-credentials/,
      /\/id_rsa/,
      /\/id_ed25519/,
      /\/id_ecdsa/,
      /\/known_hosts$/,
      /\/authorized_keys$/,
    ];

    for (const p of patterns) {
      if (p.test(lower)) {
        console.error(`[FileGuard] BLOCKED: ${toolName} on '${filePath}' — matches sensitive pattern.`);
        process.exit(2);
      }
    }

    process.exit(0);
  } catch (e) {
    process.exit(0);
  }
});
