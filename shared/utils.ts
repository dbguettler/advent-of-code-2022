import * as fs from "fs";

export function getLines(argv: string[], splitter = "\n"): string[] {
  const fname = argv[2] === "debug" ? "input-sm.txt" : "input-lg.txt";
  return fs.readFileSync(fname).toString().split(splitter);
}
