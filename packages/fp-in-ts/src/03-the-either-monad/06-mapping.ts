import { ParseIntError } from "./02-parse-int.js";

declare const parseInt: (_: string) => ParseIntError | number;

const parseCount = (x: string) => {
  const parsedInt = parseInt(x);

  if (typeof parsedInt === "number") {
    return { count: parsedInt };
  } else {
    return `"${parsedInt.value} could not be parsed as an integer`;
  }
};

export const res = parseCount("42");
// Value of res is 42

export const res2 = parseCount("abc");
// Value of res2 is '"42" could not be parsed as an integer'
// Type of both res and res2 is number | string
