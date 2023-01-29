import { taskEither } from "fp-ts";

export const asyncSuccess = taskEither.right(42);
// The value is () => Promise.resolve({ _tag: "Right", value: 42 })
// The type is TaskEither<never, number>

export const asyncFailure = taskEither.left(new Error("Something went wrong"));
// The value is () => Promise.reject({ _tag: "Left", value: new Error("Something went wrong" }))
// The type is TaskEither<Error, never>
