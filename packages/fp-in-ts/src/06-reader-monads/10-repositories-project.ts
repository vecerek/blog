// repositories/project.ts

import { readerTaskEither } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { ulid } from "ulid";
import * as project from "./09-domains-project.js";

export const create = flow(
  project.parseInput,
  readerTaskEither.fromEither,
  readerTaskEither.chainFirstW(project.validateAvailability),
  readerTaskEither.chainFirstW(() => project.enforceLimit),
  readerTaskEither.bind("id", () => readerTaskEither.right(ulid())),
  readerTaskEither.chainFirstW(project.create),
  readerTaskEither.chainFirstW(project.emitEntity)
);
