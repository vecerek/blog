import { pipe } from "fp-ts/lib/function.js";

const toNumber = (a: string): number => Number(a);
const multiplyBy = (input: number) => (by: number) => input * by;
const toArray = <A>(a: A): A[] => [a];

export const result = pipe("21", toNumber, multiplyBy, (by) => by(2), toArray);
