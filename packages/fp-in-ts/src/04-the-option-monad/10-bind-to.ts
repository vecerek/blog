import { option, record } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

export const makeCount =
  (x: string, y: string) => (r: Record<string, number>) =>
    pipe(
      record.lookup(x, r), // Option<number>
      option.bindTo("a"), // Option<{ a: number }>
      option.bind("b", () => record.lookup(y, r)), // Option<{ a: number; b: number }>
      option.map(({ a, b }) => ({ count: a + b })) // Option<{ count: number }>
    );
