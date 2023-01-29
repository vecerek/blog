import { option, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

const makeCount = (x: string, y: string) => (r: Record<string, number>) =>
  pipe(
    record.lookup(x, r),
    option.chain((a) =>
      pipe(
        record.lookup(y, r),
        option.map((b) => ({ count: a + b }))
      )
    )
  );

const countDogsAndCats = makeCount("dogs", "cats");

export const res = countDogsAndCats({ dogs: 21, cats: 21 });
// Value of res is { _tag: "Right", value: { count: 42 } }

export const res2 = countDogsAndCats({});
// Value of res2 is { _tag: "None" }
// Type of both res and res2 is Option<{ count: number }>
