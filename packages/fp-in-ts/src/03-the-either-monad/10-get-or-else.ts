import { either } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const myParseInt = flow(
  parseInt,
  either.getOrElse(() => 0)
);

export const res = myParseInt("42");
// Value of res is 42, not a Right

export const res2 = myParseInt("abc");
// Value of res2 is 0, not a Left
// Type of both res and res2 is number
