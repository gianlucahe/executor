import { describe, expect, it } from "@effect/vitest";
import { makeCloseOnce } from "./close-once";

describe("makeCloseOnce", () => {
  it("does not recurse when an operation synchronously requests another close", async () => {
    const calls = [0, 0];
    let close = async () => {};
    close = makeCloseOnce(
      async () => {
        calls[0] += 1;
        void close();
      },
      async () => {
        calls[1] += 1;
        void close();
      },
    );

    await close();
    await close();

    expect(calls).toEqual([1, 1]);
  });

  it("attempts every operation and resolves after failures", async () => {
    let secondClosed = false;
    const close = makeCloseOnce(
      async () => {
        throw new Error("first close failed");
      },
      async () => {
        secondClosed = true;
      },
    );

    await expect(close()).resolves.toBeUndefined();
    expect(secondClosed).toBe(true);
  });
});
