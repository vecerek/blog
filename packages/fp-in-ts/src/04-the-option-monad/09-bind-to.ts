import { option, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const makeLookupCount = (x: string) => (r: Record<string, number>) =>
  pipe(record.lookup(x, r), option.bindTo("count"));
// makeLookupCount returns Option<{ readonly count: number }>
// after the full application of its parameters
