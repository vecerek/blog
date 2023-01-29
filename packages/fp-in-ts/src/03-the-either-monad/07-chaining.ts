import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

const add = (x: string, y: string) =>
  pipe(
    parseInt(x),
    either.chain(
      (a) =>
        pipe(
          parseInt(y),
          either.map((b) => a + b)
        ) // `Either<ParseIntError, number>` is returned by this pipe
    )
  );

export const res = add("42", "24");
// Value of res is { _tag: "Right", right: 66 }

export const res2 = add("abc", "24");
// Value of res2 is { _tag: "Left", left: { _tag: "NaNError", value: NaN } }
// Type of both res and res2 is Either<ParseIntError, number>
