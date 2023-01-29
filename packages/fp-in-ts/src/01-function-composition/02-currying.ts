import { badMultiply } from "./01-composition.js";

export const multiply = (by: number) => (input: number) =>
  badMultiply(input, by);
