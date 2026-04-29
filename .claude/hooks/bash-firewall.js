#!/usr/bin/env node
/**
 * Bash Firewall — PreToolUse Hook
 *
 * Blocks dangerous bash commands: pipe-to-shell, destructive filesystem ops,
 * credential exfiltration, reverse shells, encoded payloads, unsafe git ops.
 *
 * INSTALL: Add to settings.json PreToolUse matcher for "Bash".
 *   exit 2 = block the command; exit 0 = allow.
 */
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const cmd = (data.tool_input && data.tool_input.command) || '';
    if (!cmd) process.exit(0);

    // 1. Pipe-to-shell (remote code execution)
    if (/(?:curl|wget)\s.*\|\s*(?:bash|sh|zsh|python|perl|ruby|node)/i.test(cmd)) {
      console.error('[Firewall] BLOCKED: Pipe-to-shell. Download & review first.');
      process.exit(2);
    }

    // 2. Destructive filesystem
    if (/rm\s+(?:-\S*[fF]\S*\s+).*?(\/|~|\$HOME|\.\.)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: rm -rf targeting root/home/parent.');
      process.exit(2);
    }
    if (/sudo\s+rm\s/.test(cmd)) {
      console.error('[Firewall] BLOCKED: sudo rm. AI should never rm as root.');
      process.exit(2);
    }
    if (/chmod\s+(?:-R\s+)?777\s/.test(cmd)) {
      console.error('[Firewall] BLOCKED: chmod 777. Use 644 or 755.');
      process.exit(2);
    }
    if (/(?:mkfs\.|dd\s+if=.*of=\/dev\/)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Disk-level destructive operation.');
      process.exit(2);
    }

    // 3. Credential / secret exfiltration
    const sensitiveRead = /\.(?:env|ssh|aws|gnupg|anthropic|openai)\b|credentials|secret|id_rsa|id_ed25519|\.npmrc|\.pypirc/i;
    if (/(?:cat|less|more|head|tail|bat|type|strings)\s/.test(cmd) && sensitiveRead.test(cmd)) {
      console.error('[Firewall] BLOCKED: Read of sensitive file.');
      process.exit(2);
    }
    if (/(?:^|\s)(?:printenv|env|set)\s*(?:$|&&|;)/.test(cmd) && !cmd.includes('NODE_ENV') && !cmd.includes('PATH=')) {
      console.error('[Firewall] BLOCKED: Environment dump may expose secrets.');
      process.exit(2);
    }
    const secretVars = /ANTHROPIC_API_KEY|OPENAI_API_KEY|AWS_SECRET|GITHUB_TOKEN|STRIPE_SECRET|DATABASE_URL|JWT_SECRET|PRIVATE_KEY|SESSION_SECRET/;
    if (/(?:echo|printf)\s/.test(cmd) && /\$/.test(cmd) && secretVars.test(cmd)) {
      console.error('[Firewall] BLOCKED: Echo of secret env variable.');
      process.exit(2);
    }

    // 4. Network exfiltration
    if (/curl\s.*(?:-d\s*@|-F\s*file=@|--data-binary\s*@|--upload-file)\s/.test(cmd)) {
      console.error('[Firewall] BLOCKED: curl uploading local file.');
      process.exit(2);
    }
    if (/(?:nc|ncat|netcat)\s.*[<>|]/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Netcat with redirection — exfil risk.');
      process.exit(2);
    }

    // 5. Encoded payload detection
    if (/base64\s+(?:-d|--decode)\s*\|/.test(cmd) && /(?:bash|sh|python|perl|eval)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: base64 decode piped to interpreter.');
      process.exit(2);
    }
    if (/python.*-c.*['"].*import\s+(?:os|subprocess|socket|http)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Inline python with system/network module.');
      process.exit(2);
    }

    // 6. Reverse shell patterns
    if (/bash\s+-i\s+>&\s*\/dev\/tcp\//.test(cmd)) {
      console.error('[Firewall] BLOCKED: Bash reverse shell detected.');
      process.exit(2);
    }
    if (/(?:nc|ncat)\s+-\w*e\s+(?:bash|sh|\/bin\/)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Netcat reverse shell detected.');
      process.exit(2);
    }

    // 7. Git safety
    if (/git\s+push\s.*?(?:-f|--force)\b/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Force push. Use --force-with-lease manually.');
      process.exit(2);
    }
    if (/git\s+reset\s+--hard/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Hard reset destroys work. Stash first.');
      process.exit(2);
    }

    // 8. Privilege escalation
    if (/^sudo\s+(?:bash|sh|zsh|su\s)/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Root shell escalation.');
      process.exit(2);
    }
    if (/docker\s+run\s.*--privileged/.test(cmd)) {
      console.error('[Firewall] BLOCKED: Privileged container grants host access.');
      process.exit(2);
    }

    process.exit(0);
  } catch (e) {
    // If we can't parse JSON, allow (this should not happen in normal operation)
    process.exit(0);
  }
});
