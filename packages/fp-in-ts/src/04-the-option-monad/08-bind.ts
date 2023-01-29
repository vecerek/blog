import { option, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

const makeLookupCount = (x: string) => (r: Record<string, number>) =>
  pipe(
    option.some({}),
    option.bind("count", () => record.lookup(x, r))
  );

const lookupCount = makeLookupCount("total");

export const res = lookupCount({ total: 42 });
// Value of res is { _tag: "Some", value: { count: 42 } }

export const res2 = lookupCount({});
// Value of res2 is { _tag: "None" }
// Type of both res and res2 is Option<{ readonly count: number }>
