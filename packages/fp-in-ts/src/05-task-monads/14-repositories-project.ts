// repositories/project.ts

import { taskEither } from "fp-ts";
import { flow } from "fp-ts/lib/function.js";
import { ulid } from "ulid";
import * as project from "./13-domains-project.js";

export const create = flow(
  project.parseInput,
  taskEither.fromEither,
  taskEither.chainFirstW(project.validateAvailability),
  taskEither.chainFirstW(() => project.enforceLimit),
  taskEither.bind("id", () => taskEither.right(ulid())),
  taskEither.chainFirstW(project.create),
  taskEither.chainFirstW(project.emitEntity)
);
