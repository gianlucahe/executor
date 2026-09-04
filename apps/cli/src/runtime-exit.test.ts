import { describe, expect, it } from "@effect/vitest";

import { isForegroundDaemonInvocation } from "./runtime-exit";

describe("isForegroundDaemonInvocation", () => {
  it("recognizes the supervised daemon command", () => {
    expect(
      isForegroundDaemonInvocation([
        "bun",
        "executor",
        "daemon",
        "run",
        "--foreground",
        "--port",
        "4788",
      ]),
    ).toBe(true);
  });

  it("does not change exit semantics for other commands", () => {
    expect(isForegroundDaemonInvocation(["bun", "executor", "daemon", "run"])).toBe(false);
    expect(isForegroundDaemonInvocation(["bun", "executor", "mcp"])).toBe(false);
  });
});
