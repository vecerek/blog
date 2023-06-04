// domains/project.ts

import type { either, readerTaskEither } from "fp-ts";
import type * as db from "./db.js";
import type * as kafka from "./kafka.js";

export interface Project {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

export type ProjectInput = Pick<
  Project,
  "name" | "description" | "organizationId"
>;

export class ParseInputError {
  readonly _tag = "ParseInputError";
  constructor(readonly error: Error) {}
}

export class ProjectNameUnavailableError {
  readonly _tag = "ProjectNameUnavailableError";
  constructor(readonly error: Error) {}
}

export type ValidateAvailabilityError =
  | ProjectNameUnavailableError
  | db.QueryError;

export class ProjectLimitReachedError {
  readonly _tag = "ProjectLimitReachedError";
  constructor(readonly error: Error) {}
}

export type EnforceLimitError = ProjectLimitReachedError | db.QueryError;

export class MessageEncodingError {
  readonly _tag = "MessageEncodingError";
  constructor(readonly error: Error) {}
}

export type EmitEntityError = MessageEncodingError | kafka.ProducerError;

/**
 * A synchronous operation that accepts an unknown object
 * and parses it. The result is an `Either`.
 */
export type ParseInput = (
  input: unknown
) => either.Either<ParseInputError, ProjectInput>;
export declare const parseInput: ParseInput;

export interface DbEnv {
  db: db.Service;
}

/**
 * A function that accepts an object representing
 * the input data of a project and returns a ReaderTaskEither
 * describing an asynchronous operation which queries
 * the database to check whether the project name
 * is still available. Project names across an organization
 * must be unique. This operation may fail due to different
 * reasons, such as network errors, database connection
 * errors, SQL syntax errors, etc. The database client
 * is the only dependency of this function.
 */
export type ValidateAvailability = (
  input: ProjectInput
) => readerTaskEither.ReaderTaskEither<DbEnv, ValidateAvailabilityError, void>;
export declare const validateAvailability: ValidateAvailability;

/**
 * A task describing an asynchronous operation that
 * queries the database for the number of existing
 * projects for a given organization. There is a
 * product limit for how many projects can be created
 * by an organization. This operation fails if the limit
 * is reached or any other network or database error occurs.
 * The database client is the only dependency of this function.
 */
export type EnforceLimit = readerTaskEither.ReaderTaskEither<
  DbEnv,
  EnforceLimitError,
  void
>;
export declare const enforceLimit: EnforceLimit;

/**
 * A function that accepts a project object and returns
 * a task describing an asynchronous operation that
 * persists this object in the database. This operation
 * fails if any network or database error occurs.
 * The database client is the only dependency of this function.
 */
export type Create = (
  project: Project
) => readerTaskEither.ReaderTaskEither<DbEnv, db.QueryError, void>;
export declare const create: Create;

/**
 * A function that accepts a project object and returns
 * a task describing an asynchronous operation that encodes
 * this object and produces a Kafka message. This operation
 * fails if the encoding fails, or any other network or broker
 * error occurs. The database client is the only dependency
 * of this function.
 */
export type EmitEntity = (
  project: Project
) => readerTaskEither.ReaderTaskEither<DbEnv, EmitEntityError, void>;
export declare const emitEntity: EmitEntity;
