import { either, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const res = pipe(
  either.right({ total: 42 } as Record<string, number>),
  either.getOrElse(() => ({} as Record<string, number>)),
  record.lookup("total")
);
// Value of res is { _tag: "Some", value: 42 }
// Type of res is Option<number>
