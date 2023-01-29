import { either } from "fp-ts";

export const success = either.right(42);
export const failure = either.left({ _tag: "NaNError", value: NaN });
