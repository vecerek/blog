import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

const splitByWords = (a: string): string[] => a.split(" ");
const len = (a: string): number => a.length;
const double = (a: number): number => a * 2;

export const result = pipe(
  ["Functors and monads", "are easy"],
  array.chain(splitByWords), // flatMap is called chain in fp-ts
  array.map(len),
  array.map(double)
);
// [ 16, 6, 12, 6, 8 ]
