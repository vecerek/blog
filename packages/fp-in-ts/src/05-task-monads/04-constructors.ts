import { task } from "fp-ts";

export const myTask = task.of(42);
// Value of myTask is () => Promise.resolve(42)
// Type of myTask is Task<number>
