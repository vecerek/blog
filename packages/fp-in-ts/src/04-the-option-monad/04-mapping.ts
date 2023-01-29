import { option, record } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";

interface LookupCount {
  (_: Record<string, number>): option.Option<{ count: number }>;
}

const lookupCount: LookupCount = flow(
  record.lookup("total"),
  option.map((count) => ({ count }))
);

export const res = lookupCount({ total: 42 });
// Value of res is { _tag: "Some", value: { count: 42 } }

export const res2 = lookupCount({});
// Value of res2 is { _tag: "None" }
// Type of both res and res2 is Option<{ count: number }>
