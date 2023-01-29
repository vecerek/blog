import { pipe } from "fp-ts/lib/function.js";

const toNumber = (a: string): number => Number(a);
const double = (a: number): number => a * 2;
const toArray = <A>(a: A): A[] => [a];

export const result = pipe("21", toNumber, double, toArray);
