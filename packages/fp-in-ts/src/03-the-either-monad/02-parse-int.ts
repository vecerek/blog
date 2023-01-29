// parse-int.ts
import type { either } from "fp-ts";

interface NaNError {
  readonly _tag: "NaNError";
  readonly value: number;
}

interface OutOfRangeError {
  readonly _tag: "OutOfRangeError";
  readonly value: number;
}

export type ParseIntError = NaNError | OutOfRangeError;

export type ParseIntResult = either.Either<ParseIntError, number>;

export type ParseInt = (x: string) => ParseIntResult;
export declare const parseInt: ParseInt;
