import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const res = pipe(
  option.some(42), // Option<number>
  either.fromOption(() => "Missing value") // Either<string, number>
);
// Value of res is { _tag: "Right", value: 42 }
