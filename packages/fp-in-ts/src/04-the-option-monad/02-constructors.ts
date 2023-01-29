import { option } from "fp-ts";

export const missing = option.none;
export const present = option.some(42);
