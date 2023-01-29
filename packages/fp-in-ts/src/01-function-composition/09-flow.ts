import { pipe } from "fp-ts/lib/function.js";

const toNumber = (a: string): number => Number(a);
const multiplyBy = (by: number) => (input: number) => input * by;
const toArray = <A>(a: A): A[] => [a];

const calculate = (a: string) => pipe(a, toNumber, multiplyBy(2), toArray);

export const result = calculate("21");
