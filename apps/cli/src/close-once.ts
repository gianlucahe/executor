export const makeCloseOnce = (
  ...operations: ReadonlyArray<() => Promise<void>>
): (() => Promise<void>) => {
  let closing: Promise<void> | undefined;

  return () => {
    if (closing) return closing;
    closing = Promise.allSettled(
      operations.map((operation) => Promise.resolve().then(operation)),
    ).then(() => undefined);
    return closing;
  };
};
