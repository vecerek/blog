import { either, readerTaskEither, taskEither } from "fp-ts";
import { constVoid, pipe } from "fp-ts/lib/function.js";

export class QueryError {
  readonly _tag = "QueryError";
  constructor(readonly error: Error) {}
}

export interface Service {
  query: (
    sql: string
  ) => (values: unknown[]) => taskEither.TaskEither<QueryError, unknown>;
}

export class StartTransactionFailedError {
  readonly _tag = "StartTransactionFailedError";
  constructor(readonly error: Error) {}
}

export class RollbackFailedError {
  readonly _tag = "RollbackFailedError";
  constructor(readonly error: Error) {}
}

export class CommitFailedError {
  readonly _tag = "RollbackFailedError";
  constructor(readonly error: Error) {}
}

export type WithTransactionError =
  | CommitFailedError
  | RollbackFailedError
  | StartTransactionFailedError;

export interface WithTransaction {
  <R, E, A>(
    use: readerTaskEither.ReaderTaskEither<R, E, A>
  ): readerTaskEither.ReaderTaskEither<
    R & { db: Service },
    E | WithTransactionError,
    A
  >;
}
export const withTransaction: WithTransaction = (use) => (env) =>
  taskEither.bracketW(
    pipe(
      [],
      env.db.query("START TRANSACTION"),
      taskEither.mapLeft(({ error }) => new StartTransactionFailedError(error))
    ),
    () => use(env),
    (_, res) =>
      pipe(
        res,
        either.match(
          () =>
            pipe(
              [],
              env.db.query("ROLLBACK"),
              taskEither.mapLeft(({ error }) => new RollbackFailedError(error)),
              taskEither.map(constVoid)
            ),
          () =>
            pipe(
              [],
              env.db.query("COMMIT"),
              taskEither.mapLeft(({ error }) => new CommitFailedError(error)),
              taskEither.map(constVoid)
            )
        )
      )
  );
