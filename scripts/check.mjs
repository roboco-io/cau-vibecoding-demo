import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
for (const name of ['README.md', 'AGENTS.md', 'CLAUDE.md', 'demo/runbook.md', 'examples/student.md', 'inputs/README.md']) {
  assert(existsSync(new URL(name, root)), `Missing ${name}`);
  assert(readFileSync(new URL(name, root), 'utf8').trim(), `Empty ${name}`);
}
for (const name of ['inputs', 'research', 'portfolio', 'projects']) {
  assert(existsSync(new URL(name, root)), `Missing directory ${name}`);
}
console.log('Verified demo instructions, example profile, and work directories.');
