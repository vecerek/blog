import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";
import { parseInt } from "./02-parse-int.js";

// either.right represents an arbitrary computation that may fail in this example

pipe(
  parseInt("42"),
  either.chain((x) => either.right(x)),
  either.chain((x) => either.right(x)),
  either.chain((x) => either.right(x)),
  either.chain((x) => either.right(x))
);
