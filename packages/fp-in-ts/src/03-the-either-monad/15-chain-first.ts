import { either } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

interface IncorrectAnswerError {
  readonly _tag: "IncorrectAnswerError";
  readonly value: number;
}

const myParseInt = flow(
  parseInt,
  either.chainFirstW((count) =>
    count === 42
      ? either.right(undefined)
      : either.left({
          _tag: "IncorrectAnswerError",
          value: count,
        } as IncorrectAnswerError)
  )
);

export const res = myParseInt("42");
// Value of res is { _tag: "Right", right: 42 }

export const res2 = myParseInt("abc");
// Value of res2 is { _tag: "Left", left: { _tag: "NaNError", value: NaN } }

export const res3 = myParseInt("41");
// Value of res3 is { _tag: "Left", left: { _tag: "IncorrectAnswerError", value: 41 } }
// Type of res, res2, res3 is the same: Either<ParseIntError | IncorrectAnswerError, number>
