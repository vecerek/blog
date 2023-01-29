// source of values `a` (Array<string>)
const expressions = ["Functors and monads", "are easy"];

// mapping of `a` (string) to the same type of source (Array) of `b` (Array<string>)
const splitByWords = (a: string): string[] => a.split(" ");

// source of values `b` (Array<string>)
export const words = expressions.flatMap(splitByWords);
// ["Functors", "and", "monads", "are", "easy"]
