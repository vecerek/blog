const splitByWords = (a: string): string[] => a.split(" ");
const len = (a: string): number => a.length;
const double = (a: number): number => a * 2;

const expressions = ["Functors and monads", "are easy"];
export const result = expressions.flatMap(splitByWords).map(len).map(double);
// [ 16, 6, 12, 6, 8 ]
