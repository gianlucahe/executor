export const isForegroundDaemonInvocation = (argv: ReadonlyArray<string>): boolean =>
  argv[2] === "daemon" && argv[3] === "run" && argv.includes("--foreground");
