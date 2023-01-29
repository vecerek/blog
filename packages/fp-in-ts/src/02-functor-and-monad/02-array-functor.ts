// source of values `a` (Array<number>)
const numbers = [1, 2, 3];

// mapping of `a` (number) to `b` (string)
const toString = (a: number): string => String(a);

// source of values `b` (Array<string>)
export const result = numbers.map(toString);
