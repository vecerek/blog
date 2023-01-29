import * as fs from "node:fs/promises";

export const safeReadFile =
  (fallback: string) =>
  async (path: string): Promise<string> => {
    try {
      return fs.readFile(path, "utf8");
    } catch (_err) {
      return fallback;
    }
  };
