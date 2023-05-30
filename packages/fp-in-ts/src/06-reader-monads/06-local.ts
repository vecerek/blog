import { either, option, readerTaskEither, taskEither } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function.js";

class NetworkError {
  readonly _tag = "NetworkError";
  constructor(readonly error: Error) {}
}

interface Db {
  query: (
    sql: string
  ) => (values: unknown[]) => taskEither.TaskEither<NetworkError, unknown>;
}

interface Fetch {
  (url: RequestInfo, init?: RequestInit): Promise<Response>;
}

interface User {
  id: string;
  email: string;
}

interface FetchLocalUser {
  (id: string): readerTaskEither.ReaderTaskEither<
    Db,
    NetworkError,
    option.Option<User>
  >;
}

const fetchLocalUser: FetchLocalUser = (id) => (db) =>
  pipe(
    [id],
    db.query("SELECT * FROM local_users WHERE id = ?"),
    taskEither.map((result) =>
      pipe(
        // this casting to User breaks end-to-end type-safety; ignore it for now
        // we'll cover runtime type-systems such as io-ts to solve this problem in another blog post
        result instanceof Array && result.length > 0
          ? (result[0] as User)
          : null,
        option.fromNullable
      )
    )
  );

class UserNotFoundError {
  readonly _tag = "UserNotFoundError";
  constructor(readonly error: Error) {}
}

class UnexpectedFetchUserError {
  readonly _tag = "UnexpectedFetchUserError";
  constructor(readonly error: Error) {}
}

type FetchExternalUserError =
  | UserNotFoundError
  | NetworkError
  | UnexpectedFetchUserError;

interface FetchExternalUser {
  (id: string): readerTaskEither.ReaderTaskEither<
    Fetch,
    FetchExternalUserError,
    User
  >;
}

const fetchExternalUser: FetchExternalUser = (id) => (fetch) =>
  pipe(
    taskEither.tryCatch(
      () => fetch(`/api/users/${id}`),
      flow(either.toError, (err) => new NetworkError(err))
    ),
    taskEither.filterOrElseW(
      (response) => response.status !== 404,
      () => new UserNotFoundError(new Error(`User ${id} not found`))
    ),
    taskEither.filterOrElseW(
      (response) => response.ok,
      (response) =>
        new UnexpectedFetchUserError(
          new Error(`Received response with status code ${response.status}`)
        )
    ),
    taskEither.filterOrElseW(
      (response) => response.headers.get("Content-Type") === "application/json",
      (response) =>
        new UnexpectedFetchUserError(
          new Error(
            `Request content-type header is: ${response.headers.get(
              "Content-Type"
            )}`
          )
        )
    ),
    taskEither.chainW((response) =>
      taskEither.tryCatch(
        // this casting to User breaks end-to-end type-safety; ignore it for now
        // we'll cover runtime type-systems such as io-ts to solve this problem in another blog post
        () => response.json() as Promise<User>,
        flow(either.toError, (err) => new UnexpectedFetchUserError(err))
      )
    )
  );

interface FetchUser {
  (id: string): readerTaskEither.ReaderTaskEither<
    { db: Db; fetch: Fetch },
    FetchExternalUserError,
    User
  >;
}

export const fetchUser: FetchUser = (id) =>
  pipe(
    fetchLocalUser(id),
    readerTaskEither.chainW(
      option.match(
        () =>
          readerTaskEither.left(
            new UserNotFoundError(new Error(`User ${id} not found`))
          ),
        (user) => readerTaskEither.right(user)
      )
    ),
    // returns readerTaskEither.ReaderTaskEither<{ db: Db; }, UserNotFoundError | NetworkError, User>
    readerTaskEither.local((deps: { db: Db }) => deps.db),
    // returns readerTaskEither.ReaderTaskEither<{ db: Db; fetch: Fetch; }, FetchExternalUserError, User>
    readerTaskEither.orElseW(() =>
      pipe(
        fetchExternalUser(id),
        readerTaskEither.local((deps: { fetch: Fetch }) => deps.fetch)
      )
    )
  );
