import { option, readerTaskEither, taskEither } from "fp-ts";
import { constant, pipe } from "fp-ts/lib/function.js";

interface Db {
  query: (
    sql: string
  ) => (values: unknown[]) => taskEither.TaskEither<Error, unknown>;
}

interface Project {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

const readProject =
  (
    id: string
  ): readerTaskEither.ReaderTaskEither<Db, Error, option.Option<Project>> =>
  (db) =>
    pipe(
      [id],
      db.query("SELECT * FROM projects WHERE id = ?"),
      taskEither.map((result) =>
        pipe(
          // this casting to Project breaks end-to-end type-safety; ignore it for now
          // we'll cover runtime type-systems such as io-ts to solve this problem in another blog post
          result instanceof Array && result.length > 0
            ? (result[0] as Project)
            : null,
          option.fromNullable
        )
      )
    );

const createProject =
  (project: Project): readerTaskEither.ReaderTaskEither<Db, Error, Project> =>
  (db) =>
    pipe(
      [project.id, project.name, project.description, project.organizationId],
      db.query(
        "INSERT INTO projects (id, name, description, organization_id) VALUES (?, ?, ?, ?)"
      ),
      taskEither.map(constant(project))
    );

export const readOrCreateProject = (
  project: Project
): readerTaskEither.ReaderTaskEither<Db, Error, Project> =>
  pipe(
    readProject(project.id),
    readerTaskEither.chain(
      option.match(() => createProject(project), readerTaskEither.right)
    )
  );
