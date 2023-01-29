import { option } from "fp-ts";
import * as fs from "fs";

export const res = option.tryCatch(() => fs.readFileSync("/path/to/your/file"));
// Type of res is Option<Buffer>
