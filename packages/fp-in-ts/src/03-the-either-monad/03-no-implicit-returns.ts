import { ParseIntError } from "./02-parse-int.js";

// @ts-expect-error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
export const handleParseIntError = (err: ParseIntError): number => {
  if (err._tag === "NaNError") {
    return 0;
  }
};
