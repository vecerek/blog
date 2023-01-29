// Good example
const toNumber = (a: string): number => Number(a);
const double = (a: number): number => a * 2;
const toArray = <A>(a: A): A[] => [a];

export const result = toArray(double(toNumber("21")));

// Bad example
export const badMultiply = (input: number, by: number): number => input * by;

export const result2 = toArray(badMultiply(toNumber("21"), 2));
