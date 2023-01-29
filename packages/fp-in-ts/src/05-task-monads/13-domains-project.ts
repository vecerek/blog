// domains/project.ts

import type { either, taskEither } from "fp-ts";
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

export interface ParseInputError {
  _tag: "ParseInputError";
  value: Error;
}

export interface ProjectNameUnavailableError {
  _tag: "ProjectNameUnavailableError";
  value: Error;
}

export type ValidateAvailabilityError =
  | ProjectNameUnavailableError
  | db.QueryError;

export interface ProjectLimitReachedError {
  _tag: "ProjectLimitReachedError";
  value: Error;
}

export type EnforceLimitError = ProjectLimitReachedError | db.QueryError;

export interface MessageEncodingError {
  _tag: "MessageEncodingError";
  value: Error;
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

/**
 * A function that accepts an object representing
 * the input data of a project and returns a task
 * describing an asynchronous operation which queries
 * the database to check whether the project name
 * is still available. Project names across an organization
 * must be unique. This operation may fail due to different
 * reasons, such as network errors, database connection
 * errors, SQL syntax errors, etc.
 */
export type ValidateAvailability = (
  input: ProjectInput
) => taskEither.TaskEither<ValidateAvailabilityError, void>;
export declare const validateAvailability: ValidateAvailability;

/**
 * A task describing an asynchronous operation that
 * queries the database for the number of existing
 * projects for a given organization. There is a
 * product limit for how many projects can be created
 * by an organization. This operation fails if the limit
 * is reached or any other network or database error occurs.
 */
export type EnforceLimit = taskEither.TaskEither<EnforceLimitError, void>;
export declare const enforceLimit: EnforceLimit;

/**
 * A function that accepts a project object and returns
 * a task describing an asynchronous operation that
 * persists this object in the database. This operation
 * fails if any network or database error occurs.
 */
export type Create = (
  project: Project
) => taskEither.TaskEither<db.QueryError, void>;
export declare const create: Create;

/**
 * A function that accepts a project object and returns
 * a task describing an asynchronous operation that encodes
 * this object and produces a Kafka message. This operation
 * fails if the encoding fails, or any other network or broker
 * error occurs.
 */
export type EmitEntity = (
  project: Project
) => taskEither.TaskEither<EmitEntityError, void>;
export declare const emitEntity: EmitEntity;
