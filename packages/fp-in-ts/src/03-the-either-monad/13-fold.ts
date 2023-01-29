import { either } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const throwError = (e: Error) => {
  throw e;
};

export const res = pipe(
  parseInt("42"),
  either.fold(flow(either.toError, throwError), (count) => ({ count }))
);

// Type of res is { count: number }

// Functionally the same as writing the below code
// but using fewer steps (1 instead of 3):

export const res2 = pipe(
  parseInt("42"),
  either.mapLeft(either.toError),
  either.map((count) => ({ count })),
  either.getOrElseW(throwError)
);
