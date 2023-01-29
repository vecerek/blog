import { either } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const myParseInt = flow(
  parseInt,
  either.getOrElseW(() => "Zero" as const)
);

export const res = myParseInt("42");
// Value of res is 42

export const res2 = myParseInt("abc");
// Value of res2 is "Zero"
// Type of both res and res2 is number | "Zero"
