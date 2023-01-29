import { either, task } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";
import { db } from "./db.js";

const query =
  (sql: string): task.Task<either.Either<Error, unknown>> =>
  async () => {
    try {
      const res = await db.query(sql);
      return either.right(res);
    } catch (error) {
      return pipe(error, either.toError, either.left);
    }
  };

export const testDbConnection: task.Task<boolean> = pipe(
  query("SELECT 1"),
  task.map(
    // unwrapping the task here
    either.fold(
      // unwrapping the either here
      () => false,
      () => true
    )
  )
);
