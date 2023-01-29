import { either } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const parseCount = flow(
  parseInt,
  either.map((count) => ({ count })),
  either.mapLeft(({ value }) => `"${value}" could not be parsed as an integer`)
);

export const res = parseCount("42");
// Value of res is { _tag: "Right", right: 42 }

export const res2 = parseCount("abc");
// Value of res2 is { _tag: "Left", left: '"42" could not be parsed as an integer' }
// Type of both res and res2 is Either<string, { count: number }>
