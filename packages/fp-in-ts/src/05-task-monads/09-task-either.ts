import { either, task, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";
import { db } from "./db.js";

const query = (sql: string): taskEither.TaskEither<Error, unknown> =>
  taskEither.tryCatch(() => db.query(sql), either.toError);

export const testDbConnection: task.Task<boolean> = pipe(
  query("SELECT 1"),
  taskEither.fold(
    () => task.of(false),
    () => task.of(true)
  )
);
