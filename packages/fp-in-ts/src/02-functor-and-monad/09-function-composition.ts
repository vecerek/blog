import { pipe } from "fp-ts/lib/function.js";

const map =
  <A, B>(f: (_: A) => B) =>
  (a: A[]): B[] =>
    a.map(f);
const len = (a: string): number => a.length;
const double = (a: number): number => a * 2;

export const result = pipe(
  ["Functors", "and", "monads", "are", "easy"],
  map(len),
  map(double)
);
// [ 16, 6, 12, 6, 8 ]
