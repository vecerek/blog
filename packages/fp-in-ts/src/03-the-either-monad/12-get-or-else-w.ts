import { either } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const throwError = (e: Error) => {
  throw e;
};

const myParseInt = flow(
  parseInt,
  either.getOrElseW(flow(either.toError, throwError))
);

export const res = myParseInt("42");
// Value of res is 42
// Type of res is number

export const res2 = myParseInt("abc");
// res2 never gets assigned a value because an error is thrown
