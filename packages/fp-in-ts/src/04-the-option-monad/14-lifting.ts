import { either, option, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const res = pipe(
  either.right({ total: 42 } as Record<string, number>),
  option.fromEither,
  option.chain(record.lookup("total"))
);
// Value of res is { _tag: "Some", value: 42 }
// Type of res is Option<number>
