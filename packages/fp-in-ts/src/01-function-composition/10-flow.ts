import { flow } from "fp-ts/lib/function.js";

const toNumber = (a: string): number => Number(a);
const double = (a: number): number => a * 2;
const toArray = <A>(a: A): A[] => [a];

const calculate = flow(toNumber, double, toArray);

export const result = calculate("21");
