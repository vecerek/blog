import { either, taskEither } from "fp-ts";
import * as fs from "node:fs/promises";

export const safeReadFile = (path: string) =>
  taskEither.tryCatch(() => fs.readFile(path, "utf8"), either.toError);
