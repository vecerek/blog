import { pipe } from "fp-ts/lib/function.js";

const toNumber = (a: string): number => Number(a);
const multiplyBy = (by: number) => (input: number) => input * by;
const toArray = <A>(a: A): A[] => [a];

export const result = pipe("21", toNumber, multiplyBy(2), toArray);
