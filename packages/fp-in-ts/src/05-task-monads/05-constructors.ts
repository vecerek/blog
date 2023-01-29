import { task } from "fp-ts";
import * as fs from "node:fs/promises";

export const safeReadFile =
  (fallback: string) =>
  (path: string): task.Task<string> =>
  async () => {
    try {
      return fs.readFile(path, "utf8");
    } catch (_err) {
      return fallback;
    }
  };
