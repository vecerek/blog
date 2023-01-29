import { option } from "fp-ts";

export const missing = option.fromNullable(null); // None
export const alsoMissing = option.fromNullable(undefined); // None
export const present = option.fromNullable(42); // Some(42)
