import type { taskEither } from "fp-ts";
import type * as project from "./13-domains-project.js";
import type * as db from "./db.js";

export interface Create {
  (input: unknown): taskEither.TaskEither<
    | project.ProjectLimitReachedError
    | db.QueryError
    | project.ParseInputError
    | project.ProjectNameUnavailableError
    | project.EmitEntityError,
    project.Project
  >;
}
