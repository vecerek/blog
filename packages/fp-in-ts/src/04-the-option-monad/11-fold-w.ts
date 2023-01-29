import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const res = pipe(
  option.some(42),
  option.foldW(
    () => ({ _tag: "Fallback" as const, value: 0 }),
    (value) => ({ _tag: "Derived" as const, value })
  )
);
// Value of res is { _tag: "Derived", value: 42 }
// Type of res is { _tag: "Derived", value: number } | { _tag: "Fallback", value: number }
