import type { readerTaskEither } from "fp-ts";
import type * as project from "./09-domains-project.js";
import type * as db from "./db.js";

export interface Create {
  (input: unknown): readerTaskEither.ReaderTaskEither<
    project.DbEnv & { db: db.Service },
    | db.WithTransactionError
    | db.QueryError
    | project.ParseInputError
    | project.ProjectNameUnavailableError
    | project.ProjectLimitReachedError
    | project.EmitEntityError,
    project.Project
  >;
}
