import { ParseIntError } from "./02-parse-int.js";

declare const parseInt: (_: string) => ParseIntError | number;

const add = (x: string, y: string) => {
  const parsedIntX = parseInt(x);
  const parsedIntY = parseInt(y);

  if (typeof parsedIntX === "number") {
    if (typeof parsedIntY === "number") {
      return parsedIntX + parsedIntY;
    } else {
      return parsedIntY;
    }
  } else {
    return parsedIntX;
  }
};

export const res = add("42", "24");
// Value of res is 66

export const res2 = add("abc", "24");
// Value of res2 is { _tag: "NaNError", value: NaN }
// Type of both res and res2 is number | ParseIntError
