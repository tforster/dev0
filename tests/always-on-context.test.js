// always-on-context.test.js — guards what every session and subagent loads
//
// DEV0.md is the architect's document (D59). Its tenets say Dev0 "forbids unexamined"
// dependencies -- a sentence an agent quotes to justify adding one -- so it must never
// reach always-on context: the root CLAUDE.md or anything under install/rules/.

// System dependencies
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");

/**
 * Lists every file Claude Code loads into every session from this toolkit.
 *
 * @returns {Promise<string[]>} Absolute paths.
 */
async function alwaysOnFiles() {
  const rulesDir = path.join(repoRoot, "install", "rules");
  const rules = (await readdir(rulesDir)).filter((name) => name.endsWith(".md")).map((name) => path.join(rulesDir, name));
  return [path.join(repoRoot, "CLAUDE.md"), ...rules];
}

describe("always-on context", () => {
  it("DEV0-19: no always-on context loads or imports DEV0.md", async () => {
    // Case-sensitive: install/rules/dev0.md is the agents' file and may be named freely.
    // Any path to DEV0.md counts -- an `@` import pulls it in, and a plain mention invites a Read.
    for (const file of await alwaysOnFiles()) {
      const content = await readFile(file, "utf8");
      assert.ok(!content.includes("DEV0.md"), `${path.relative(repoRoot, file)} references DEV0.md`);
    }
  });
});
