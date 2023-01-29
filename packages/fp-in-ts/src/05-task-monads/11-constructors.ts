import { either } from "fp-ts";
import * as fs from "node:fs/promises";

export const safeReadFile = (path: string) => async () => {
  try {
    return either.right(fs.readFile(path, "utf8"));
  } catch (reason) {
    return either.left(either.toError(reason));
  }
};
