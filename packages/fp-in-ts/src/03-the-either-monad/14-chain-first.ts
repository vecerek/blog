import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

export const res = pipe(
  parseInt("42"),
  either.chainFirst((count) => {
    console.log({ count });

    return either.right(undefined);
  }),
  either.getOrElse(() => 0)
);

// Type of res is number
